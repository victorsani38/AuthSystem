import dotenv from "dotenv"; dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectionDb } from "./db/connectionDb.js";
import authRoute from "./route/authRoute.js" 

const app = express();


//const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const allowedOrigins = [
  "http://localhost:5173",
  "https://authsystem-6ppf.onrender.com",
]

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
//app.use(cors({origin:"http://localhost:5173", credentials:true})); 

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
  })
  
)


const port = process.env.PORT 

app.use('/api/users', authRoute)

app.listen(port, ()=> {
    connectionDb()
    console.log(`Server running on http://localhost:${port}`)
})