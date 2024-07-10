import { CommentDao } from "./dao/commentDao";
import { LikeDao } from "./dao/likeDao";
import { PostDao } from "./dao/postDao";
import { UserDao } from "./dao/userDao";
// import { InMemoryDatastore } from "./memorydb/index";
import { SqlDatastore } from "./sql";

export interface DataStore extends UserDao, PostDao, LikeDao, CommentDao {}

// export const db = new InMemoryDatastore();
export let db: DataStore;

export async function initDb() {
  db = await new SqlDatastore().openDb();
}
