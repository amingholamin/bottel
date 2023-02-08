require('dotenv').config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  

  development: {
    client: 'postgresql',
    connection: {
      // database: process.env.DBNAME,
      // user:     process.env.DBUSER,
      // password: process.env.DBPASSWORD,
      database: 'test',
      user:     'admin',
      password: 'admin',
      host:'localhost',
      //port:process.env.DBPORT,
      port:'64048'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  
};
