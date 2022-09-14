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
    //const list = this.page.locator(`li`).filter({ hasText: todoName });

    //Have to Edit it!
    await this.page.locator(`div:nth-child(3) > .complete-btn`).click();
  }

  public async deleteTodo(todoName: string) {
    //Delete the first item in the row
    await this.page.locator(`div:nth-child(3) > .trash-btn`).click();
    await this.page.locator(`div:nth-child(2) > .trash-btn`).click();
    await this.page.locator(`div:nth-child(1) > .trash-btn`).click();
    //await this.page.locator(".trash-btn").first().click();
  }
}
