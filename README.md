# Rocket Seat Ignite - To do Backend

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Endpoints](#endpoints)
- [Resources](#resources)

## About <a name = "about"></a>

A to-do list backend made with NodeJS, Express and Jest.

## Getting Started <a name = "getting_started"></a>

### Prerequisites

- `node >= 12.0.0`
- `yarn >= 1.22.0`

### Installing

1. Clone this repo locally and install node packages:

```bash
$ git clone https://github.com/librity/ignite_todo_list.git
$ cd ignite_todo_list
$ yarn install
```

2. Start a dev server:

```bash
$ yarn dev
```

3. Import the Insomnia workspace from `./insomnia/workspace.json`.

### Testing

Run tests with jest:

```bash
$ yarn test
```

## Endpoints <a name = "endpoints"></a>

`Users`

- `POST` http://localhost:3333/users

`Todos`

- `GET` http://localhost:3333/todos
- `POST` http://localhost:3333/todos
- `PUT` http://localhost:3333/todos/:id
- `PATCH` http://localhost:3333/todos/:id/done
- `DELETE` http://localhost:3333/todos/:id

## Resources <a name = "resources"></a>

- https://rapidapi.com/blog/put-vs-patch/
- https://github.com/uuidjs/uuid#quickstart