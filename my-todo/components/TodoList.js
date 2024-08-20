import TodoItem from './TodoItem';
import Link from 'next/link';
import styles from './TodoList.module.css';

function TodoList({ todos, onDelete, onToggle }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Todo List</h2>
        <Link href="/new">
          <button className={styles.addButton}>Add New Task</button>
        </Link>
      </div>
      <ul className={styles.list}>
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

