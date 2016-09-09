import { connect } from 'react-redux';
import { toggleTodo } from 'core/actionCreator';

import TodoList from 'components/TodoList/TodoList';

const getVisibilityTodos = (todos, visibilityFilter) => {
  switch (visibilityFilter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.completed);
    default:
      return todos;
  }
};

const mapStateToTodoListProps = (state) => ({
  todos: getVisibilityTodos(state.todos, state.visibilityFilter),
});

const mapDispatchToTodoListProps = dispatch => ({
  onTodoClick: (id) => {
    dispatch(toggleTodo(id));
  },
});

const TodoListContainer = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList);

export default TodoListContainer;
