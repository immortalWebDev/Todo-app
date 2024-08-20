import { useState } from 'react';
import styles from './TodoItem.module.css'; 

function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    if (newText.trim()) {
      await onEdit(todo._id, newText);
      setIsEditing(false);
    }
  };

  return (
    <li className={styles.item}>
      {isEditing ? (
        <div className={styles.actions}>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className={styles.editInput}
          />
          <button onClick={handleSaveClick} className={styles.toggleButton}>
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className={styles.deleteButton}>
            Cancel
          </button>
        </div>
      ) : (
        <div className={styles.actions}>
          <span className={`${styles.text} ${todo.completed ? styles.completed : ''}`}>
            {todo.text}
          </span>
          <div className={styles.actions}>
            <button onClick={() => onToggle(todo._id)} className={styles.toggleButton}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => onDelete(todo._id)} className={styles.deleteButton}>
              Delete
            </button>
            <button onClick={handleEditClick} className={styles.editButton}>
              Edit
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TodoItem;
