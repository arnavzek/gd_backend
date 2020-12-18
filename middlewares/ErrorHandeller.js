function ErrorHandeller(err, req, res, next) {
  const status = err.statusCode ? err.statusCode : 500;
  const message = err.message ? err.message : 'Something Went Wrong';

  const error = {
    status,
    message,
  };

  console.error('SOME ERROR OCCURED:', error, err.stack);

  res.status(status).json(error);
  next();
}

module.exports = ErrorHandeller;
