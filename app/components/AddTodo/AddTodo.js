import React from 'react';
import { connect } from 'react-redux';

import { addTodo } from 'core/actionCreator';

let nextTodoId = 0;
let AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <input
        type="text"
        ref={node => {
          input = node;
        }}
      />
      <button
        onClick={() => {
          console.log("AddTodo");
          dispatch(addTodo(nextTodoId++, input.value));
          input.value = '';
        }}
      >
        Add
      </button>
    </div>
  );
};
AddTodo = connect()(AddTodo);

export default AddTodo;
