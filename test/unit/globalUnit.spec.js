/* eslint-disable no-undef */
import { expect } from 'chai';
import GlobalService from '../../src/services/global';

describe('Test Global Service', () => {
  it('Test Random String', () => {
    const expects = GlobalService.yieldRandomString();
    expect(typeof expects).to.be.equal('string');
  });

  it('Test Update Item', () => {
    const prev = [1, 2, 3];
    const next = [2, 3, 4];
    const expects = GlobalService.yieldUpdateItems(prev, next);
    const assert = {
      insertItem: [4],
      destroyItem: [1],
    };
    expect(expects).to.eql(assert);
  });

  it('Test Pagination Calculate', () => {
    const expects = GlobalService.calculatePagination(10, 2);
    const assert = {
      limit: 10,
      offset: 10,
    };
    expect(expects).to.eql(assert);
  });

  it('Test Token Expire', () => {
    const token = {};
    token.expireTime = new Date().getTime() - 1;
    const expects = GlobalService.calculateTokenTime(token);
    const assert = false;
    expect(expects).to.be.equal(assert);
  });
});
