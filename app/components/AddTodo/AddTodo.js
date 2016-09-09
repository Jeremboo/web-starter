import React from 'react';
import { connect } from 'react-redux';

import { addTodo } from 'core/actionCreator';

<<<<<<< HEAD
import './AddTodo.styl';

=======
>>>>>>> 1444445952e6a750646726f200948deb7963fc56
let nextTodoId = 0;
let AddTodo = ({ dispatch }) => {
  let input;

  return (
<<<<<<< HEAD
    <div className="AddTodo">
      <input
        className="AddTodo-input"
=======
    <div>
      <input
>>>>>>> 1444445952e6a750646726f200948deb7963fc56
        type="text"
        ref={node => {
          input = node;
        }}
      />
      <button
<<<<<<< HEAD
        className="AddTodo-button"
=======
>>>>>>> 1444445952e6a750646726f200948deb7963fc56
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
