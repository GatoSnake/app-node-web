module.exports = {
  session: {
    secret: 'abc123'
  },
  db: {
    url: 'mongodb://<user>:<password>@<ip>:<post>',
    dbName: '<db-name>'
  },
  temp: {
    uploads: '/temp/',
    downloads: '/temp/'
  }
};
