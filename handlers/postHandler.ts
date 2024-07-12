import { db } from "../datastore";
import crypto from "crypto";
import { requestPostDataValidation } from "../utilities/validation";
import {
  CreatePostRequest,
  CreatePostResponse,
  ExpressHandler,
  ListPostsRequest,
  ListPostsResponse,
} from "../types/api";

export const listPostsHandler: ExpressHandler<ListPostsRequest, ListPostsResponse> = async (req, res) => {
  // TODO: add pagination and filtering.
  res.send({ posts: await db.listPosts() });
};

export const createPostHandler: ExpressHandler<CreatePostRequest, CreatePostResponse> = async (req, res) => {
  const { url, title, userId } = req.body;

  requestPostDataValidation(res, title, url);

  if (!url || !title || !userId) {
    // TODO: better error message.
    return res.sendStatus(400); // Bad request
  }

  // TODO: validate user exist.
  // TODO: get user id from session.
  // TODO: validate title and url are not empty.
  // TODO: validate url is new, otherwise add thumbs up to existing post.
  const post = {
    id: crypto.randomUUID(),
    title,
    url,
    userId: res.locals.userId,
    postedAt: Date.now(),
  };

  await db.createPost(post);

  res.sendStatus(200);
};
