import React from "react";
import { useTodos } from "../TodoContext";
import Todo from "./Todo";

const TodoList = ({ filteredTodos }) => {
  const { todos, setTodos } = useTodos();

  return (
    <div className="todo-container">
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <Todo
            setTodos={setTodos}
            todos={todos}
            key={todo.id}
            todo={todo}
            text={todo.text}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
