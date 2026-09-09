const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await pool.query('SELECT * FROM todos ORDER BY id ASC');
    res.json(todos.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add a todo
app.post('/todos', async (req, res) => {
  try {
    const { task } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todos (task) VALUES ($1) RETURNING *',
      [task]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM todos WHERE id = $1', [id]);
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
