import mongoose from "mongoose";
import { MONGODB_URL } from "./config.js";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(MONGODB_URL);
    console.log(`Connected to database: ${MONGODB_URL} `);
    console.log(`Database ${connection.connection.name} connected`);
  } catch (error) {
    console.error({
      message: "Something went wrong on connect database (connectDB)",
      errorMessage: error.message,
      errorCode: error.code,
      // errorErrors: error.errors.map((error) => error.message),
      errorErrors1: error.errors,
      error: error,
    });
  }
};
