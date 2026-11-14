// PostToolUse hook (Edit|Write): formats the edited file so the gate's format check passes.
// Never blocks the edit. Files written through Bash are not seen; the gate is the backstop.
import { spawnSync } from "node:child_process";

let input = "";
for await (const chunk of process.stdin) input += chunk;
let filePath = "";
try {
  filePath = JSON.parse(input || "{}")?.tool_input?.file_path ?? "";
} catch {
  process.exit(0);
}
if (!/\.(ts|tsx|js|mjs|cjs|json|css|yml|yaml)$/i.test(filePath)) process.exit(0);

const cwd = process.env.CLAUDE_PROJECT_DIR || process.cwd();
spawnSync("pnpm", ["exec", "prettier", "--write", "--ignore-unknown", filePath], {
  cwd,
  stdio: "ignore",
  shell: true,
});
process.exit(0);
