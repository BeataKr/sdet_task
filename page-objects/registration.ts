
import { BrowserContext, Page } from "@playwright/test";

export class Registration {
    page: Page;
    context: BrowserContext;
    baseUrl: string;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
    }

    private nameInput = '#username';
    private passwordInput = '#new_password';
    private confirmPasswordInput = '#password_confirm';
    private emailInput = '#email';
    private fullName = '#pf_fullname';
    private submitForm = '#submit';

    /** There are no required fields marked with * - from here each field is optional */
    async fillAndSubmitRegistrationForm(name?: string, password?: string, email?: string, fullName?: string) {
        console.log(`You are registering as ${name} user.`);

        if (name) await this.page.fill(this.nameInput, name);
        if (password) {
            await this.page.fill(this.passwordInput, password);
            await this.page.fill(this.confirmPasswordInput, password);
        }
        if (email) await this.page.fill(this.emailInput, email);
        if (fullName) await this.page.fill(this.fullName, fullName);
    }

    /** Submit registration form as a separate function, due to lack of required fields to fill */
    async submitRegistrationForm() {
        await this.page.click(this.submitForm);
        await this.page.waitForLoadState('domcontentloaded');
    }

}

