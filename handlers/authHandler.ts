import { ExpressHandler, SignInRequest, SignInResponse, SignUpRepose, SignUpRequest } from "../types/api";
import { signJwt } from "../utilities/auth";
import { db } from "../datastore";
import { User } from "../types";
import crypto from "crypto";

export const signUpHandler: ExpressHandler<SignUpRequest, SignUpRepose> = async (req, res) => {
  const { email, username, password, firstName, lastName } = req.body;

  if (!email || !username || !password || !firstName || !lastName) {
    return res.status(400).send({ error: "All fields are required." });
  }

  const userExists = (await db.getUserByEmail(email)) || (await db.getUserByUsername(username));

  if (userExists) {
    return res.status(403).send({ error: "User already exists." });
  }

  const user: User = {
    id: crypto.randomUUID(),
    email,
    username,
    password: hashPassword(password),
    firstName,
    lastName,
  };

  await db.createUser(user);

  const accessToken = signJwt({ userId: user.id });

  return res.status(200).send({ accessToken });
};

export const signInHandler: ExpressHandler<SignInRequest, SignInResponse> = async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).send({ error: "Login or password filed is incorrect." }); // Bad request.
  }

  const userExists = (await db.getUserByEmail(login)) || (await db.getUserByUsername(login));

  if (!userExists || userExists.password !== hashPassword(password)) {
    return res.status(403).send({ error: "Unauthorized user, password not match." }); // Unauthorized (not well credentials)
  }

  const accessToken = signJwt({ userId: userExists.id });

  return res.status(200).send({
    user: {
      id: userExists.id,
      email: userExists.email,
      firstName: userExists.firstName,
      lastName: userExists.lastName,
      username: userExists.username,
    },
    accessToken,
  });
};

function hashPassword(password: string): string {
  return crypto.pbkdf2Sync(password, process.env.PASSWORD_SALT!, 100, 64, "sha512").toString("hex");
}
