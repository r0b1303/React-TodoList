import "./App.css";
import React, { useState, useEffect } from "react";

import Form from "./components/Form";
import TodoList from "./components/TodoList";
import { useTodos } from "./TodoContext";

function App() {
  const [inputText, setInputText] = useState("");
  const { todos, setTodos } = useTodos();
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  const filterHandler = React.useCallback(() => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }, [status, todos]);

  const onSetTodos = (todos) => {
    setTodos(todos);
  };

  useEffect(() => {
    filterHandler();
  }, [todos, status, filterHandler]);

  return (
    <div className="App">
      <header>
        <h1>Todo List</h1>
      </header>
      <Form
        setStatus={setStatus}
        inputText={inputText}
        todos={todos}
        setTodos={onSetTodos}
        setInputText={setInputText}
      />
      <TodoList filteredTodos={filteredTodos} />
    </div>
  );
}

export default App;
