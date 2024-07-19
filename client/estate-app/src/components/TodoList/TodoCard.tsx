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
    <ul>
      <li className="w-[600px] flex justify-between pl-12 py-2">
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
    </ul>
  );
}

export default TodoCard;
