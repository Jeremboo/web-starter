import React from 'react';
import { connect } from 'react-redux';

import { addTodo } from 'core/actionCreator';

import './AddTodo.styl';

let nextTodoId = 0;
let AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div className="AddTodo">
      <input
        className="AddTodo-input"
        type="text"
        ref={node => {
          input = node;
        }}
      />
      <button
        className="AddTodo-button"
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
