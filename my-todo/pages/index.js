import { useEffect, useState } from 'react';
import TodoList from '../components/TodoList';

function HomePage() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const response = await fetch('/api/todos');
    const data = await response.json();
    setTodos(data.data);
  }

  async function deleteTodoHandler(id) {
    await fetch(`/api/todos?id=${id}`, {
      method: 'DELETE',
    });
    fetchTodos();
  }

  async function toggleTodoHandler(id) {
    const todo = todos.find((t) => t._id === id);
    await fetch(`/api/todos?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify({ completed: !todo.completed }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    fetchTodos();
  }

  return (
    <div>
      <TodoList todos={todos} onDelete={deleteTodoHandler} onToggle={toggleTodoHandler} />
    </div>
  );
}

export default HomePage;
