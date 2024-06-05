require('dotenv').config(); 

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
      connectTimeout: 300000 // 60 segundos de tiempo de espera
    },
    pool: {
      max: 10, // Número máximo de conexiones en el pool
      min: 0,  // Número mínimo de conexiones en el pool
      acquire: 60000, // Tiempo máximo en milisegundos que pool intentará obtener una conexión antes de lanzar un error
      idle: 10000 // Tiempo máximo en milisegundos que una conexión puede estar inactiva antes de ser liberada
    }
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
      connectTimeout: 300000 // 60 segundos de tiempo de espera
    },
    pool: {
      max: 10, // Número máximo de conexiones en el pool
      min: 0,  // Número mínimo de conexiones en el pool
      acquire: 60000, // Tiempo máximo en milisegundos que pool intentará obtener una conexión antes de lanzar un error
      idle: 10000 // Tiempo máximo en milisegundos que una conexión puede estar inactiva antes de ser liberada
    }
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
      connectTimeout: 300000 // 60 segundos de tiempo de espera
    },
    pool: {
      max: 10, // Número máximo de conexiones en el pool
      min: 0,  // Número mínimo de conexiones en el pool
      acquire: 60000, // Tiempo máximo en milisegundos que pool intentará obtener una conexión antes de lanzar un error
      idle: 10000 // Tiempo máximo en milisegundos que una conexión puede estar inactiva antes de ser liberada
    }
  }
};
