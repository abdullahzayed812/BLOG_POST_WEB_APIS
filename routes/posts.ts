import express, { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { createPostHandler, listPostsHandler } from "../handlers/postHandler";

const router: Router = express.Router();

router.route("/").get(expressAsyncHandler(listPostsHandler));
router.route("/").post(expressAsyncHandler(createPostHandler));

export default router;
