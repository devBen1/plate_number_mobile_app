import request from 'supertest';
import Server from "../../server";

describe('auth', () => {
    beforeAll(() => {
        return Server.init();
    });

    it('POST /api/auth/login', async () => {
        const response = await request(Server.getApp().app)
            .post(`/api/auth/login`)
            .expect(200);
        
    });

    it('PUT /api/auth/update/user', async () => {
        const response = await request(Server.getApp().app)
            .put(`/api/auth/update/user`)
            .expect(200);
    });

    afterAll(() => {
        return Server.close();
    });
});
