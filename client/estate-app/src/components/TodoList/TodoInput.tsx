import React from "react";

interface TodoInputProps {
  handleAddTodos: (todo: string) => void;
  todoValue: string;
  setTodoValue: React.Dispatch<React.SetStateAction<string>>;
}

function TodoInput({
  handleAddTodos,
  todoValue,
  setTodoValue,
}: TodoInputProps) {
  const handleAddTodo = () => {
    handleAddTodos(todoValue);
    setTodoValue("");
  };

  return (
    <header>
      <div className="row d-flex p-4 justify-content-start">
        <div className="col-7 d-flex justify-content-center">
          <input
            className="form-control"
            type="text"
            placeholder="Enter todo ..."
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-primary mx-4"
            onClick={handleAddTodo}
          >
            Add
          </button>
        </div>
      </div>
    </header>
  );
}

export default TodoInput;
