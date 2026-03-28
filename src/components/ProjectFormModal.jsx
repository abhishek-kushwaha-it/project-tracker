import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const ProjectFormModal = forwardRef(function ProjectFormModal({ onSubmit }, ref) {
  const dialog = useRef();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  useImperativeHandle(ref, () => {
    return {
      open() {
        setTitle('');
        setDescription('');
        setDueDate('');
        setError('');
        dialog.current?.showModal();
      },
    };
  });

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!title.trim() || !description.trim() || !dueDate.trim()) {
      setError('Please fill in all fields');
      return;
    }

    onSubmit({ title, description, dueDate });
    dialog.current?.close();
  }

  return createPortal(
    <dialog ref={dialog} className="modal">
      <div className="modal-inner">
        <h2 className="modal-title">Create New Project</h2>
        {error && <div className="form-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="project-title">Project Title</label>
            <input
              id="project-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter project name"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="project-description">Description</label>
            <textarea
              id="project-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your project"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="project-duedate">Due Date</label>
            <input
              id="project-duedate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="modal-footer">
            <button type="button" onClick={() => dialog.current?.close()} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Project
            </button>
          </div>
        </form>
      </div>
    </dialog>,
    document.getElementById('modal-root')
  );
});

export default ProjectFormModal;
