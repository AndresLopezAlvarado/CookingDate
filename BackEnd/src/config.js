import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
// export const PORT = process.env.PORT || 3000;

export const MONGODB_URL = process.env.MONGODB_URL;
// process.env.MONGODB_URL || "mongodb://localhost:27017/FindPetDB";

export const TOKEN_SECRET = process.env.TOKEN_SECRET;
// export const TOKEN_SECRET = process.env.TOKEN_SECRET || "anyKey123";

export const FRONTEND_URL = process.env.FRONTEND_URL;
// export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

export const CLOUD_NAME = process.env.CLOUD_NAME;
export const API_KEY = process.env.API_KEY;
export const API_SECRET = process.env.API_SECRET;
