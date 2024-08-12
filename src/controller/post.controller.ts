import { Controller, Post, Body, Inject, Get, Param } from '@midwayjs/core';
import { PostService } from '../service/post.service';
@Controller('/post')
export class PostController {
    @Inject()
    postService: PostService;

    @Get('/GetPostByID/:postId')
    async GetPostById(@Param('postId') postId: number) {
        return await this.postService.getPostById(postId);
    }

    @Get('/GetAllPosts')
    async GetAllPosts() {
        return await this.postService.getAllPosts();
    }

    @Post('/CreatePost')
    async createPost(
        @Body() body: { circleId: number; content: string; images: string[]; writer: string },
    ) {

        const { circleId, content, images, writer } = body;
        console.log('writer:', writer);
        return await this.postService.createPost(circleId, content, images, writer);
    }
}
