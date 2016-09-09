import React, { PropTypes } from 'react';

const Todo = ({ todo, onTodoClick }) => (
  <li
    style={{
      textDecoration: todo.completed ?
      'line-through' :
      'none',
    }}
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
