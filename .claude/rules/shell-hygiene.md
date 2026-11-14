# Shell & evidence hygiene

Always-on: applies to any shell command.

- Verify state after a state-changing command; don't trust an exit code read through a pipe
  (`cmd | tail` returns tail's status). After a commit, confirm with `git log`, not `$?`.
- Don't `2>/dev/null` an exploratory query; a suppressed error reads as an empty result.
- Anchor grep patterns to the field you mean; a bare number matches timestamps and ids too.
- Never run a command that writes to the Neon database or calls a paid model API outside a ticket
  that names it in Blast radius.
