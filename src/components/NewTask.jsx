import { useState } from 'react';

const PRIORITY_OPTIONS = [
  'Very Important',
  'Important',
  'Nice to have',
  'Causmatic changes',
];

export default function NewTask({ onAdd }) {
  const [enteredTask, setEnteredTask] = useState('');
  const [enteredPriority, setEnteredPriority] = useState('Important');

  function handleChange(event) {
    setEnteredTask(event.target.value);
  }

  function handlePriorityChange(e) {
    setEnteredPriority(e.target.value);
  }

  function handleClick() {
    if (enteredTask.trim() === '') return;
    onAdd({ text: enteredTask, completed: false, priority: enteredPriority });
    setEnteredTask('');
    setEnteredPriority('Important');
  }

  return (
    <div className="task-form">
      <input
        type="text"
        placeholder="Task description"
        className="task-input"
        onChange={handleChange}
        value={enteredTask}
      />
      <select className="task-input" value={enteredPriority} onChange={handlePriorityChange}>
        {PRIORITY_OPTIONS.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
      <button
        className="task-add-btn"
        onClick={handleClick}
        disabled={enteredTask.trim() === ''}
        aria-disabled={enteredTask.trim() === ''}
      >
        Add Task
      </button>
    </div>
  );
}
