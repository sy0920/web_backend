import { Provide } from '@midwayjs/core';
import { data } from '../controller/circle.controller';
@Provide()
export class CommentService {
    async getCommentsByPostId(postId: number) {
        return data.comments.filter(comment => comment.postId === postId);
    }

    async createComment(postId: number, writer: string, content: string) {
        const post = data.posts.find(post => post.id === postId);
        if (!post) {
            throw new Error(`Post with id ${postId} not found`);
        }
        const newComment = {
            id: data.comments.length + 1,
            postId: postId,
            writer: writer,
            text: content,
        };
        console.log('writer:', writer);
        console.log('id:', newComment.id);
        console.log('new Comment: ', newComment);
        post.comments.push(newComment.id);
        console.log('data.posts:', data.posts);
        data.comments.push(newComment);
        console.log('data.comments:', data.comments);
        return newComment;
    }
}