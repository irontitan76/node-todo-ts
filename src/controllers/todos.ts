import { RequestHandler } from 'express';
import { Todo } from '../models/todo';

const TODOS: Todo[] = [];

export const deleteTodo: RequestHandler = (req, res, _) => {
  const { id } = req.params;
  const todoIndex = TODOS.findIndex((todo) => todo.id === id);

  if (todoIndex < 0) {
    throw new Error('todo not found');
  }

  TODOS.splice(todoIndex, 1);
  res.json({ message: 'deleted todo' });
};

export const getTodos: RequestHandler = (_, res, __) => {
  res.status(200).json({ todos: TODOS });
};

export const patchTodo: RequestHandler<{ id: string }> = (req, res, _) => {
  const { id } = req.params;
  const { text } = req.body as { text: string };

  const todoIndex = TODOS.findIndex((todo) => todo.id === id);

  if (todoIndex < 0) {
    throw new Error('todo not found');
  }

  const oldTodo = TODOS[todoIndex];
  TODOS[todoIndex] = new Todo(oldTodo.id, text);

  res.json({ message: 'updated todo', todo: TODOS[todoIndex] });
};

export const postTodo: RequestHandler = (req, res, _) => {
  const { text } = req.body as { text: string };
  const id = Math.round((Math.random() * 1000));
  const newTodo: Todo = new Todo(id.toString(), text);

  TODOS.push(newTodo);

  res.status(201).json({ message: 'created todo', createdTodo: newTodo });
};
