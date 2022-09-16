import React from "react";
import { useTodos } from "../TodoContext";

const Todo = ({ text, todo }) => {
  const { todos, setTodos } = useTodos();

  const deleteHandler = () => {
    setTodos(todos.filter((item) => item.id !== todo.id));
  };
  const completeHandler = () => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );
  };
  return (
    <div className="todo">
      <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
        {text}
        <button onClick={completeHandler} className="complete-btn">
          <i className="fas fa-check"></i>
        </button>
        <button onClick={deleteHandler} className="trash-btn">
          <i className="fas fa-trash"></i>
        </button>
      </li>
    </div>
  );
};

export default Todo;
