import express from "express";
import expressAsyncHandler from "express-async-handler";
import { initDb } from "./datastore";
// import { signInHandler, signUpHandler } from "./handlers/authHandler";
import dotenv from "dotenv";
import { requestLoggerMiddleware } from "./middlewares/loggerMiddleware";
import { errorHandlerMiddleware } from "./middlewares/errorMiddleware";
import { authMiddleware } from "./middlewares/authMiddleware";
import { createPostHandler, listPostsHandler } from "./handlers/postHandler";
import authRoute from "./routes/auth";

(async () => {
  await initDb();

  dotenv.config();

  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(requestLoggerMiddleware);

  // Public endpoints.
  app.use("/v1/signUp", authRoute);
  app.use("/v1/signIn", authRoute);

  app.use(authMiddleware);

  // Protected endpoints.
  app.get("/v1/posts", expressAsyncHandler(listPostsHandler));
  app.post("/v1/posts", expressAsyncHandler(createPostHandler));

  app.use(errorHandlerMiddleware);

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
