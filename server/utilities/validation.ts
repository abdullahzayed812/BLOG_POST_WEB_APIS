import { Response } from "express";

export const requestPostDataValidation = (
  res: Response,
  title: string,
  url: string
): Response<any, Record<string, any>> | undefined => {
  if (!title) {
    return res.send(400).send("Post title field is required.");
  } else if (!url) {
    return res.status(400).send("Post url field is required. ");
  }
};
