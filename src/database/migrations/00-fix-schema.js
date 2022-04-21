/* eslint-disable import/prefer-default-export */
import env from '../../config/env';
import _ from 'lodash';

export async function up(queryInterface) {
  const { database } = queryInterface.sequelize.config;
  switch (_.toLower(env.DatabaseDialect)) {
    case 'mssql':
      await queryInterface.sequelize.query(`ALTER DATABASE ${database} COLLATE SQL_Latin1_General_CP1_CI_AS;`);
      break;
    default:
      await queryInterface.sequelize.query(`ALTER DATABASE ${database} CHARACTER SET utf8 COLLATE utf8_general_ci;`);
      break;
  }
}
