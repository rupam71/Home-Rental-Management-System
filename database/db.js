const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Database Connected");
  } catch (error) {
    console.log("Databsae Error :: ", error);
  }
};
