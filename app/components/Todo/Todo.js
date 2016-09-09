import React, { PropTypes } from 'react';

import './Todo.styl';

const Todo = ({ todo, onTodoClick }) => (
  <li
    className={`Todo ${todo.completed ? 'Todo_completed' : ''}`}
    data-text={todo.text}
    onClick={() => onTodoClick(todo.id)}
  >
    {todo.text}
  </li>
);
Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  onTodoClick: PropTypes.func.isRequired,
};

export default Todo;
