import { BrowserContext, Page } from "@playwright/test";

export class PortalMainPage {
    page: Page;
    context: BrowserContext;
    baseUrl: string;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.baseUrl = 'https://www.veeam.com';
    }

    async loadVeeamMainPage() {
        await this.page.goto(this.baseUrl, {
            waitUntil: 'domcontentloaded', 
        });
    }

    /** Open link from main menu
     * @param subpageName - name of main menu option e.g. Support, Products, Solutions etc.
     * @param linkName - name of the link from subpage, e.g. R&D Forums, Knowledge Base etc.
     * Each subpage has two levels of options: 
     * 1. subpage title from main menu = subpageName 
     * 2. link from particular subpage = linkName
     */
    async openLink(subpageName: string, linkName: string) {
        const menuOpion = `//nav[@class="main-navigation"]//button[contains(text(),"${subpageName}")]`
        await this.page.click(menuOpion);
        const link = `//a[contains(text(),"${linkName}")]`
        await this.page.click(link);
        switch (linkName) {
            case 'R&D Forums':
                await this.page.waitForURL("https://forums.veeam.com/?ad=menu-support"); 
                // or e.g.
                // await this.page.route('https://forums.veeam.com/?ad=menu-support', async route => {
                //     await route.continue();
                // });
                break;
        }
    }
}

