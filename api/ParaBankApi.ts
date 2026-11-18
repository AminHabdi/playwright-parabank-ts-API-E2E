// api/ParaBankApi.ts
import { APIRequestContext, APIResponse } from '@playwright/test';
import { ENDPOINTS } from '@support/constants/endpoints';
import type { RegistrationPayload } from '@support/types/index';

export class ParaBankApi {
    constructor(private readonly request: APIRequestContext) { }

    async registerUser(payload: RegistrationPayload): Promise<APIResponse> {
        await this.request.get(ENDPOINTS.REGISTER);

        return this.request.post(ENDPOINTS.REGISTER, {
            form: payload,
            headers: {
                'Accept': 'text/html,application/xhtml+xml'
            }
        });
    }

    async login(username: string, password: string): Promise<APIResponse> {
        await this.request.get(ENDPOINTS.LOGIN);

        return this.request.post(ENDPOINTS.LOGIN, {
            form: { username, password }
        })
    }

    async cleanDB(): Promise<APIResponse> {
        return this.request.post('/parabank/services/bank/cleanDB');
    }
}