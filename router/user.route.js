import express from "express";
import userController from "../controllers/userController/user.auth.js";
import userloginController from "../controllers/userController/user.login.js";

const router = express.Router();


router.post('/signup', (userController.signup));
router.post('/signin', (userloginController.signin));




export{ router };