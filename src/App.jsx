import { useState, useEffect, useRef } from 'react';
import Dashboard from './components/Dashboard.jsx';
import SelectedProject from './components/SelectedProject.jsx';
import NavBar from './components/NavBar.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import ProjectFormModal from './components/ProjectFormModal.jsx';

// ============================================================================
// AUTH COMPONENT
// ============================================================================

function AuthPage({ onLogin, onSignUp }) {
  const [authPage, setAuthPage] = useState('login');

  return authPage === 'login' ? (
    <Login 
      onLogin={onLogin}
      onSwitchToSignUp={() => setAuthPage('signup')}
    />
  ) : (
    <SignUp 
      onSignUp={onSignUp}
      onSwitchToLogin={() => setAuthPage('login')}
    />
  );
}

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const raw = localStorage.getItem('project-tracker-current-user');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  function handleLogin(user) {
    setCurrentUser(user);
  }

  function handleLogout() {
    localStorage.removeItem('project-tracker-current-user');
    setCurrentUser(null);
  }

  if (!currentUser) {
    return <AuthPage onLogin={handleLogin} onSignUp={handleLogin} />;
  }

  return <MainApp user={currentUser} onLogout={handleLogout} />;
}

// ============================================================================
// MAIN APP LOGIC
// ============================================================================

function MainApp({ user, onLogout }) {
  const [projectsState, setProjectsState] = useState(() => {
    try {
      const raw = localStorage.getItem('project-tracker-data');
      return raw ? JSON.parse(raw) : { selectedProjectId: undefined, projects: [], tasks: [] };
    } catch (e) {
      return { selectedProjectId: undefined, projects: [], tasks: [] };
    }
  });
  const projectFormModalRef = useRef(null);

  // Persist state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('project-tracker-data', JSON.stringify(projectsState));
    } catch (e) {
      // ignore
    }
  }, [projectsState]);

  // ============================================================================
  // PROJECT HANDLERS
  // ============================================================================

  function handleSelectProject(id) {
    setProjectsState(prev => ({ ...prev, selectedProjectId: id }));
  }

  function handleAddProject(projectData) {
    setProjectsState(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        { ...projectData, id: Math.random() }
      ],
    }));
  }

  function handleDeleteProject() {
    setProjectsState(prev => ({
      ...prev,
      selectedProjectId: undefined,
      projects: prev.projects.filter(p => p.id !== prev.selectedProjectId),
    }));
  }

  function handleOpenProjectForm() {
    projectFormModalRef.current?.open();
  }

  function handleBackToDashboard() {
    setProjectsState(prev => ({ ...prev, selectedProjectId: undefined }));
  }

  // ============================================================================
  // TASK HANDLERS
  // ============================================================================

  function handleAddTask(taskData) {
    setProjectsState(prev => ({
      ...prev,
      tasks: [
        {
          text: taskData.text,
          priority: taskData.priority || 'Important',
          completed: false,
          projectId: prev.selectedProjectId,
          id: Math.random(),
        },
        ...prev.tasks,
      ],
    }));
  }

  function handleDeleteTask(taskId) {
    setProjectsState(prev => ({
      ...prev,
      tasks: prev.tasks.filter(t => t.id !== taskId),
    }));
  }

  function handleUpdateTask(taskId, updates) {
    setProjectsState(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === taskId ? { ...t, ...updates } : t),
    }));
  }

  // ============================================================================
  // RENDER
  // ============================================================================

  const selectedProject = projectsState.projects.find(
    p => p.id === projectsState.selectedProjectId
  );

  const isViewingProject = projectsState.selectedProjectId !== undefined && projectsState.selectedProjectId !== null;

  return (
    <>
      <NavBar user={user} onLogout={onLogout} />
      <main className="main-content">
        <div className="content-container">
          {isViewingProject ? (
            <SelectedProject
              project={selectedProject}
              onDelete={handleDeleteProject}
              onBack={handleBackToDashboard}
              onAddTask={handleAddTask}
              onDeleteTask={handleDeleteTask}
              onUpdateTask={handleUpdateTask}
              tasks={projectsState.tasks}
            />
          ) : (
            <Dashboard
              projects={projectsState.projects}
              tasks={projectsState.tasks}
              onCreateProject={handleOpenProjectForm}
              onSelectProject={handleSelectProject}
            />
          )}
        </div>
      </main>
      <ProjectFormModal ref={projectFormModalRef} onSubmit={handleAddProject} />
    </>
  );
}

export default App;
