import React from 'react';

import Title from 'components/Title/Title';
import AddTodo from 'components/AddTodo/AddTodo';
import TodoListContainer from 'containers/TodoListContainer';
import FilterContainer from 'containers/FilterContainer';

const TodoApp = () => (
  <section>
    <Title text="Todo App" />
    <AddTodo />
    <TodoListContainer />
    <FilterContainer />
  </section>
);

export default TodoApp;
