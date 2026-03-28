# Project Tracker

A lightweight, modern project and task management application built with React and Vite.

## Features

- User authentication (Login/Sign Up)
- Project management
- Task tracking and organization
- Responsive dashboard interface

## Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Development
```bash
npm run dev
```
Runs the app in development mode at `http://localhost:5173`

### Build
```bash
npm run build
```
Builds the optimized production bundle.

### Preview
```bash
npm run preview
```
Preview the production build locally.

### Lint
```bash
npm run lint
```
Run ESLint to check code quality.

## Project Structure

```
src/
├── components/      # React components
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── NavBar.jsx
│   ├── Tasks.jsx
│   └── ...
├── App.jsx         # Main App component
├── main.jsx        # Application entry point
└── index.css       # Global styles
```

## Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **ESLint** - Code linting
