import { verifyJwt } from "../utilities/auth";
import { db } from "../datastore";
import { ExpressHandler } from "../types/api";

export const authMiddleware: ExpressHandler<any, any> = async (req, res, next) => {
  const userToken = req.headers.authorization;

  if (!userToken) {
    res.status(401).send({ error: "No token exist, please check it and try again." }); // Unauthorized.
  }

  try {
    const { userId } = verifyJwt(userToken!);
    const user = await db.getUserById(userId);

    if (!user) {
      throw new Error("User not found.");
    }

    res.locals.userId = userId;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).send({ error: "Bad token" });
  }
};
