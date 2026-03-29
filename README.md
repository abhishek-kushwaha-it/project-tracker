# Project Tracker

A lightweight, modern project and task management application built with **React 18** and **Vite**. Manage your projects, track tasks, and monitor progress with an intuitive user interface.

## ✨ Features

- **User Authentication**: Secure login and registration system with localStorage persistence
- **Project Management**: Create, view, and delete projects with descriptions and due dates
- **Task Tracking**: Add, edit, complete, and delete tasks with priority levels
- **Progress Monitoring**: Real-time progress tracking for projects based on completed tasks
- **Priority System**: Four priority levels - Very Important, Important, Nice to Have, Low Priority
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Local Data Persistence**: All data is stored locally using browser's localStorage

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project-tracker
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:5173` with hot module reloading enabled.

### Production Build

Create an optimized production bundle:
```bash
npm run build
```

The build output will be in the `dist/` directory. This production build includes:
- Code minification with Terser
- Removed console statements
- Vendor code splitting
- Optimized asset delivery

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

### Code Quality

Run ESLint to check code quality:
```bash
npm run lint
npm run lint:fix
```

## 📁 Project Structure

```
project-tracker/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx          # Main dashboard with stats and recent projects
│   │   ├── SelectedProject.jsx    # Project view with task management
│   │   ├── Tasks.jsx              # Task list component
│   │   ├── NewTask.jsx            # Task creation form
│   │   ├── NavBar.jsx             # Header navigation with user info
│   │   ├── Login.jsx              # User login page
│   │   ├── SignUp.jsx             # User registration page
│   │   ├── ProjectFormModal.jsx   # Project creation modal
│   │   └── Modal.jsx              # Reusable modal component
│   ├── App.jsx                    # Main application component
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Global styles
├── index.html                     # HTML entry point
├── vite.config.js                 # Vite configuration
├── package.json                   # Project dependencies
└── README.md                      # This file
```

## 🎯 Usage Guide

### Creating an Account

1. On the login page, click "Sign up here"
2. Enter your username (min 3 characters), email, and password (min 6 characters)
3. Confirm your password and submit
4. You'll be automatically logged in

### Logging In

1. Enter your registered email and password
2. Click "Login" to access your dashboard

### Managing Projects

**Create Project:**
- Click "New Project" button on the dashboard
- Fill in the project title, description, and due date
- Click "Create Project"

**View Project:**
- Click on any project card to view its details and manage tasks

**Delete Project:**
- Open a project and click the "Delete" button (🗑️)

### Managing Tasks

**Add Task:**
1. Open a project or go to the dashboard
2. Enter task description in the input field
3. Select priority level from the dropdown
4. Click "Add Task"

**Edit Task:**
1. Click "Edit" on a task
2. Modify the task description or priority
3. Click "Save" to confirm

**Complete Task:**
- Click the checkbox next to a task to mark it as complete
- Completed tasks show with strikethrough text

**Delete Task:**
- Click "Delete" on a task to remove it


## Data Storage

- All user credentials are stored locally in the browser's localStorage
- No backend server required for local use
- Each browser/device maintains its own separate data
- **Note**: This is suitable for personal use. For production deployment, implement a backend server with proper authentication

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.
