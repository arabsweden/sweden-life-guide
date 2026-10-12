# TEST_PLAN.md — Sweden Life Guide
**Brand:** RAED SHIHAB — Arab Sweden Since 2007

## QA & Testing Coverage

1. **Pipeline Execution**:
   - Verify 5-stage pipeline processing with loading indicator states.
   - Test text, voice recording, image OCR, and document upload inputs.

2. **Grounding & Sources**:
   - Confirm all generated answers link exclusively to whitelisted `.se` domains.
   - Verify `needs_review` badge when official sources are absent or ambiguous.

3. **PDF & Email Exports**:
   - Test PDF generation in Arabic RTL layout.
   - Verify simulated Demo email dispatch modal with consent validation.

4. **50 Questions Matrix**:
   - Test suite of 50 pre-built Swedish life questions across all 13 categories (`src/data/qaMatrix.ts`).
