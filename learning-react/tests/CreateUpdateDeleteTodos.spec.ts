import { test, expect, Page } from "@playwright/test";
import { TodoForm } from "./TodoForm.Fixture";
import { TodoList } from "./TodoList.Fixture";

/*

Add:
  Localstorage check needs to be added;

Bugs:
  Having 2 todos with the same name;

*/
test.describe.configure({ mode: "serial" });

let page: Page;

test.describe("Create / Update / Delete Todos", () => {
  const PLACEHOLDER = "placeholder";
  const todoName = "Thats a test 123";
  let todoForm;
  let todoList;
  const todos = 2;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });
  test.afterAll(async () => {
    await page.close();
  });

  test("should create a todo", async () => {
    todoForm = new TodoForm(page);

    await page.goto("https://robderbob.netlify.app/");
    await expect(page).toHaveTitle("React App");

    // create items
    await todoForm.fill(PLACEHOLDER);
    await todoForm.submit();
    await todoForm.fill(todoName);
    await todoForm.submit();
    // find the item
    const list = page.locator(`li`);
    await expect(list).toHaveCount(todos);

    // check if new item is last in the list
    const text = await list.allTextContents();
    let length = text.length;
    await expect(text[length - 1]).toMatch(todoName);

    // check if todo is visible
    await expect(page.locator("text=" + todoName)).toBeVisible();

    // check localstorage
    //page.reload({ waitUntil: "load" });
    //await expect(page.locator("text=" + todoName)).toBeVisible();
  });

  test("should mark a todo as completed", async () => {
    todoList = new TodoList(page);

    // find the Item
    const todo = await todoList.findItem(todoName);

    // check as completed
    await todoList.checkTodo(todoName);
    await expect(todo).toHaveClass(/completed/);
  });

  test("should mark a complete todo as uncompleted", async () => {
    todoList = new TodoList(page);

    // find the item
    const todo = await todoList.findItem(todoName);

    // uncheck item
    await todoList.checkTodo(todoName);
    await expect(todo).not.toHaveClass(/completed/);
  });

  test("should delete a todo", async () => {
    todoList = new TodoList(page);

    // find the item
    const list = await page.locator(".todo-item");

    // check if all items are there
    await expect(list).toHaveCount(todos);

    // delete all items
    await todoList.deleteTodo(todoName);
    await todoList.deleteTodo(PLACEHOLDER);

    // check if all items are deleted
    await expect(list).toHaveCount(0);

    // assert the item is not in localStorage
    //page.reload({ waitUntil: "load" });
    //await expect(page.locator(".todo-item")).toHaveCount(0);
  });
});
