class AppError extends Error {
  constructor(status = 500, error = 'Something Went Wrong') {
    super();
    this.message = error;
    this.statusCode = status;
    // this.stack = null;
  }
}

module.exports = AppError;
