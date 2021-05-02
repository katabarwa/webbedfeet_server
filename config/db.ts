import mongoose from "mongoose";

// Connects to the DB Cluster with the mongo DB connection URI provided in the .env file

const connectDB = async () => {
  const dbURI = process.env.MONGO_URI;

  try {
    if (dbURI) {
      await mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });
      console.log("MongoDB Connected...");
    } else {
      console.error("No DB URI found");
      process.exit(1);
    }
  } catch (err) {
    console.error(err.message);

    process.exit(1);
  }
};

export default connectDB;
