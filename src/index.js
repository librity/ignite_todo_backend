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

app.put('/todos/:id', checkIfUserExists, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checkIfUserExists, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checkIfUserExists, (request, response) => {
  // Complete aqui
});

module.exports = app;
