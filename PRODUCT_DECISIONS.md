# Clarity Product Decisions

This is the running record of meaningful product, reasoning, question-design, and UX decisions for Clarity.

## How to use this log

Add an entry whenever a meaningful conceptual change is approved and implemented.

Each entry should capture:

- **Changed** — what changed in the product or reasoning flow
- **Why** — the problem or reasoning that led to the change
- **Old logic** — what Clarity did or assumed before
- **New logic** — the approved direction
- **UX principle** — any reusable design principle learned
- **Affected** — sections, outputs, or implementation areas touched

Keep entries concise. This is a product reasoning record, not a technical changelog.

---

## 2026-10-03 — What Matters: preserve the zoom-out before evaluating the decision

### Changed
Refined the role of the What Matters section so the user first steps away from the immediate decision, surfaces the larger life they want to build or protect, identifies what matters within that life, and only then brings the current decision back into view.

Hard-boundary testing against individual options was removed from this section because option evaluation should happen later.

### Why
If the current decision appears too early, it can narrow the user's frame and cause the immediate problem to define the criteria by which it is judged. Clarity should establish the user's reference point before asking them to assess options.

### Old logic
What Matters moved relatively quickly from life domains into how the current decision affected them, and hard boundaries were checked against each option inside the same section.

### New logic
The mini-funnel is:

**Life direction → what matters within that life → what is at stake in this decision → hard boundaries**

Hard boundaries are defined here, but options are not tested against them yet.

### UX principle
Do not ask users to evaluate a choice until the reference point for evaluating it has been established independently.

Remove interface friction, not thinking friction.

### Affected
- Decision
- What Matters
- Later option-evaluation flow
