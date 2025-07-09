import { test as base } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export type TestData = {
    testData: any;
}

export const test = base.extend<TestData>({
    testData: {
        registrationUserName: process.env.USER_LOGIN || 'TestUser',
        registrationUserPassword: process.env.USER_PASSWORD || 'TestPassword',
        registrationUserEmail: process.env.USER_MAIL || 'test@example.com'
    }
});

export { expect } from '@playwright/test';

