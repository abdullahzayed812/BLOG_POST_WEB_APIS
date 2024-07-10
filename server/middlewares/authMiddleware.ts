import { verifyJwt } from "../utilities/auth";
import { db } from "../datastore";
import { ExpressHandler } from "../types/api";

export const authMiddleware: ExpressHandler<any, any> = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).send({ error: "No token exist, please check it and try again." });
  }

  try {
    const { userId } = verifyJwt(token!);
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
