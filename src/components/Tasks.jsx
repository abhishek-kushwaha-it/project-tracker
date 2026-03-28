import { useState } from 'react';
import NewTask from './NewTask.jsx';

// Consistent priority labels
const PRIORITY_OPTIONS = [
  { label: 'Very Important', value: 'Very Important', class: 'critical' },
  { label: 'Important', value: 'Important', class: 'high' },
  { label: 'Nice to Have', value: 'Nice to Have', class: 'medium' },
  { label: 'Low Priority', value: 'Low Priority', class: 'low' }
];

function TaskItem({ task, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.text);
  const [priority, setPriority] = useState(task.priority ?? 'Important');

  function save() {
    if (text.trim()) {
      onUpdate(task.id, { text: text.trim(), priority });
      setEditing(false);
    }
  }

  function cancel() {
    setText(task.text);
    setPriority(task.priority ?? 'Important');
    setEditing(false);
  }

  function toggleComplete() {
    onUpdate(task.id, { completed: !task.completed });
  }

  const getPriorityClass = (p) => {
    const option = PRIORITY_OPTIONS.find(opt => opt.value === p);
    return option?.class || 'high';
  };

  return (
    <li className="task">
      {editing ? (
        <div className="task-edit-form">
          <input 
            className="task-input" 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            placeholder="Task description..."
            autoFocus
          />
          <select 
            className="task-input" 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)}
          >
            {PRIORITY_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      ) : (
        <div className="task-content">
          <label className="task-checkbox" title="Toggle completion">
            <input 
              type="checkbox" 
              checked={!!task.completed} 
              onChange={toggleComplete}
              aria-label={`Mark "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`}
            />
          </label>
          <span className={task.completed ? 'task-text completed' : 'task-text'}>
            {task.text}
          </span>
          <div className="task-priority">
            <span className={`priority-badge priority-${getPriorityClass(priority)}`}>
              {priority}
            </span>
          </div>
        </div>
      )}

      <div className="task-actions">
        {editing ? (
          <>
            <button className="task-btn task-btn-success btn-sm" onClick={save} title="Save changes">Save</button>
            <button className="task-btn task-btn-secondary btn-sm" onClick={cancel} title="Cancel editing">Cancel</button>
          </>
        ) : (
          <>
            <button className="task-btn btn-sm" onClick={() => setEditing(true)} title="Edit task">Edit</button>
            <button className="task-btn task-btn-danger btn-sm" onClick={() => onDelete(task.id)} title="Delete task">Delete</button>
          </>
        )}
      </div>
    </li>
  );
}

export default function Tasks({ tasks, onAdd, onDelete, onUpdate }) {
  return (
    <section className="tasks">
      <h2 className="tasks-title">Tasks</h2>
      <NewTask onAdd={onAdd} />
      {tasks.length === 0 && (
        <div className="no-tasks">
          <div className="empty-state-icon">📝</div>
          <p>No tasks yet. Create one to get started!</p>
        </div>
      )}
      {tasks.length > 0 && (
        <ul className="tasks-list">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onDelete={onDelete} onUpdate={onUpdate} />
          ))}
        </ul>
      )}
    </section>
  );
}
