# Screens

Five screens. Navigation bar on every screen: **Opportunities · Letter Assistant · My Space · About**.

## S1. Opportunities (home)

**Purpose:** find relevant opportunities quickly.

- Search box (keyword)
- Filters: field, level (Master's / PhD / Internship / Training), funding (full / partial), country
- "Clear filters" button, "Show closed" toggle, sort by deadline
- Result count ("18 opportunities")
- Cards: title, provider, country, level, funding badge, deadline ("Closes in 12 days"), Save button
- Empty state: "No opportunities match. Try clearing a filter."

**Requirements:** R1, R2, R3, R4, R6, R7

## S2. Opportunity Detail

**Purpose:** decide whether to apply.

- Title, provider, country, level, funding
- Deadline and "Last verified" date
- Summary and requirements list
- **Apply on official site** button (opens a new tab)
- Save to shortlist
- **Write a letter for this** button (opens S3 pre-filled)

**Requirements:** R5, R7, R10, R20

## S3. Letter Assistant

**Purpose:** draft or improve a motivation letter.

- Privacy notice (shown before first use, dismissible): text goes to a third-party AI service, don't include personal identifiers
- Two modes as tabs:
  - **Draft:** inputs for target opportunity, field, key points about you, then Generate
  - **Improve:** paste a letter, then Improve, then see the original and revised versions side by side and choose one
- Editor with the current text
- **Save to My Space** (asks for a title), **Copy**, **Download .txt**
- Loading state and error message (R11)

**Requirements:** R8, R9, R10, R11, R15, R18

## S4. My Space

**Purpose:** keep every document in one place.

- Banner: "Your documents are saved only in this browser. Export a backup regularly."
- **Documents** list: title, type, last edited; actions to open, rename, download, delete
- **Shortlist** section: saved opportunities, each linking to S2
- **Export backup** and **Import backup** buttons
- Empty state: "No documents yet. Start one in the Letter Assistant."

**Requirements:** R12, R13, R14, R15, R7, R23

## S5. About & Privacy

**Purpose:** build trust and explain how data is handled.

- What the platform is and who it's for
- Where the opportunity data comes from and how often it's checked
- Where documents are stored (this browser only) and what is sent to the AI service
- How to back up and delete your data

**Requirements:** R16, R17, R18, R21