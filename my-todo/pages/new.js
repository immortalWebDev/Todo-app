import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './NewTodoPage.module.css'; 

function NewTodoPage() {
  const [text, setText] = useState('');
  const router = useRouter();

  async function addTodoHandler(event) {
    event.preventDefault();

    const response = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      router.push('/');
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add New Task</h2>
      <form className={styles.form} onSubmit={addTodoHandler}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter new task"
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Add Task</button>
      </form>
    </div>
  );
}

export default NewTodoPage;
