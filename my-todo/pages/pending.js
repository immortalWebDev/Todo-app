import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Tasks.module.css";
import Footer from "@/components/Footer";

function PendingTasks() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const response = await fetch("/api/todos?completed=false");
    const data = await response.json();
    setTodos(data.data);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pending Tasks</h1>
      {todos.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No pending tasks found.</p>
        </div>
      ) : (
        <ul className={styles.todoList}>
          {todos.map((todo) => (
            <li key={todo._id} className={styles.todoItem}>
              <span className={styles.text}>{todo.text}</span>
            </li>
          ))}
        </ul>
      )}
      <div className={styles.buttons}>
        <Link href="/">
          <button className={styles.button}>All Tasks</button>
        </Link>
        <Link href="/completed">
          <button className={styles.button}>Completed Tasks</button>
        </Link>
      </div>
      <Footer/>
    </div>
  );
}

export default PendingTasks;
