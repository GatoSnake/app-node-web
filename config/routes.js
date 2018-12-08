'use strict';

const index = rootRequire('./app/controllers/index');
const logger = rootRequire('./config/logger');

module.exports = (app) => {
  logger.info('Initializing routes ...');

  // Check authentication user
  //app.all('*', checkAuth);

  //all routes
  app.use('/', index);

  // Function verify if user is authenticated
  const checkAuth = (req, res, next) => {
    if (process.env.NODE_ENV === 'development' && req.path.startsWith('/test', 0)) {
      next();
    } else if (req.path === '/' || req.path === '/login') {
      if (req.session.auth) {
        res.redirect('/home');
      } else
        next();
    } else {
      if (!req.session.auth) {
        // console.log(`User is not authenticated!. Redirect to path "/".`);
        req.session.destroy();
        res.redirect('/');
      } else {
        next();
      }
    }
  }

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

};
