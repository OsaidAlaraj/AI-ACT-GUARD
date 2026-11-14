// verify-hooks-live: exit 0 only if git will run the committed pre-commit gate.
// The gate cannot detect its own absence, so this runs inside `pnpm verify` (adr-002).
// It asks git which file it will run (honours core.hooksPath from any source) instead of
// modelling the config. Node, not sh, so it runs the same on Windows, macOS and CI.
import { execFileSync } from "node:child_process";
import { existsSync, lstatSync, readFileSync, realpathSync, statSync } from "node:fs";
import path from "node:path";

const GATE = "pnpm verify";

function fail(code, message) {
  console.error(`verify-hooks-live: ${message}`);
  process.exit(code);
}

function git(...args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

let top;
try {
  top = git("rev-parse", "--show-toplevel");
} catch {
  fail(2, "not inside a git repository (run `git init`, then `pnpm install`)");
}

const expectedDir = path.join(top, "scripts", "hooks");
if (!existsSync(expectedDir)) fail(3, "scripts/hooks/ is missing");
const expected = path.join(realpathSync(expectedDir), "pre-commit");

const hookRel = git("rev-parse", "--git-path", "hooks/pre-commit");
const hookAbs = path.resolve(top, hookRel);
const hookDir = path.dirname(hookAbs);
if (!existsSync(hookDir)) fail(3, `hooks dir does not exist: ${hookDir}`);
const hook = path.join(realpathSync(hookDir), path.basename(hookAbs));

if (path.normalize(hook).toLowerCase() !== path.normalize(expected).toLowerCase()) {
  fail(3, `git would run ${hook}, not ${expected} (run \`pnpm install\` to set core.hooksPath)`);
}
if (lstatSync(hook, { throwIfNoEntry: false })?.isSymbolicLink() && !existsSync(hook)) {
  fail(4, `dangling symlink: ${hook}`);
}
if (!existsSync(hook) || !statSync(hook).isFile()) fail(4, `hook is absent: ${hook}`);
if (process.platform !== "win32" && (statSync(hook).mode & 0o111) === 0) {
  fail(4, `hook is not executable (git skips it silently): ${hook}`);
}
if (process.platform === "win32") {
  // On Windows git reads the executable bit from the index.
  const mode = git("ls-files", "-s", "scripts/hooks/pre-commit").split(/\s+/)[0];
  if (mode && mode !== "100755") {
    fail(4, "scripts/hooks/pre-commit is not executable in git (git update-index --chmod=+x)");
  }
}
if (!readFileSync(hook, "utf8").includes(GATE)) fail(5, `hook does not run the gate: ${hook}`);
