export default function Dashboard({ projects, tasks, onCreateProject, onSelectProject }) {
  // Get recent projects (last 8)
  const recentProjects = [...projects].reverse().slice(0, 8);

  // Calculate stats
  const totalProjects = projects.length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <main>
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Welcome back! Here's your project overview</p>
      </div>

      {/* Stats Overview */}
      <div className="stats">
        <div className="stat">
          <div className="stat-icon">📊</div>
          <div className="stat-value">{totalProjects}</div>
          <div className="stat-label">Total Projects</div>
        </div>

        <div className="stat">
          <div className="stat-icon">✅</div>
          <div className="stat-value">{completedTasks}</div>
          <div className="stat-label">Completed Tasks</div>
        </div>

        <div className="stat">
          <div className="stat-icon">🎯</div>
          <div className="stat-value">{totalTasks}</div>
          <div className="stat-label">Total Tasks</div>
        </div>

        <div className="stat">
          <div className="stat-icon">⚡</div>
          <div className="stat-value">{completionRate}%</div>
          <div className="stat-label">Completion Rate</div>
        </div>
      </div>

      <div className="container">
        {/* Recent Projects Section */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Recent Projects</h2>
            <button className="section-action" onClick={onCreateProject}>
              + New Project
            </button>
          </div>

          {recentProjects.length > 0 ? (
            <div className="projects-grid">
              {recentProjects.map((project) => {
                const projectTasks = tasks.filter(t => t.projectId === project.id);
                const completedProjectTasks = projectTasks.filter(t => t.completed).length;
                const progress = projectTasks.length > 0
                  ? Math.round((completedProjectTasks / projectTasks.length) * 100)
                  : 0;

                return (
                  <div
                    key={project.id}
                    className="project-card"
                    onClick={() => onSelectProject(project.id)}
                  >
                    <div className="project-card-header">
                      <h3 className="project-card-title">{project.title}</h3>
                      <span className="project-card-date">
                        {new Date(project.dueDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>

                    <p className="project-card-description">{project.description}</p>

                    <div className="project-card-footer">
                      <div className="progress-mini">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="progress-text">{progress}% • {projectTasks.length} tasks</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">📭</div>
              <p>No projects yet</p>
              <button className="btn-primary" onClick={onCreateProject}>
                Create Your First Project
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
