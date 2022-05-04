/* eslint-disable no-undef */
import api from '../config';

const targetUrl = '/api/user';
let Token;

before((complete) => {
  const payload = {
    email: 'heroyuans@gmail.com',
    passowrd: 'password',
  };
  api.post('/api/user/login')
    .set('Accept', 'application/json')
    .send(payload)
    .expect(200)
    .end((error, response) => {
      Token = response.body.token;
      complete();
    });
});

describe('User', () => {
  it(`GET ${targetUrl} without Token`, (complete) => {
    api.get(targetUrl).expect(401, complete);
  });

  it(`GET ${targetUrl} with Token`, (complete) => {
    api.get(targetUrl)
      .set('Authorization', `Bearer ${Token}`)
      .expect(200, complete);
  });

  it(`POST ${targetUrl}`, (complete) => {
    const payload = {
      email: 'test@gmail.com',
      password: 'password',
      gender: 'male',
      nickname: 'test',
    };

    api.post(targetUrl)
      .set('Accept', 'application/json')
      .send(payload)
      .expect(200, complete);
  });
});
