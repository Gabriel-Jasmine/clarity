# Consistent taxonomy guides

Date: 19 October 2026 (Asia/Singapore). UI/UX Playbook 1.8.0.
Owner approval: reviewed the all-section mock, requested the collapsible Wiggle Room response guide before its question, then explicitly authorized GitHub publication.

## Display contract

Use one `thinkingGuide` helper and neutral `.guide-disclosure` component. The short contextual introduction stays visible above it. The contextual title, detailed guidance and complete existing table appear inside. The header is **Thinking guide** for The Trade-Offs, Carrot on the Stick, What Compounds and The Domino Effect. Each guide precedes its supported questions inside the existing working frame.

Wiggle Room uses **Response guide** with the same styling and behaviour, before the main assessment question. Its definitions are shown in a two-column Response / What it means table. The six conditions and assessment controls remain visible; the old side column is removed so the assessment uses the available width.

All five disclosures start closed, toggle independently through native details/summary, and have a right-aligned local chevron. No accordion grouping, saved guide state or new answer is introduced. The existing Example component remains honey and closed initially. Shared tokens govern neutral surfaces, type, 16px internal insets, summary targets and narrow table spacing.

## Preserved scope

All 7 cost areas, 13 reward areas in 2 groups, 9 compounding areas with both practical and psychological explanations, 9 consequence prompts and 5 response definitions remain complete. Questions, local examples, selectable categories in Things Dear to You, six conditions in Wiggle Room, raw user writing, retained/history distinctions, assessment values, review logic, current/previous capture definitions and schema 2 are unchanged. Guide open state is local presentation only and resets on a full page/branch rerender, consistent with existing Example behaviour.

## Verification

All 15 existing regression suites pass. The Stress Test suite now checks the shared closed disclosure, its five complete definitions and its position before the assessment question. JavaScript syntax and whitespace checks pass. A baseline/current comparison verifies exact taxonomy arrays, current capture question definitions, readable decision export and normalized saved state across all twelve rendered sections. Targeted checks confirm one closed, independent guide on each affected page, a visible introduction before it and exact row counts of 7 / 13 / 9 / 9 / 5. The production component showcase includes closed/open Thinking guide states and the closed Response guide before assessment controls. Real-browser layout, native keyboard toggling and assistive-technology review remain unavailable in this runtime; source and DOM/storage checks do not establish visual quality or accessibility conformance.
