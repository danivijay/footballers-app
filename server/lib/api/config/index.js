export default {
  port: process.env.PORT || 8081,
  db: {
    host: process.env.HOST_NAME || 'localhost',
    database: process.env.DB_NAME || 'CSV_DB',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.HOST || 'localhost',
      operatorsAliases: false
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret1'
  }
}