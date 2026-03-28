import Tasks from './Tasks.jsx';

export default function SelectedProject({
  project,
  onDelete,
  onBack,
  onAddTask,
  onDeleteTask,
  onUpdateTask,
  tasks,
}) {
  const formattedDate = new Date(project.dueDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const projectTasks = tasks.filter((t) => t.projectId === project.id);

  const weightOf = (priority) => {
    switch ((priority || 'Important').toLowerCase()) {
      case 'very important':
      case 'very-important':
        return 4;
      case 'important':
        return 3;
      case 'nice to have':
      case 'nice-to-have':
        return 2;
      default:
        return 2;
    }
  };

  const totalWeight = projectTasks.reduce((s, t) => s + weightOf(t.priority), 0) || 0;
  const completedWeight = projectTasks.reduce((s, t) => s + ((t.completed ? weightOf(t.priority) : 0)), 0) || 0;
  const progressPercent = totalWeight > 0 ? Math.round((completedWeight / totalWeight) * 100) : 0;

  return (
    <div className="project-view">
      <div className="project-header">
        <button className="project-header-btn" onClick={onBack} title="Back to dashboard">
          ← Back
        </button>
        <div className="project-header-content">
          <h1 className="project-header-title">{project.title}</h1>
        </div>
        <button className="btn-danger" onClick={onDelete} title="Delete project">
          🗑️ Delete
        </button>
      </div>
      
      <div className="project-info">
        <p className="project-description">{project.description}</p>
        <div className="project-date">{formattedDate}</div>
      </div>
      
      <div className="project-info">
        <div className="project-progress">
          <div className="progress-large">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
          <div className="project-progress-label">Progress: {progressPercent}%</div>
        </div>
      </div>
      
      <Tasks onAdd={onAddTask} onDelete={onDeleteTask} onUpdate={onUpdateTask} tasks={projectTasks} />
    </div>
  );
}