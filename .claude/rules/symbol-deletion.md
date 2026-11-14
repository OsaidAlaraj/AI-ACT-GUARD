# Deleting or renaming an export: enumerate the blast radius in BOTH directions

Always-on. Applies to deleting/renaming an export, changing an exported signature, or deleting a
module or test file. Enumerate at PLAN time and paste every command's output into the ticket.

Run for each symbol (and each deleted filename) across the whole harness surface:

```
grep -rn <symbol> apps packages e2e bench .claude CLAUDE.md PLAN.md docs tickets scripts *.json *.cjs *.mjs
```

1. **Deleted export → surviving consumers** (a re-export counts as a consumer).
2. **Deleted test file → the live code it covered**: prove each survivor is still covered, or the
   code is dead and goes too.
3. **References into deleted paths**: imports, `file:line` pointers, prose, config globs, docs.
4. **Dead-export check on survivors**: an export whose only hits are its definition and its own
   test is dead surface; delete it.

Do not scope this by line range. Ignore git-ignored build output.
