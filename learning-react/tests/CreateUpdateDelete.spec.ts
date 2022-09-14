import { test, expect, chromium } from "@playwright/test";
import { TodoForm } from "./TodoForm.Fixture";
import { TodoList } from "./TodoList.Fixture";

test.describe.configure({ mode: "serial" });
test.describe("Create / Update / Delete Todos", () => {
  const PLACEHOLDER = "placeholder";
  const todoName = "Thats a test 123";
  let todoForm;
  let todoList;
  const todos = 3;

  test.beforeEach(async ({ page }) => {
    todoForm = new TodoForm(page);
    todoList = new TodoList(page);

    await page.goto("https://robderbob.netlify.app/");
    await expect(page).toHaveTitle("React App");

    await todoForm.fill(PLACEHOLDER);
    await todoForm.submit();
    await todoForm.fill(PLACEHOLDER);
    await todoForm.submit();
    await todoForm.fill(todoName);
    await todoForm.submit();
  });

  test("should create a todo", async ({ page }) => {
    // assert that the item is in the list
    const list = page.locator(`li`);
    await expect(list).toHaveCount(todos);

    //Checken ob das letzte Item auf todoName hat!
    const text = await list.allTextContents();
    let length = text.length;
    await expect(text[length - 1]).toMatch(todoName);

    // assert that the item is in localStorage

    // refresh the page and check again
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const pageTest = await context.newPage();
    // assert that the item is still there
    await pageTest.goto("https://robderbob.netlify.app/");
    await expect(list).toHaveCount(todos);
    pageTest.close();
  });

  test("should mark a todo as completed", async ({ page }) => {
    // find the todoItem created in the last test
    const todo = page.locator(`li >> text=${todoName}`);
    // check as completed
    await todoList.checkTodo(todoName);

    await expect(todo).toHaveClass("todo-item completed");
  });

  test("should mark a complete todo as uncompleted", async ({ page }) => {
    // find item in the last test
    const todo = page.locator(`li >> text=${todoName}`);
    // check the item and then uncheck it
    await todoList.checkTodo(todoName);
    await expect(todo).toHaveClass("todo-item completed");
    // assert that the item is uncompleted now
    await todoList.checkTodo(todoName);
    await expect(todo).toHaveClass("todo-item ");
  });

  test("should delete a todo", async ({ page }) => {
    // assert the item is not in the list

    await expect(page.locator(".todo-item")).toHaveCount(todos);
    todoList.deleteTodo(todoName);
    await expect(page.locator(".todo-item")).toHaveCount(0);
    // assert the item is not in localStorage

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const pageTest = await context.newPage();
    // assert that the item is still there
    await pageTest.goto("https://robderbob.netlify.app/");
    await expect(page.locator(".todo-item")).toHaveCount(0);
    pageTest.close();
  });
});
