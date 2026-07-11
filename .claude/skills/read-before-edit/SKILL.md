---
name: read-before-edit
description: Guardrail — ALWAYS Read a file before Edit/Write. Use whenever modifying, editing, updating, or rewriting ANY existing file in this repository (mock.js, components, configs, anything). Prevents the recurring "File has not been read yet" error that happens when Edit is attempted on an unread file.
---

# Read before Edit

## Rule

Before calling `Edit` or `Write` on ANY existing file, the file MUST first be
opened with the `Read` tool **in the current session**. No exceptions.

The harness enforces this: an `Edit` on an unread file always fails with
`File has not been read yet. Read it first before writing to it.` — and a
`Write` to an existing unread file fails the same way. Attempting the edit
anyway wastes a round-trip and repeats a mistake that has happened in
multiple sessions of this project.

## Checklist (run through it before every Edit/Write)

1. Did I `Read` this exact file earlier **in this session**? If not → `Read` it now.
2. Grep output is NOT enough — `Grep` matches do not count as having read the file.
   `Read` the relevant section explicitly before editing.
3. For large files (e.g. `frontend/src/mock.js`, ~1200+ lines), reading a
   targeted section with `offset`/`limit` around the edit location is sufficient
   and preferred over reading the whole file.
4. When planning several edits to one file, do the `Read` FIRST, then batch the
   edits.

## Common trap in this repo

`frontend/src/mock.js` holds all content/translations and is edited in almost
every session. Typical failure: locating text via `Grep`, then jumping straight
to `Edit` — which fails because the file was never `Read`. Always `Read` the
target section of `mock.js` before editing it.
