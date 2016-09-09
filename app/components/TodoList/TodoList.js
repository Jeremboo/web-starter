import React, { PropTypes } from 'react';

import Todo from './Todo';

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        todo={todo}
        onTodoClick={onTodoClick}
      />
    )}
  </ul>
);
TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  onTodoClick: PropTypes.func.isRequired,
};

export default TodoList;
