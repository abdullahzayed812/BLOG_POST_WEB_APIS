import { Comment } from "../../types";

export interface CommentDao {
  createComment(comment: Comment): Promise<void>;
  listComments(): Promise<Comment[]>;
  deleteComment(commentId: string): Promise<void>;
}
