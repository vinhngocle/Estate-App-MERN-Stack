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
      <div className="p-10">
        <div className="">
          <input
            className="py-1 px-2 border border-slate-300 rounded-md shodow-md placeholder-slate-400 focus:outline-none w-[500px] mr-3"
            type="text"
            placeholder="Enter todo ..."
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
          />
          <button
            type="button"
            className="bg-sky-500 hover:bg-sky-700 px-5 py-1 rounded-md hover:text-white"
            onClick={handleAddTodo}
          >
            <p>Add</p>
          </button>
        </div>
      </div>
    </header>
  );
}

export default TodoInput;
