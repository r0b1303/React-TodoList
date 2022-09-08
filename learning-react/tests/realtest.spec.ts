import { test, expect } from "@playwright/test";
import { CreateDeleteTodos } from "./CreateDeleteTodos.spec";

test.describe("Create and delete Todos", () => {
  test("Create/Check/Delete Todos", async ({ page }) => {
    const createDeleteTodos = new CreateDeleteTodos(page);
    await createDeleteTodos.CreateTodos();
    //await createDeleteTodos.CheckTodos();
    await createDeleteTodos.DeleteTodos();
  });
  test("Do sth Different w/ Todos", async ({ page }) => {});
});
