export default {
  development: {
    client: 'pg',
    connection: {
      host: 'eapd-dev.ci3dq79po163.us-east-1.rds.amazonaws.com',
      database: 'hitech_apd',
      port: 5432,
      user: 'postgres',
      password: ']*LT>O#N>5I&och*'
    },
    seeds: { directory: './seeds/development' }
  }

  //   test: {
  //     client: 'postgresql',
  //     connection: {
  //       host: process.env.TEST_DB_HOST || 'db',
  //       database: process.env.TEST_DB_NAME || 'hitech_apd_test',
  //       port: process.env.TEST_DB_PORT || 5432,
  //       user: process.env.TEST_DB_USER || 'postgres',
  //       password: process.env.TEST_DB_PASSWORD || 'cms'
  //     },
  //     seeds: { directory: './seeds/test' }
  //   },

  //   production: {
  //     client: 'postgresql',
  //     connection: process.env.DATABASE_URL,
  //     seeds: { directory: './seeds/production' }
  //   }
};
