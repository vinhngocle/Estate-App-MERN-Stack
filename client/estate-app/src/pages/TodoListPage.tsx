import { useEffect, useState } from "react";
import TodoInput from "../components/TodoInput.tsx";
import TodoList from "../components/TodoList.tsx";

function TodoListPage() {
  const [todos, setTodos] = useState<string[]>([]);
  const [todoValue, setTodoValue] = useState("");

  const persistData = (newList: string | string[]) => {
    localStorage.setItem("todos", JSON.stringify({ todo: newList }));
  };

  const handleAddTodos = (newTodo: string) => {
    const newTodoList = [...todos, newTodo];
    persistData(newTodo);
    setTodos(newTodoList);
  };

  const handleDeleteTodo = (index: number) => {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index;
    });
    persistData(newTodoList);
    setTodos(newTodoList);
  };

  const handleUpdateTodo = (index: number) => {
    const valueToBeEdited = todos[index];
    setTodoValue(valueToBeEdited);
    handleDeleteTodo(index);
  };

  useEffect(() => {
    if (!localStorage) return;

    const localTodos = localStorage.getItem("todos");
    if (localTodos) {
      const parsed = JSON.parse(localTodos);
      setTodos([parsed.todos]);
    }
  }, []);

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

export default TodoListPage;
