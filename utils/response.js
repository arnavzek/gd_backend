class Res {
  constructor(status, error, data) {
    this.status = status;
    this.error = error ? error : null;
    this.data = data;
  }

  get res() {
    return { status: this.status, error: this.error, data: this.data };
  }
}

module.exports = Res;
