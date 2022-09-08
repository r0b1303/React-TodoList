import { test, Locator, expect, Page } from "@playwright/test";

export class CreateDeleteTodos {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async CreateTodos() {
    await this.page.goto("https://robderbob.netlify.app/");

    await expect(this.page).toHaveTitle("React App");
    //await expect(page).toHaveURL("robderbob");

    await this.page.locator('input[type="text"]').click();

    await this.page.locator('input[type="text"]').fill("Test 123");

    await this.page.locator("button").click();

    await this.page.locator('input[type="text"]').click();

    await this.page.locator('input[type="text"]').fill("Test 456");

    await this.page.locator('input[type="text"]').press("Enter");
  }
  async CheckTodos() {
    //First Create the Todos
    await this.CreateTodos();

    const checkButton = this.page.locator("button").nth(1);
    await expect(checkButton).toHaveAttribute("button", "");
    checkButton.click();
  }
  async DeleteTodos() {
    //First Create the Todos
    await this.CreateTodos();

    await this.page.locator("button").nth(2).click();

    await this.page.locator("button").nth(2).click();
  }
}
