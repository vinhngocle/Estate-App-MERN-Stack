import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([
    "Go to the gym",
    "Eat more fruits and vegetable",
    "Pick up the kis from school",
  ]);
  const [todoValue, setTodoValue] = useState("");

  const handleAddTodos = (newTodo: string) => {
    const newTodoList = [...todos, newTodo];
    console.log(newTodo);
    setTodos(newTodoList);
  };

  const handleDeleteTodo = (index: number) => {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index;
    });
    setTodos(newTodoList);
  };

  const handleUpdateTodo = (index: number) => {
    const valueToBeEdited = todos[index];
    setTodoValue(valueToBeEdited);
    handleDeleteTodo(index);
  };

  return (
    <main>
      <TodoInput
        todoValue={todoValue}
        setTodoValue={setTodoValue}
        handleAddTodos={handleAddTodos}
      />
      <TodoList
        todos={todos}
        handleDeleteTodo={handleDeleteTodo}
        handleUpdateTodo={handleUpdateTodo}
      />
    </main>
  );
}

export default App;
