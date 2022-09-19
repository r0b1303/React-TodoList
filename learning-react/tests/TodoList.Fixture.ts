import { test, Locator, expect, Page } from "@playwright/test";

export class TodoList {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async findItem(todoName: string) {
    // Have to check if this works
    return this.page.locator(`text=${todoName}`);
    //await this.page.locator(`text=${todoName}`);
  }

  public async checkTodo(todoName: string) {
    // Have to check which todo i want to check
    await this.page.locator(`text=${todoName} >> .complete-btn`).click();
  }

  public async deleteTodo(todoName: string) {
    //Delete the first item in the row
    await this.page.locator(`text=${todoName} >> .trash-btn`).first().click();

    //await this.page.locator(".trash-btn").first().click();
  }
}
