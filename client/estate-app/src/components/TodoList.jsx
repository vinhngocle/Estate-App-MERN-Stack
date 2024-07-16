import React from "react";
import TodoCard from "./TodoCard";

function TodoList(props) {
  const { todos } = props;

  return (
    <ul className="main mt-2">
      {todos.map((todo, idx) => {
        return (
          <TodoCard {...props} key={idx} index={idx}>
            <p>{todo}</p>
          </TodoCard>
        );
      })}
    </ul>
  );
}

export default TodoList;
