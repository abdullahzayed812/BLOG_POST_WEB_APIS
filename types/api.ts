import { RequestHandler } from "express";
import { Post, User } from ".";

export type WithError<T> = T & { error: string };

export type ExpressHandler<Req, Res> = RequestHandler<string, Partial<WithError<Res>>, Partial<Req>, any>;

// Post APIs
export interface ListPostsRequest {}
export interface ListPostsResponse {
  posts: Post[];
}

export type CreatePostRequest = Pick<Post, "url" | "title" | "userId">;
export interface CreatePostResponse {}

export interface GetPostRequest {
  post: Post;
}
export interface GetPostResponse {}

// Comment APIs

// Like APIs

// Auth APIs
export type SignUpRequest = Pick<User, "email" | "firstName" | "lastName" | "password" | "username">;
export interface SignUpRepose {
  accessToken: string;
}

export interface SignInRequest {
  login: string; // username or email
  password: string;
}

export type SignInResponse = {
  user: Pick<User, "id" | "email" | "firstName" | "lastName" | "username">;
  accessToken: string;
};
