# Defects

Always-on (adr-003, factor 15).

- A `Bug` ticket is not started until it carries: a named **consequence**, a **reproduction**, and
  a **red regression test** (path + red output) that fails first.
- The fix turns that test green; the test stays.
- A bug that passed a green gate is a harness defect too: the `/work` retrospective lands the
  fixture, rule, gate or harness step that catches its class.
- A `Bug` row in `WORK-ITEMS.md` is not `In progress` until its red test exists.
