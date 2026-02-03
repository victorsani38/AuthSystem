import dotenv from "dotenv"; dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectionDb } from "./db/connectionDb.js"; 
import authRoute from "./route/authRoute.js"

const app = express();
const allowedOrigins = [
  "https://auth-client-orcin-three.vercel.app",
]
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true, // required for cookies
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use('/api/users', authRoute)
const port = process.env.PORT 
app.listen(port, ()=> {
    connectionDb()
    console.log(`Server running on http://localhost:${port}`)
})
