/* eslint-disable no-undef */
import supertest from 'supertest';
import { v4 as uuidv4 } from 'uuid';

const api = supertest('http://localhost:3000/api');

const randomId = uuidv4();

describe('Image', () => {
  it(`Test GET /image/${randomId}`, (complete) => {
    api.get(`/image/${randomId}`).expect(200, complete);
  });
});
