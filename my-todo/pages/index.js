import { useEffect, useState } from "react";
import TodoList from "../components/TodoList";
import Link from "next/link";
import styles from "./HomePage.module.css";
import Footer from "@/components/Footer";

function HomePage() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const response = await fetch("/api/todos");
    const data = await response.json();
    setTodos(data.data);
  }

  async function deleteTodoHandler(id) {
    await fetch(`/api/todos?id=${id}`, {
      method: "DELETE",
    });
    fetchTodos();
  }

  async function toggleTodoHandler(id) {
    const todo = todos.find((t) => t._id === id);
    await fetch(`/api/todos?id=${id}`, {
      method: "PUT",
      body: JSON.stringify({ completed: !todo.completed }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetchTodos();
  }

  async function editTodoHandler(id, newText) {
    const response = await fetch(`/api/todos?id=${id}`, {
      method: "PUT",
      body: JSON.stringify({ text: newText }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const updatedTodo = await response.json();
      setTodos(
        todos.map((todo) => (todo._id === id ? updatedTodo.data : todo))
      );
    }
  }

  return (
    <div className={styles.container}>
      <TodoList
        todos={todos}
        onDelete={deleteTodoHandler}
        onToggle={toggleTodoHandler}
        onEdit={editTodoHandler}
      />
      <div className={styles.buttons}>
        <Link href="/completed">
          <button className={styles.button}>Completed Tasks</button>
        </Link>
        <Link href="/pending">
          <button className={styles.button}>Pending Tasks</button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
