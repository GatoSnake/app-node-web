'use strict';

const index = rootRequire('./app/routes/index');
const data = rootRequire('./app/routes/api/data');
const files = rootRequire('./app/routes/api/files');

module.exports = (app) => {
  logger.info('Initializing routes ...');

  // ****** ROUTES ******

  app.use('/', index);
  app.use('/api/data', data);
  app.use('/api/files', files);

  // ****** CUSTOM MIDDLEWARES ******

  //error 404 handler
  app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  //logger error
  app.use((err, req, res, next) => {
    logger.error(err.stack);
    next(err);
  });

  //detect type client error
  app.use((err, req, res, next) => {
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      res.status(500).json({ error: err.message });
    } else {
      next(err);
    }
  });

  // error handler
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.status = err.status;
    res.locals.error = process.env.NODE_ENV === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

};
