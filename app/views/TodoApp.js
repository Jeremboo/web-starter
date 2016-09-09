import React from 'react';

import AddTodo from 'components/AddTodo/AddTodo';
import TodoListContainer from 'containers/TodoListContainer';
import FilterContainer from 'containers/FilterContainer';

const TodoApp = () => (
  <section>
    <AddTodo />
    <TodoListContainer />
    <FilterContainer />
  </section>
);

export default TodoApp;
