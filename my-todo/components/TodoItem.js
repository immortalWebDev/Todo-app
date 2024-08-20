import styles from './TodoItem.module.css';

function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <li className={styles.item}>
      <span
        className={`${styles.text} ${todo.completed ? styles.completed : ''}`}
      >
        {todo.text}
      </span>
      <div className={styles.actions}>
        <button className={styles.toggleButton} onClick={() => onToggle(todo._id)}>
          {todo.completed ? 'Undo' : 'Complete'}
        </button>
        <button className={styles.deleteButton} onClick={() => onDelete(todo._id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
