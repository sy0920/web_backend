import { Controller, Inject, Get, Post, Body, Param } from '@midwayjs/core';
import { CommentService } from '../service/comment.service';

@Controller('/comment')
export class CommentController {
    @Inject()
    commentService: CommentService;

    @Post('/CreateComment')
    async createComment(
        @Body() body: { postId: number; writer: string; text: string }
    ) {
        const { postId, writer, text } = body;
        console.log('username222 ', writer);
        return await this.commentService.createComment(postId, writer, text);
    }

    @Get('/GetCommentsByPostID/:postId')
    async GetCommentsByPostId(@Param('postId') postId: number) {
        return await this.commentService.getCommentsByPostId(postId);
    }


}
