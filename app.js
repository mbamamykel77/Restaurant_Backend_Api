import express from "express"
import mongoose from "mongoose";
import "./db/connect.js";
import { router as userRouter } from "./router/user.route.js"


const app = express();
const port = Number(process.env.PORT) || 8080;


app.use(express.json());


// Routes 
app.use('/api/viviskitchen/user', userRouter);







// mongodb connection
mongoose
  .connect(process.env.MongoURI)
  .then(() => console.log("Database Connection Established"))
  .catch((e) => console.log(e.message));




app.listen(port, () => console.log(`server is listening on Port ${port}...`));
