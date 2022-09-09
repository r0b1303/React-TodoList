import { test, Locator, expect, Page } from "@playwright/test";

export class TodoList {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async findItem(todoName: string) {
    //Have to check if this works
    await this.page.locator(`.todo-item:has-text[${todoName}]`);
  }

  public async checkTodo(todoName: string) {
    //Have to check which todo i want to check
    const todo = this.page.locator(`.complete-btn`).click();
  }

  public async deleteTodo(todoName: string) {}
}
