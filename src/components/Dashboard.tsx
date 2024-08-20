import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { type Schema } from '@/amplify/data/resource';

const client = generateClient<Schema>();

const Dashboard: React.FC = () => {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    const subscription = client.models.Todo.observeQuery().subscribe({
      next: ({ items }) => setTodos(items),
    });

    return () => subscription.unsubscribe();
  }, []);

  const createTodo = async () => {
    const content = window.prompt("Enter todo content:");
    if (content) {
      await client.models.Todo.create({ content });
    }
  };

  const deleteTodo = async (id: string) => {
    await client.models.Todo.delete({ id });
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Welcome to the Call Management System dashboard.</p>
      
      <div className="todo-section">
        <h3>Todo List</h3>
        <button onClick={createTodo}>Add Todo</button>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} onClick={() => deleteTodo(todo.id)}>
              {todo.content}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Placeholder for future dashboard widgets */}
      <div className="dashboard-widgets">
        <div className="widget">
          <h3>Recent Calls</h3>
          <p>Widget content coming soon...</p>
        </div>
        <div className="widget">
          <h3>System Status</h3>
          <p>Widget content coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;