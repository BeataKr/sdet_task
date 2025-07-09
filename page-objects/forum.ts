
import { BrowserContext, Page } from "@playwright/test";

export class Forum {
    page: Page;
    context: BrowserContext;
    forumUrl: string;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.forumUrl = 'https://forums.veeam.com/';
    }

    private registerLink = '//a//span[contains(text(),"Register")]'
    private agreeTermsButton = '#agreed'

    async register() {
        await this.page.click(this.registerLink);
    }

    async approveForumTerms() {
        await this.page.waitForSelector(this.agreeTermsButton, { state: 'visible' });
        await this.page.click(this.agreeTermsButton);
    }
}

