import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.DB_STRING) {
  throw new Error("Please add the DB_STRING environment variable");
}

mongoose.connect(`${process.env.DB_STRING}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

const database = mongoose.connection;

database.on(
  "error",
  console.error.bind(console, "❌ mongodb connection error")
);
database.once("open", () => console.log("✅ mongodb connected successfully"));

mongoose.Promise = Promise;
