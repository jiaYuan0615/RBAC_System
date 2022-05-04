/* eslint-disable no-undef */
import { v4 as uuidv4 } from 'uuid';
import api from '../config';

const randomId = uuidv4();

describe('Image', () => {
  it(`Test GET /image/${randomId}`, (complete) => {
    api.get(`/image/${randomId}`).expect(200, complete);
  });
});
