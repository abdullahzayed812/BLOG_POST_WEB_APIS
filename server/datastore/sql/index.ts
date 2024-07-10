import sqlite3 from "sqlite3";
import { Database, open as sqliteOpen } from "sqlite";

import { DataStore } from "..";
import { User, Post, Like, Comment } from "../../types";

import path from "path";
const __dirname = path.resolve();

export class SqlDatastore implements DataStore {
  private db: Database<sqlite3.Database, sqlite3.Statement>;

  public async openDb() {
    this.db = await sqliteOpen({
      filename: path.join(__dirname, "server", "datastore", "sql", "hackerank.sqlite"),
      driver: sqlite3.Database,
    });

    await this.db.migrate({
      migrationsPath: path.join(__dirname, "server", "datastore", "sql", "migrations"),
    });

    return this;
  }

  async createUser(user: User): Promise<void> {
    await this.db.run(
      "INSERT INTO users (id, email, password, username, firstName, lastName) VALUES (?,?,?,?,?,?)",
      user.id,
      user.email,
      user.password,
      user.username,
      user.firstName,
      user.lastName
    );
  }

  async getUserById(id: string): Promise<User | undefined> {
    return await this.db.get<User | undefined>("SELECT * FROM users WHERE id = ?", id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.db.get<User | undefined>("SELECT * FROM users WHERE email = ?", email);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return await this.db.get<User | undefined>("SELECT * FROM users WHERE username = ?", username);
  }

  async createPost(post: Post): Promise<void> {
    await this.db.run(
      "INSERT INTO posts (id, title, url, userId, postedAt) VALUES (?,?,?,?,?)",
      post.id,
      post.title,
      post.url,
      post.userId,
      post.postedAt
    );
  }

  async listPosts(): Promise<Post[]> {
    return await this.db.all<Post[]>("SELECT * FROM posts");
  }

  getPost(postId: string): Promise<Post> {
    throw new Error("Method not implemented.");
  }
  deletePost(postId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  createLike(like: Like): Promise<void> {
    throw new Error("Method not implemented.");
  }
  createComment(comment: Comment): Promise<void> {
    throw new Error("Method not implemented.");
  }
  listComments(): Promise<Comment[]> {
    throw new Error("Method not implemented.");
  }
  deleteComment(commentId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
