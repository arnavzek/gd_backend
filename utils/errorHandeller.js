const Res = require('./response');

class ErrorHandeller extends Res {
  constructor(status, error) {
    super(status, error, null);
  }

  get err() {
    return { status: this.status, error: this.error, data: null };
  }
}

module.exports = ErrorHandeller;
