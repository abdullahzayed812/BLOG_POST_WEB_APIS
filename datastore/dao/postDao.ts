import { Post } from "../../types";

export interface PostDao {
  createPost(post: Post): Promise<void>;
  listPosts(): Promise<Post[]>;
  getPost(postId: string): Promise<Post | undefined>;
  deletePost(postId: string): Promise<void>;
}
