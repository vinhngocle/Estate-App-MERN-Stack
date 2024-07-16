import React, { useState } from "react";

function TodoInput(props) {
  const { handleAddTodos, todoValue, setTodoValue } = props;
  // const [todoValue, setTodoValue] = useState("");

  return (
    <header>
      <div className="row">
        <div className="col-6">
          <input
            className="form-control"
            type="text"
            placeholder="Enter todo ..."
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
          />
        </div>
        <div className="col-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              handleAddTodos(todoValue);
              setTodoValue("");
            }}
          >
            Add
          </button>
        </div>
      </div>
    </header>
  );
}

export default TodoInput;
