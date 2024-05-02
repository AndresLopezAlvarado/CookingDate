import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;

export const MONGODB_URL = "mongodb://localhost:27017/CookingDateDB";
// export const MONGODB_URL = process.env.MONGODB_URL;

export const TOKEN_SECRET = process.env.TOKEN_SECRET;

export const FRONTEND_URL = process.env.FRONTEND_URL;

export const CLOUD_NAME = process.env.CLOUD_NAME;
export const API_KEY = process.env.API_KEY;
export const API_SECRET = process.env.API_SECRET;
