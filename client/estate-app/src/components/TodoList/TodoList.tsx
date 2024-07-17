import TodoCard from "./TodoCard";

interface TodoListProps {
  todos: string[];
  handleDeleteTodo: (index: number) => void;
  handleUpdateTodo: (index: number) => void;
}

function TodoList({
  todos,
  handleDeleteTodo,
  handleUpdateTodo,
}: TodoListProps) {
  return (
    <ul className="main">
      {todos.map((todo, idx) => {
        return (
          <TodoCard
            key={idx}
            index={idx}
            handleDeleteTodo={handleDeleteTodo}
            handleUpdateTodo={handleUpdateTodo}
          >
            <p>{todo}</p>
          </TodoCard>
        );
      })}
    </ul>
  );
}

export default TodoList;
