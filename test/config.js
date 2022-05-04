import 'dotenv/config';
import supertest from 'supertest';

const api = `${process.env.APP_PROTOCOL}://${process.env.APP_HOST}${process.env.APP_PORT ? `:${process.env.APP_PORT}` : ''}/api`;

export default supertest(api);
