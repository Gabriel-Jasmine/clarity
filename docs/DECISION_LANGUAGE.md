# Decision language and framing

## Section-name overlay — 19 October 2026

[Approved section titles and icons](SECTION_NAMES_2026-10-19.md) now govern the section labels referenced by this contract. The opening section is **The Decision**, alternatives are explored in **Cost of Yes**, and the remaining former/current names are mapped there. The decision/action framing, approved questions, examples, response meanings, exact saved writing and previous definitions below are unchanged. Old section names in the dated wording inventory are historical references, not instructions to restore old navigation labels.

Adopted by the product owner on 18 October 2026. Build: `20261018-decision-language`.

This is the current public language and opening-framing contract. Read it before future questions, guidance, examples, summaries, exports or AI interpretation work. It supersedes the older rule that required users to “work through a decision, consider a choice, and make this choice.” The private language guide links here and retains the dated history.

## Concept and scope

**Decision** names the overall matter someone is trying to resolve. The opening asks **What decision are you trying to make?** and helps the person identify one concrete action they are considering. The fixed, non-editable starter is **I’m deciding whether to…**; only the person's action is stored in the existing answer field. Existing writing is preserved without removing a prefix, changing case or recasting a sentence.

Refer to the contemplated action as **this**, **doing this**, **if you do this** or **if you don’t do this**, with its text visibly available nearby. Use **You’re considering** above action references. Avoid replacing “choice” mechanically with “decision”: deciding and doing are different. Do not use “move”, “go ahead”, “take this step” or “act on this decision” as a new universal substitute. The ordinary verbs choose/decide remain available, as do technical control terms such as radio choices and retained internal identifiers.

This remains a reflection about one contemplated action. Alternatives are explored in Trade-Offs; the tool does not compare every alternative or determine a winner. Doing nothing, maintaining an arrangement or stopping something can still be the concrete action someone is considering. The opening must not imply a commitment to proceed. In AI context, **Action under consideration** identifies the focal action explicitly.

The immediate **Aim for this decision** and broader **Direction in life** remain distinct. Ask **What are you hoping to achieve?** for the immediate aim. Keep the psychological purposes, uncertainty states, boundary meanings, one-origin consequence trails, source grouping, assessments and section order intact.

## Key wording

- Opening: **What decision are you trying to make?**
- Helper: **Focus on one action you’re considering. You’ll explore other ways forward as you work through it.**
- Fixed answer starter: **I’m deciding whether to…**
- Example: **I’m deciding whether to open a community pottery studio.**
- Leaning: **Do this / Not do this**, beneath **Which way are you leaning right now?**
- Aim: **What are you hoping to achieve?**
- Immediate cost: **If you do this, what would you have to give up or delay immediately?**
- Immediate change: **What is one immediate change this could bring?**
- Boundaries: **Would doing this respect what you need to protect?** with **Respects this boundary / Conflicts with this boundary / I’m not sure yet**.
- Drivers retain **Supports it / Against it / Neither / Not sure**, assessed in relation to taking the contemplated action.

## Opening presentation

The starter is outside the editable answer, directly above it, using the existing 16px/26px regular writing role. The textarea has its persistent question, helper, example and associated starter, retains native focus/resizing, and stays empty for a new decision. The example is illustrative and is never saved as a default. A returning person's complete sentence remains exact; the starter is a separate cue and is never prepended to their value or repeated in every context view. No new bordered writing surface is introduced.

## Persistence and provenance

The storage key, option/action IDs, existing `choiceOptionId`, `choiceInclination`, `decisionMode`, make/not values, source IDs and schema version 2 remain unchanged. These are compatibility identifiers, not a user-facing vocabulary policy. No review-policy reset or answer migration is introduced.

Twenty current question definitions advance to wording version 2. The old baseline, retired questions and previous definitions remain available. Question versions describe export definitions, not when a user originally saw or answered a prompt; original capture times remain unknown. Response-label metadata preserves both old and current wording without translating raw saved values.

Stored source/history quotations must not be rewritten. For the Devil's Advocate “no connection” response, source freshness recognizes the two complete known system-label formats only when they correspond to the exact same current structured outcome and response. Arbitrary user text is never normalized. A genuine outcome/action/source edit continues to trigger the existing relevant review rules.

## Maintenance

Update the visible prompt, helper/example where affected, generated information needs, accessible names, Overview, AI context and current definition metadata together. Keep current copy aligned in the component showcase and guide. Preserve the approved homepage copy. The wider briefing redesign and a single shared fictional example remain separate work.

Update the private `CLARITY_LANGUAGE_GUIDE.md`, `PRODUCT_REASONING.md`, `CURRENT_PRODUCT.md`, `UX_UI_LOG.md`, `OPEN_QUESTIONS.md` and `CHANGELOG.md` when this contract changes. Research/coverage registers retain their existing scientific scope; a vocabulary update is not new psychological capture or validation.

## Verification

Existing regression suites and `tests/decision-language.cjs` cover current definitions, historical wording, raw writing, action-only storage, leaning values, source freshness, retained history, review stability and genuine-edit detection. Browser validation and publication outcome are recorded in the rollout record below.

## Approved wording inventory

The inventory below records the static system-copy replacements applied in this release. Repeated instances are updated together; it is not a search-and-replace policy for saved answers or historical documents.

| Earlier current copy | Adopted copy |
| --- | --- |
| What choice are you considering? | What decision are you trying to make? |
| Write it as something you could choose to do. | Focus on one action you’re considering. You’ll explore other ways forward as you work through it. |
| Describe the choice you’re considering… | Describe what you’re considering doing… |
| Make this choice | Do this |
| Not make this choice | Not do this |
| What do you want this choice to help you achieve? | What are you hoping to achieve? |
| How long could the consequences of this choice affect your life? | If you do this, how long could the consequences affect your life? |
| Leaning towards making this choice | Leaning towards doing this |
| Leaning towards not making this choice | Leaning towards not doing this |
| Which of these could be meaningfully affected by this choice? | Which of these could be meaningfully affected if you do this? |
| A hard boundary is a condition any acceptable choice must respect. Write what you need to preserve or what cannot happen. | A hard boundary is a condition that must be respected, whatever you decide. Write what you need to preserve or what cannot happen. |
| I cannot accept a choice that… | I cannot accept an outcome that… |
| If you don’t make this choice, what other ways could you move forward? | If you don’t do this, what other ways could you move forward? |
| If you make this choice, what would you have to give up or delay immediately? | If you do this, what would you have to give up or delay immediately? |
| What would you be giving up in the future if you make this choice? | What would you be giving up in the future if you did this? |
| Consider what this choice could leave you unable to do, keep or pursue now | Consider what doing this could leave you unable to do, keep or pursue now |
| How this choice could affect your current income or your ability to earn a living. | How doing this could affect your current income or your ability to earn a living. |
| What would making this choice require you to give up, delay or make harder to sustain? | What would doing this require you to give up, delay or make harder to sustain? |
| Explain how this choice could create that limitation. | Explain how doing this could create that limitation. |
| Making this choice would mean leaving the home I own | Doing this would mean leaving the home I own |
| What do you expect to gain from making this choice? | What do you expect to gain if you do this? |
| What do you want this choice to help you reduce, leave behind or avoid? | What are you hoping to reduce, leave behind or avoid by doing this? |
| What this choice could give you access to or change in your circumstances. | What doing this could give you access to or change in your circumstances. |
| How you expect this choice to help you feel or experience yourself. | How you expect to feel or experience yourself if you do this. |
| including what this choice could give you and what it could help you reduce or leave behind. | including what you could gain and what you could reduce or leave behind by doing this. |
| Write what you expect this choice to give you… | Write what you expect to gain… |
| Consider whether what attracts you to this choice supports that direction | Consider whether what attracts you to doing this supports that direction |
| How do the rewards and relief drawing you towards this choice fit with your direction? | How do these rewards and relief fit with your direction? |
| If you make this choice, what could you build on over time? | If you do this, what could you build on over time? |
| What could this choice make harder to sustain or keep pursuing over time? | What could doing this make harder to sustain or keep pursuing over time? |
| Explain how this choice could gradually reduce your ability or willingness | Explain how doing this could gradually reduce your ability or willingness |
| These are starting points, not a complete list or predictions about your choice. | These are starting points, not a complete list or predictions about what will happen. |
| What could this choice lead to? | What could this lead to? |
| These areas serve as a starting point for seeing how this choice could influence your life. | These areas serve as a starting point for seeing how doing this could influence your life. |
| Write down the first change this choice could bring. | Write down the first change this could bring. |
| What is one immediate change this choice could bring? | What is one immediate change this could bring? |
| Could making this choice lead you towards that outcome? If so, how? | Could doing this lead you towards that outcome? If so, how? |
| Explain which parts of the outcome this choice could contribute to, and how. | Explain which parts of the outcome doing this could contribute to, and how. |
| No, I don’t see this choice leading towards that outcome | No, I don’t see this leading towards that outcome |
| Consider whether you could still sustain this choice without crossing an important boundary. | Consider whether you could continue with what you’re considering without crossing an important boundary. |
| The setback would not materially affect whether this choice is workable. | The setback would not materially affect whether doing this is workable. |
| Does the choice you’re considering respect what you need to protect? | Would doing this respect what you need to protect? |
| This choice respects it | Respects this boundary |
| This choice would conflict with it | Conflicts with this boundary |
| These notes are retained. Include one if it still belongs in your thinking about this choice. | These notes are retained. Include one if it still belongs in your thinking about this decision. |
| Are other people’s views, expectations or progress affecting how you see this choice? | Are other people’s views, expectations or progress affecting how you see this decision? |
| Is your current path, past investment or an existing commitment affecting how you see this choice? | Is your current path, past investment or an existing commitment affecting how you see this decision? |
| Are your current feelings, energy levels or pressures affecting how you see this choice? | Are your current feelings, energy levels or pressures affecting how you see this decision? |
| Are particular words or descriptions shaping how you see this choice? | Are particular words or descriptions affecting how you see this decision? |
| How are you describing this choice, and what does that description bring into focus? | How are you describing this decision, and what does that description bring into focus? |
| Is a particular experience, story or comparison shaping how you see this choice? | Is a particular experience, story or comparison affecting how you see this decision? |
| Explain why this matters alongside your own reasons for the choice. | Explain why this matters alongside your own reasons for the decision. |
| Define the choice you’re considering and what you want it to help you achieve. | State the decision you’re trying to make and what you hope to achieve. |
| Step back from this decision to consider the life you want to build, what matters most, and what any acceptable choice must protect. | Step back from this decision to consider the life you want to build, what matters most, and what you need to protect whatever you decide. |
| Every choice comes with gains and sacrifices. Consider what making this choice would require you to give up, postpone or make harder to sustain in your life. | Every decision comes with gains and sacrifices. Consider what doing this would require you to give up, postpone or make harder to sustain in your life. |
| What a choice offers you, or helps you get away from, can influence your decision. These rewards can also draw you towards a particular way of living or working. Identify what makes this choice attractive, then consider how it fits the direction you want for your life. | What you could gain or leave behind can influence your decision. These rewards can also draw you towards a particular way of living or working. Identify what makes doing this attractive, then consider how it fits the direction you want for your life. |
| Some effects of a choice build over time. | Some effects build over time. |
| Consider what making this choice could keep developing, reinforce or gradually weaken | Consider what doing this could keep developing, reinforce or gradually weaken |
| A choice can set off a chain of effects in your life. | Doing this could set off a chain of effects in your life. |
| To understand where a choice could lead, look beyond its first result. | To understand where it could lead, look beyond its first result. |
| Then consider whether making this choice could lead you there | Then consider whether doing this could lead you there |
| A choice can look workable when things go as expected. Consider how much room it would leave if some conditions became less favourable. | What you’re considering may look workable when things go as expected. Consider how much room you would have if some conditions became less favourable. |
| Your choice is not defined yet. | Your decision is not defined yet. |
| Choice under consideration | You’re considering |
| Your choice | Your decision |
| Reasons supporting this choice | Reasons for doing this |
| Reasons against this choice | Reasons against doing this |
| You have reflected on one choice. Its alternatives have not been comparatively assessed. | You have explored whether to do this. The alternatives have not been comparatively assessed. |
| Check whether this choice respects | Check whether doing this would respect |
| Clarify what you expect to gain from this choice. | Clarify what you expect to gain if you do this. |
| Clarify what you want this choice to help reduce, leave behind or avoid. | Clarify what you hope to reduce, leave behind or avoid by doing this. |
| Explore how the choice’s rewards fit with the direction you want for your life. | Explore how these rewards fit with the direction you want for your life. |
|  costs of making this choice. |  costs of doing this. |
| Explore what this choice could help build on over time. | Explore what doing this could help build on over time. |
| Explore what this choice could make harder to sustain or pursue over time. | Explore what doing this could make harder to sustain or pursue over time. |
| Explore whether making this choice could lead towards the outcome pictured in The Devil’s Advocate. | Explore whether doing this could lead towards the outcome pictured in The Devil’s Advocate. |
| Clarify the make-or-break conditions and limits you could manage for this choice. | Clarify the make-or-break conditions and limits you could manage if you did this. |
| supports or weighs against making this choice. | supports or weighs against doing this. |
| Clarify how long the consequences of this choice could affect your life. | Clarify how long the consequences of doing this could affect your life. |
| Clarify whether particular words or descriptions are shaping how you see this choice. | Clarify whether particular words or descriptions are affecting how you see this decision. |
| Clarify whether a particular experience, story or comparison is shaping how you see this choice. | Clarify whether a particular experience, story or comparison is affecting how you see this decision. |
| Clarify whether your current feelings, energy levels or pressures are affecting how you see this choice. | Clarify whether your current feelings, energy levels or pressures are affecting how you see this decision. |
| Clarify whether other people’s views, expectations or progress are affecting how you see this choice. | Clarify whether other people’s views, expectations or progress are affecting how you see this decision. |
| Larger buffers do not establish a better choice. | Larger buffers do not establish that you should do this. |
| not proof that the choice is safe. | not proof that doing this is safe. |
| The choice under consideration is provisional. Do not treat not making it as a defined alternative or interpret a single-path reflection as proof this is the best available choice. Explore realistic alternatives without inventing my preferences. | The action under consideration is provisional. Do not assume I have decided to do it. Do not treat not doing it as a fully defined alternative, or interpret this reflection as proof that it is the best available course of action. Explore realistic alternatives without inventing my preferences. |

## Rollout record

Implementation and validation: [Decision-language rollout](DECISION_LANGUAGE_2026-10-18.md).

