const LOCALSTORAGE_KEY = "todos";

export const SaveTodos = (todos) => {
  if (todos.length > 0) {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(todos));
  } else {
    localStorage.setItem(LOCALSTORAGE_KEY, null);
  }
};

//Funktioniert plötzlich wieder
export const GetTodos = () => {
  const todos = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  return todos;
};
