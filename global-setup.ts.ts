// global-setup.ts
import { request } from '@playwright/test';
import config from './playwright.config';

export default async function globalSetup() {
    const baseURL = config.use?.baseURL;
    if (!baseURL) throw new Error('baseURL missing in playwright.config.ts');

    const ctx = await request.newContext({ baseURL, timeout: 10_000 });
    const res = await ctx.post('/parabank/services/bank/cleanDB');

    if (!res.ok()) {
        throw new Error(`cleanDB failed: ${res.status()} ${await res.text()}`);
    }
    await ctx.dispose();
}