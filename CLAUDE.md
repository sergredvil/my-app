# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack (opens on http://localhost:3000)
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## TODO

Inside `tasks/todo.md` file you can find a list of tasks to be completed. Please read it carefully and start working on it. As you work on the tasks, please update the `tasks/todo.md` file to mark the tasks as completed. Once done, please check in with me

After each section is completed, please let me know and I'll handle committing and pushing the changes manually.

## Architecture Overview

This is a Next.js 15 application using the App Router architecture with TypeScript. The project follows modern React patterns and includes:

### Core Stack
- **Next.js 15** with App Router for server-side rendering and routing
- **React 19** with TypeScript for type safety
- **Tailwind CSS v4** for styling with CSS variables-based design system
- **shadcn/ui** components configured (see components.json)

### Project Structure
- `app/` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with Geist fonts
  - `page.tsx` - Home page component
  - `globals.css` - Global styles with Tailwind and design tokens
- `lib/utils.ts` - Utility functions including `cn()` for className merging
- `components.json` - shadcn/ui configuration with aliases

### Styling System
- Uses Tailwind CSS v4 with CSS custom properties
- Design system includes light/dark modes with OKLCH color space
- CSS variables defined for consistent theming (background, foreground, primary, etc.)
- Custom variant for dark mode styling

### Path Aliases
- `@/*` maps to root directory for cleaner imports
- shadcn/ui aliases: `@/components`, `@/lib/utils`, `@/components/ui`, etc.

### Development Notes
- Turbopack enabled for faster development builds
- ESLint configured with Next.js and TypeScript rules
- Strict TypeScript configuration with path mapping
- Uses Geist font family (sans and mono variants)