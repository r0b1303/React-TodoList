import React, { useState } from "react";
import { GetTodos, SaveTodos } from "./Storage";

const TodoContext = React.createContext();

export const useTodos = () => {
    const context = React.useContext(TodoContext);
    if(!context) {
        throw new Error("useTodos hook can only be used beneath TodoProvider")
    }

    return context;
}


export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(GetTodos() || []);

  const onSetTodos = (todos) => {
    setTodos(todos);
    SaveTodos(todos);
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos: onSetTodos,
      }}
    >
        {children}
    </TodoContext.Provider>
  );
};
