const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checkIfUserExists(request, response, next) {
  const { username } = request.headers;

  const userExists = users.find((user) => user.username === username);
  if (!userExists)
    return response.status(404).json({ error: 'User not found.' });

  response.locals.currentUser = userExists;
  next();
}

function checkIfTodoExists(request, response, next) {
  const { id } = request.params;
  const { currentUser: user } = response.locals;

  const todos = user.todos;
  const targetTodoIndex = todos.findIndex((todo) => todo.id === id);

  if (targetTodoIndex === -1)
    return response.status(404).json({ error: 'To do not found.' });

  response.locals.targetTodoIndex = targetTodoIndex;
  next();
}

app.post('/users', (request, response) => {
  const { name, username } = request.body;

  const usernameIsTaken = users.find((user) => user.username === username);
  if (usernameIsTaken)
    return response.status(400).json({ error: 'Username taken.' });

  const newUser = {
    id: uuidv4(),
    name,
    username,
    todos: [],
  };

  users.push(newUser);

  return response.status(201).json(newUser);
});

app.get('/todos', checkIfUserExists, (request, response) => {
  const { currentUser: user } = response.locals;

  return response.json(user.todos);
});

app.post('/todos', checkIfUserExists, (request, response) => {
  const { currentUser: user } = response.locals;
  const { title, deadline } = request.body;

  const newTodo = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date(),
  };

  user.todos.push(newTodo);

  return response.status(201).json(newTodo);
});

app.put(
  '/todos/:id',
  checkIfUserExists,
  checkIfTodoExists,
  (request, response) => {
    const { title, deadline } = request.body;
    const { currentUser: user, targetTodoIndex } = response.locals;

    const todos = user.todos;

    const targetTodo = todos[targetTodoIndex];
    const updatedTodo = {
      ...targetTodo,
      title,
      deadline,
    };

    todos[targetTodoIndex] = updatedTodo;

    return response.status(201).json(updatedTodo);
  },
);

app.patch(
  '/todos/:id/done',
  checkIfUserExists,
  checkIfTodoExists,
  (request, response) => {
    const { currentUser: user, targetTodoIndex } = response.locals;

    const todos = user.todos;

    const targetTodo = todos[targetTodoIndex];
    targetTodo.done = true;

    return response.status(200).json(targetTodo);
  },
);

app.delete(
  '/todos/:id',
  checkIfUserExists,
  checkIfTodoExists,
  (request, response) => {
    const { currentUser: user, targetTodoIndex } = response.locals;

    const todos = user.todos;

    todos.splice(targetTodoIndex, 1);

    return response.status(204).json({});
  },
);

module.exports = app;
