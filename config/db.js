const mongoose = require('mongoose');

async function connectDB() {
  try {
    const connection = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    console.log(
      `Database Connected to host: ${connection.connection.host} and Database: ${connection.connection.name}`,
    );
  } catch (err) {
    console.error(`Database Connection Error: ${err}`);
    process.exit(1);
  }
}

module.exports = connectDB;
