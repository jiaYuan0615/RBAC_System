/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import randomstring from 'randomstring';
import fs from 'fs';
import moment from 'moment';
import path from 'path';
import _ from 'lodash';

class GlobalService {
  /** 計算 Token 到期時間
   *
   * @param {object} token
   * @returns {boolean}
   */
  calculateTokenTime = (token) => {
    const { expireTime } = token;
    const currentTime = new Date().getTime();
    if (currentTime > expireTime) return false;
    return true;
  };

  /** 計算分頁資訊
   *
   * @param {number} limit
   * @param {number} page
   * @returns {object}
   */
  calculatePagination = (limit = 10, page = 1) => {
    const offset = (page - 1) * limit;
    const pagination = {
      limit: _.toNumber(limit),
      offset,
    };
    return pagination;
  };

  /** 產生亂數字串
   *
   * @param {number} length
   * @param {string} charset
   * @returns {string}
   */
  yieldRandomString = (length = 11, charset = 'alphanumeric') => {
    const random = randomstring.generate({
      length,
      charset,
    });
    return random;
  };

  /** 產生要更新的內容
   *
   * @param {Array} prev
   * @param {Array} next
   * @param {Object}
   */
  yieldUpdateItems = (prev, next) => {
    const data = {};
    const preserveItem = _.intersection(prev, next);
    if (preserveItem.length) {
      data.insertItem = _.xor(preserveItem, next);
      data.destroyItem = _.xor(preserveItem, prev);
    }
    return data;
  }

  /**
   *
   * @param {string} folder
   * @param {string} middlewareFolder
   * @returns {Array}
   */
  yieldRoutePath = (folder, middlewareFolder = null) => {
    const payload = [];
    let middleware;
    fs.readdirSync(folder)
      .filter((file) => (file.indexOf('.') !== 0) && (file.slice(-3) === '.js'))
      .forEach((file) => {
        const controller = require(path.resolve(folder, file)).default;
        payload.push({
          route: `/${file.replace('.js', '')}`,
          controller,
        });
      });
    if (middlewareFolder) {
      fs.readdirSync(middlewareFolder)
        .filter((file) => (file.indexOf('.') !== 0) && (file.slice(-3) === '.js') && (file.indexOf('admin') > -1))
        .forEach((file) => {
          middleware = require(path.resolve(middlewareFolder, file)).default;
        });
      return _.map(payload, (x) => ({
        ...x,
        route: `/private${x.route}`,
        middleware,
      }));
    }
    return payload;
  }

  /** 紀錄 Log 訊息
   *
   * @param {string} message
   * @returns {void}
   */
  yieldLogFile = (message) => {
    const fileName = `${moment().format('yyyy-MM-DD')}.txt`;
    const basePath = path.resolve(__dirname, '../../log');
    const targetPath = path.resolve(basePath, fileName);
    const content = `${moment().format('yyyy-MM-DD hh:mm:ss')} ： ${message}`;
    if (!fs.existsSync(basePath)) fs.mkdirSync(basePath);
    if (!fs.existsSync(targetPath)) {
      fs.writeFileSync(targetPath, `${content}\n`);
    } else {
      fs.appendFileSync(targetPath, `${content}\n`);
    }
  }
}

export default new GlobalService();
