import React, { useState } from 'react';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description || '');
    const [dueDate, setDueDate] = useState(todo.dueDate || '');

    const handleUpdate = () => {
        onUpdate(todo.id, { ...todo, title, description, dueDate: dueDate || null });
        setIsEditing(false);
    };

    const toggleComplete = () => {
        onUpdate(todo.id, { ...todo, completed: !todo.completed });
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleString([], {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            {isEditing ? (
                <div className="edit-mode">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type="datetime-local"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                    <div className="edit-buttons">
                        <button onClick={handleUpdate}>Save</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div className="view-mode">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={toggleComplete}
                    />
                    <div className="content">
                        <h3>{todo.title}</h3>
                        <p>{todo.description}</p>
                        {todo.dueDate && <span className="due-date">Due: {formatDate(todo.dueDate)}</span>}
                    </div>
                    <div className="actions">
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button className="delete-btn" onClick={() => onDelete(todo.id)}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TodoItem;
