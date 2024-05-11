import mongoose from "mongoose";
import { MONGODB_URL } from "./config.js";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(MONGODB_URL);

    if (connection)
      console.log(`Database (${connection.connection.name}) connected`);
  } catch (error) {
    console.error({
      message: "Something went wrong on (connectDB) connect database",
      errorMessage: error.message,
      errorCode: error.code,
      errorErrors1: error.errors,
      error: error,
    });
  }
};
