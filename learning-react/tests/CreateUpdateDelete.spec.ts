import { test, expect } from "@playwright/test";
import { TodoForm } from "./TodoForm.Fixture";
import { TodoList } from "./TodoList.Fixture";

test.describe.configure({ mode: "serial" });
test.describe("Create / Update / Delete Todos", () => {
  const todoName = "Thats a Test 123";
  let todoForm;
  let todoList;

  test.beforeEach(async ({ page }) => {
    await page.goto("https://robderbob.netlify.app/");
    await expect(page).toHaveTitle("React App");
  });

  test("should create a todo", async ({ page }) => {
    todoForm = new TodoForm(page);
    todoList = new TodoList(page);

    // create Item
    await todoForm.fill(todoName);
    await todoForm.submit();

    // assert that the item is in the list

    // assert that the item is in localStorage
    // refresh the page
    // assert that the item is still there
  });

  test("should mark a todo as completed", async ({ page }) => {
    // find the todoItem created in the last test
    // check as completed
  });

  test("should mark a complete todo as uncompleted", async ({ page }) => {
    // find item in the last test
    // check the item and then uncheck it
    // assert that the item is uncompleted now
    // assert that localstorage is correct
  });

  test("should delete a todo", async ({ page }) => {
    // assert the item is not in the list
    // assert the item is not in localStorage
    // refresh the page
    // item should still not be there
  });
});
