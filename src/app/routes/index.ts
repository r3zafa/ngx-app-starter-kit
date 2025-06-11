/**
 * Provides guidelines for organizing and importing sub-route definitions in the routes directory.
 *
 * Steps:
 * 1. Create a new file for each sub-route (e.g., `profile.routes.ts`, `reports.routes.ts`).
 * 2. In each file, define and export the corresponding route array (e.g., `export const profileRoutes = [...]`).
 * 3. Import each route array into `index.ts`.
 * 4. Add each imported route array to both the export list and the `appRoutes` array using the spread operator.
 * 5. Ensure all route files use a consistent export pattern.
 */