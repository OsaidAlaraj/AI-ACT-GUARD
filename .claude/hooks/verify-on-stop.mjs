// Stop hook (backstop, adr-002): runs the gate at turn end on the main checkout.
// Exit 2 blocks the stop and feeds the failure back to the agent; anything else lets it end.
import { spawnSync } from "node:child_process";

let input = "";
for await (const chunk of process.stdin) input += chunk;
let payload = {};
try {
  payload = JSON.parse(input || "{}");
} catch {
  payload = {};
}
// Guard against a block loop: if this stop was already blocked once, let it end.
if (payload.stop_hook_active) process.exit(0);

const cwd = process.env.CLAUDE_PROJECT_DIR || process.cwd();
// On a ticket branch, red tests are legitimate between writing the oracles and implementing them
// (specify-first), so only the static checks block; the pre-commit hook still refuses any red test.
const branch = spawnSync("git", ["symbolic-ref", "--short", "HEAD"], { cwd, encoding: "utf8" });
const onMain = (branch.stdout ?? "").trim() === "main";
const script = onMain ? "verify" : "verify:static";
const result = spawnSync("pnpm", [script], { cwd, encoding: "utf8", shell: true });
if (result.status !== 0) {
  const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`.trim().split("\n").slice(-40);
  console.error(["The verify gate is red at turn end:", ...output].join("\n"));
  process.exit(2);
}
process.exit(0);
