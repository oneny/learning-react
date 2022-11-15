const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASSWORD}@cluster0.k7efief.mongodb.net/?retryWrites=true&w=majority`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log("MongoDB connection SUCCESS!!"))
    .catch((err) => {
      console.log("MongoDB connection FAILURE!!");
      console.log(err);
      process.exit(1);
    })
  } catch (err) {
    console.error(err);
  }
}

module.exports = connectDB;