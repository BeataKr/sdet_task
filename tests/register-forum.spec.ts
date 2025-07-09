// import { test, expect } from '@playwright/test'; // included in ../helpers/global
import { test, expect } from '../helpers/global';
import { PortalMainPage, Registration, Forum } from '../page-objects';

let portal: PortalMainPage, forum: Forum, registration: Registration; 

test.describe('Veeam Task Flow', () => {
  test.beforeEach(async ({ page,context }) => {
    portal = new PortalMainPage(page, context);
    forum = new Forum(page, context);
    registration = new Registration(page, context);

    await portal.loadVeeamMainPage();
  });

  test('should navigate to R&D Forum and register a new user with public mail to get an error', async ({ page, testData }) => {
    await portal.openLink('Support', 'R&D Forums');
    await forum.register();
    await forum.approveForumTerms();
    /** There are couple of possibilities to provide env variables 
     * 1. recall .env vars directly in the test (not fancy at all)
     * 2. use playwright.config.ts file (but don't want to mix test vars with config ones)
     * 3. setup helper file that will read test variables (and any other possible constants - ../helers/global.ts)
    */
    await registration.fillAndSubmitRegistrationForm(
      testData.registrationUserName,
      testData.registrationUserPassword,
      testData.registrationUserEmail,
      testData.registrationUserName 
    );
    await registration.submitRegistrationForm();

    await expect(page.locator('[class=error]')).toContainText('Public email are not allowed.');
  });
  
});
