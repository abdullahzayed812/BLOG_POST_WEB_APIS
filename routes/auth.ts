import express from "express";

import { signInHandler, signUpHandler } from "../handlers/authHandler";
import expressAsyncHandler from "express-async-handler";

const router = express.Router();

router.route("/").post(expressAsyncHandler(signUpHandler));
router.route("/").post(expressAsyncHandler(signInHandler));

export default router;
