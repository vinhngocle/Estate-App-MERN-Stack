import React from "react";

function TodoCard(props) {
  const { children, handleDeleteTodo, handleUpdateTodo, index } = props;

  return (
    <li className="todoItem w-50 d-flex flex-row justify-content-between">
      <span>{children}</span>
      <div className="actionsContainer">
        <button
          onClick={() => {
            handleUpdateTodo(index);
          }}
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button
          onClick={() => {
            handleDeleteTodo(index);
          }}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </li>
  );
}

export default TodoCard;
