import { User, Post, Like, Comment } from "../../types";
import { DataStore } from "../index";

export class InMemoryDatastore implements DataStore {
  private users: User[] = [];
  private posts: Post[] = [];
  private comments: Comment[] = [];
  private likes: Like[] = [];

  createUser(user: User): Promise<void> {
    this.users.push(user);
    return Promise.resolve();
  }

  getUserById(id: string): Promise<User | undefined> {
    return Promise.resolve(this.users.find((u) => u.id === id));
  }

  getUserByEmail(email: string): Promise<User | undefined> {
    return Promise.resolve(this.users.find((u) => u.email === email));
  }

  getUserByUsername(username: string): Promise<User | undefined> {
    return Promise.resolve(this.users.find((u) => u.username === username));
  }

  createPost(post: Post): Promise<void> {
    this.posts.push(post);
    return Promise.resolve();
  }

  listPosts(): Promise<Post[]> {
    return Promise.resolve(this.posts);
  }

  getPost(postId: string): Promise<Post | undefined> {
    return Promise.resolve(this.posts.find((p) => p.id === postId));
  }

  deletePost(postId: string): Promise<void> {
    const index = this.posts.findIndex((p) => p.id === postId);

    if (index === -1) {
      return Promise.resolve();
    }

    this.posts.splice(index, 1);
  }

  createLike(like: Like): Promise<void> {
    this.likes.push(like);
    return Promise.resolve();
  }

  createComment(comment: Comment): Promise<void> {
    this.comments.push(comment);
    return Promise.resolve();
  }

  listComments(): Promise<Comment[]> {
    return Promise.resolve(this.comments);
  }

  deleteComment(commentId: string): Promise<void> {
    const index = this.comments.findIndex((c) => c.id === commentId);

    if (index === -1) {
      return Promise.resolve();
    }

    this.comments.splice(index, 1);
  }
}
