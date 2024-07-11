import { JwtPayload } from "../types";
import jwt from "jsonwebtoken";

const { sign, verify } = jwt;

export function signJwt(payload: JwtPayload): string {
  return sign(payload, getJwtSecret(), { expiresIn: "3d" });
}

export function verifyJwt(token: string): JwtPayload {
  return verify(token, getJwtSecret()) as JwtPayload;
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error("Missing Jwt secret.");
    process.exit(1);
  }

  return secret;
}
