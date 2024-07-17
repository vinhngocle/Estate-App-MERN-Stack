import React, { ReactElement } from "react";

interface TodoCardProps {
  children: ReactElement;
  handleDeleteTodo: (index: number) => void;
  handleUpdateTodo: (index: number) => void;
  index: number;
}

function TodoCard({
  children,
  handleDeleteTodo,
  handleUpdateTodo,
  index,
}: TodoCardProps) {
  return (
    <li className="todoItem text-center d-flex justify-content-between w-50">
      <span>{children}</span>
      <div className="actionsContainer">
        <button
          className="mx-2"
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
