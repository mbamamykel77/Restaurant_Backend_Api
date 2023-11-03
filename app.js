import express from "express";
import mongoose from "mongoose";
import "./db/connect.js";
import { router as authRouter } from "./router/auth.route.js";
import passport from "passport";
import "./controllers/userController/google.auth.js";
import session from "express-session";
import cookieParser from 'cookie-parser';

const app = express();
const port = Number(process.env.PORT) || 3000;


app.use(express.json());
app.use(cookieParser());


// session
app.use(session ({
  secret: "mysecret",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use("/viviskitchen", authRouter);

app.get('/', (req, res) => {
  res.render("home")
})


// set up view engine
app.set("view engine", "ejs")


// mongodb connection
mongoose
  .connect(process.env.MongoURI)
  .then(() => console.log("Database Connection Established"))
  .catch((e) => console.log(e.message));


app.listen(port, () => console.log(`server is listening on Port ${port}...`));
