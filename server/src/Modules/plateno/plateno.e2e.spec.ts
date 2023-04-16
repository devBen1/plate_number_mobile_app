import request from 'supertest';
import Server from "../../server";

describe('plate', () => {
    beforeAll(() => {
        return Server.init();
    });

    it('POST /api/plate/list', async () => {

    });

    afterAll(() => {
        return Server.close();
    });
});
