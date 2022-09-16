import { test, expect, chromium } from "@playwright/test";
import { TodoForm } from "./TodoForm.Fixture";
import { TodoList } from "./TodoList.Fixture";

test.describe("Create / Update / Delete Todos", () => {
  test.describe.configure({ mode: "serial" });
  const PLACEHOLDER = "placeholder";
  const todoName = "Thats a test 123";
  let todoForm;
  let todoList;
  const todos = 3;

  test.beforeEach(async ({ page }) => {
    await page.goto("https://robderbob.netlify.app/");
    await expect(page).toHaveTitle("React App");
  });

  test("should create a todo", async ({ page }) => {
    todoForm = new TodoForm(page);

    await todoForm.fill(PLACEHOLDER);
    await todoForm.submit();
    await todoForm.fill(PLACEHOLDER);
    await todoForm.submit();
    await todoForm.fill(todoName);
    await todoForm.submit();

    // assert that the item is in the list
    const list = page.locator(`li`);
    await expect(list).toHaveCount(todos);

    //Check if new item is last in the list
    const text = await list.allTextContents();
    let length = text.length;
    await expect(text[length - 1]).toMatch(todoName);

    // Check localstorage
    await expect(page.locator("text=" + todoName)).toBeVisible();
    page.reload();
    await expect(page.locator("text=" + todoName)).toBeVisible();
  });

  test("should mark a todo as completed", async ({ page }) => {
    todoList = new TodoList(page);

    // find the todoitem created in the last test
    const todo = todoList.findItem(todoName);
    // check as completed
    await todoList.checkTodo(todoName);
    await expect(todo).toHaveClass("todo-item completed");
  });

  test("should mark a complete todo as uncompleted", async ({ page }) => {
    todoList = new TodoList(page);

    // find item in the last test
    const todo = todoList.findItem(todoName);

    // uncheck the item
    await todoList.checkTodo(todoName);
    // assert that the item is uncompleted now
    //await expect(todo).not.toHaveClass(/completed/);
    await expect(todo).toHaveClass("todo-item completed");
  });

  test("should delete a todo", async ({ page }) => {
    todoList = new TodoList(page);

    // assert the item is not in the list
    await expect(page.locator(".todo-item")).toHaveCount(todos);
    todoList.deleteTodo(todoName);
    await expect(page.locator(".todo-item")).toHaveCount(0);

    // assert the item is not in localStorage
    page.reload();
    await expect(page.locator(".todo-item")).toHaveCount(0);
  });
});
