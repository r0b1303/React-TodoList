import { test, Locator, expect, Page } from "@playwright/test";

export class TodoForm {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  public async fill(todoName: string) {
    await this.page.locator('input[type="text"]').fill(todoName);
  }

  public async submit() {
    await this.page.locator('input[type="text"]').press("Enter");
  }
}
