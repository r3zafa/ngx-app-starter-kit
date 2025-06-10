# ngx-app-starter-kit

A modern Angular 18 starter kit with Docker, devcontainer, and Angular Material integration for rapid, scalable web app development.

[![GitHub Repo](https://img.shields.io/badge/GitHub-ngx--app--starter--kit-blue?logo=github)](https://github.com/r3zafa/ngx-app-starter-kit)

## Features

- **Angular 18**: Built with the latest Angular framework for modern web development.
- **Dockerized Development**: Includes Docker and Docker Compose for consistent development environments.
- **Devcontainer Support**: Optimized for GitHub Codespaces and VS Code Remote Containers.
- **Angular Material**: Pre-configured with Material 3 (M3) theming.
- **Translation Support**: Integrated with `@ngx-translate` for multi-language support.
- **Theming**: Dynamic light and dark theme toggling.
- **Component-Based Architecture**: Modular and reusable components for scalable development.
- **Quick Start Scripts**: Predefined scripts for building, testing, and serving the application.

## Using This Starter Kit via `npx`

You can quickly scaffold a new project using this template with `npx`:

```sh
npx create-app my-new-app
cd my-new-app
npm install
```

Replace `my-new-app` with your desired project name.

## Project Structure

The project is organized as follows:

- **`src/`**: Contains the main application code.
  - **`app/`**: Core application components and configuration.
    - `app.component.*`: Root component files.
    - `app.config.ts`: Application-wide configuration.
    - `app.routes.ts`: Application routing configuration.
  - **`components/`**: Reusable UI components.
    - **`content/`**: Content display component.
    - **`navbar/`**: Navigation bar component.
    - **`theme-toggler/`**: Component for toggling between light and dark themes.
    - **`translation-button/`**: Component for switching languages.
  - **`shared/`**: Shared utilities, services, and types.
    - **`helpers/`**: Helper functions (e.g., `http-loader-factory.helper.ts`).
    - **`interfaces/`**: Shared TypeScript interfaces.
    - **`providers/`**: Dependency injection providers (e.g., translation module provider).
    - **`services/`**: Application services (e.g., theme and sidenav services).
    - **`types/`**: Shared TypeScript types.
  - **`styles/`**: Global and component-specific styles.
    - `_animation.scss`: Animation styles.
    - `_palettes.scss`: Color palette definitions.
    - `m3-theme.scss`: Material 3 theme configuration.
    - `styles.scss`: Global styles.
- **`configs/`**: Configuration files for TypeScript, Karma, and polyfills.
- **`public/`**: Public assets such as icons and translation files.
  - **`i18n/`**: Translation files (e.g., `en.json`, `de.json`).
- **`docker/`**: Docker and Docker Compose configuration.
- **`bin/`**: Custom scripts (e.g., `create-app.cjs` for scaffolding new projects).
- **`.devcontainer/`**: Devcontainer configuration for VS Code Remote Containers.

## Demo Components

The project includes demo components such as `content`, `navbar`, `theme-toggler`, and `translation-button`. These components are provided as examples and can be replaced or customized to suit your application's needs.

---

For more details, see [Angular CLI Docs](https://angular.io/cli), [Angular Material](https://material.angular.io/), and the [ngx-app-starter-kit GitHub repo](https://github.com/r3zafa/ngx-app-starter-kit).