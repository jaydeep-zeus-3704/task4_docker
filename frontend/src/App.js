import React, { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    try {
      const res = await fetch(`http://${process.env.REACT_APP_BACKEND_HOST}:5000/todos`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setTodos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async (e) => {
    if (e) e.preventDefault();
    if (!task.trim()) return;
    
    setLoading(true);
    try {
      await fetch(`http://${process.env.REACT_APP_BACKEND_HOST}:5000/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: task.trim() }),
      });
      setTask('');
      await fetchTodos();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://${process.env.REACT_APP_BACKEND_HOST}:5000/todos/${id}`, { method: 'DELETE' });
      await fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        backgroundColor: '#ffffff',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)'
      }}>
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: '700', 
          color: '#111827', 
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          ✨ Task Manager
        </h1>
        
        <form onSubmit={addTodo} style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <input
            value={task}
            onChange={e => setTask(e.target.value)}
            placeholder="What needs to be done?"
            disabled={loading}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              fontSize: '15px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          />
          <button 
            type="submit"
            disabled={loading || !task.trim()}
            style={{
              padding: '10px 16px',
              backgroundColor: !task.trim() ? '#9ca3af' : '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: !task.trim() ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            {loading ? 'Adding...' : 'Add'}
          </button>
        </form>

        {todos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '14px', margin: '20px 0' }}>
            No tasks yet. Enjoy your day! 🎉
          </p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {todos.map(todo => (
              <li 
                key={todo.id} 
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '6px',
                  border: '1px solid #e5e7eb',
                  wordBreak: 'break-word'
                }}
              >
                <span style={{ color: '#374151', fontSize: '15px', paddingRight: '10px' }}>
                  {todo.task}
                </span>
                <button 
                  onClick={() => deleteTodo(todo.id)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: 'transparent',
                    color: '#dc2626',
                    border: '1px solid #fee2e2',
                    borderRadius: '4px',
                    fontSize: '13px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => { e.target.style.backgroundColor = '#fee2e2' }}
                  onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent' }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
