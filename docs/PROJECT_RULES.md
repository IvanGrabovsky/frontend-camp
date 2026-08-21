# Frontend Camp Project Rules & Architecture

This document outlines key architectural decisions and rules to follow when extending the course.

## 1. Learning Platform Architecture

The project is built as a fully-featured learning platform based on **Next.js (App Router)**.
The entire learning process, navigation, roadmap, and content rendering are handled exclusively within the platform's UI.

**The single source of truth for lesson content is the `data/lessons/` directory (or `content/lessons/` for MDX).**
We do **NOT** create standalone static HTML files for each lesson inside `public/courses/`. Lesson content is provided either as HTML strings or MDX files, and is dynamically rendered inside the `HubLayout` wrapper (`app/courses/[courseSlug]/[lessonSlug]/page.tsx`).

*(The `public/courses/` folder may only be used for specific interactive playgrounds or static assets, but never for duplicating lesson text).*

## 2. Project Structure & Roadmap

The display of course blocks in the Next.js app is entirely driven by the `data/roadmap.ts` file.

When adding a new block or course, you must ensure consistency across three parts:

1. **Configuration (`roadmap.ts`):** Register the block in the `ROADMAP_BLOCKS` array. Define the lessons array (e.g., `JS_BASICS_LESSONS`) containing metadata (title, difficulty, etc.).
2. **README file (`blocks/` folder):** The `readmePath` property in the configuration **must point to an existing Markdown file** describing the module. If this file is missing, the Next.js app will fail to render the block overview page!
3. **Lesson Content (`data/lessons/` or `content/lessons/`):** The actual content for each lesson must be provided.

### Rule for Adding a New Block & Lessons:
- **STEP 1:** Create a folder in `blocks/` (e.g., `blocks/06-web-security/`).
- **STEP 2:** Create a `README.md` inside this folder describing the block.
- **STEP 3:** Add the block configuration in `data/roadmap.ts`, and **verify that `readmePath` exactly matches the created file path**.
- **STEP 4:** Create the content for the course (e.g. `data/lessons/[courseSlug].ts` for HTML strings, or `.mdx` files if using the MDX setup).
- **STEP 5:** **MANDATORY:** Register the new course in the `loaders` array inside `data/lessons/index.ts` so Next.js knows how to load it.

## 3. Common Pitfalls to Avoid

- ❌ **Creating lessons in `public/courses/` instead of `data/lessons/` (or MDX):** The platform only fetches content from the data/content directories. Adding HTML files to `public/` does not add them to Next.js navigation.
- ❌ **Mismatched README paths:** Always ensure the folder `blocks/[slug]/README.md` exists. For example, if `roadmap.ts` states `readmePath: 'blocks/05-web-security/README.md'`, but the folder is named `07-capstone`, the app will crash.
- ❌ **Unregistered loader:** If you created `data/lessons/my-course.ts` but forgot to add it to `data/lessons/index.ts`, lesson pages will open empty.
- ❌ **Deleting or renaming folders without updating `roadmap.ts`:** `roadmap.ts` is the single source of truth.

Follow these rules to ensure the course expands smoothly without breaking the platform.
