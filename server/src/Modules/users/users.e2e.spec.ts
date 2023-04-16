import request from 'supertest';
import Server from "../../server";

describe('users', () => {
    beforeAll(() => {
        return Server.init();
    });

    it('POST /api/users/list', async () => {
        
    });

    afterAll(() => {
        return Server.close();
    });
});
