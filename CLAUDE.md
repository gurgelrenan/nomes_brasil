# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 project named "nomes_brasil" using React 19, built with the App Router architecture. The project uses Turbopack for faster builds and development, TailwindCSS v4 for styling, and ESLint for code linting.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production with Turbopack
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

The development server runs on http://localhost:3000.

## Architecture

The project follows Next.js 15 App Router conventions:

- `src/app/` - Contains the main application code
  - `layout.js` - Root layout with Geist font configuration
  - `page.js` - Homepage component
  - `globals.css` - Global CSS styles with TailwindCSS

## Key Technologies

- **Next.js 15** with App Router
- **React 19**
- **Turbopack** for development and builds (enabled by default)
- **TailwindCSS v4** with PostCSS integration
- **Geist fonts** (Sans and Mono variants) from Google Fonts
- **ESLint** with Next.js core web vitals configuration

## Font System

The project uses Geist fonts with CSS variables:
- `--font-geist-sans` for the main sans-serif font
- `--font-geist-mono` for monospace text

Both fonts are loaded in the root layout and applied globally.