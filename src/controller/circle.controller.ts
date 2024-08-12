import { Controller, Get, Post, Param, Inject, Body } from '@midwayjs/core';
import { CircleService } from '../service/circle.service';
import { PostService } from '../service/post.service';
@Controller('/circle')
export class CircleController {
  @Inject()
  circleService: CircleService;

  @Inject()
  postService: PostService;

  @Get('/GetAllCircles')
  async getAllCircles() {
    return await this.circleService.getAllCircles();
  }

  @Get('/GetCircleByID/:circleId')
  async GetCirclesById(@Param('circleId') circleId: number) {
    const circle = await this.circleService.getCircleById(circleId);
    console.log('circle: ', circle);
    const posts = await this.postService.getPostsByCircleId(circleId);
    console.log('posts: ', posts);

    return {
      circle: circle,
      posts: posts,
    };
  }

  @Post('/CreateCircle')
  async createCircle(@Body() body: { name: string }) {
    return await this.circleService.createCircle(body.name);
  }

  @Post('/:id/join')
  async joinCircle(@Param('id') id: number, @Body() body: { userId: number }) {
    const circle = await this.circleService.addMemberToCircle(id, body.userId);
    return { success: true, circle };
  }

  @Get('/:id/posts')
  async getPosts(@Param('id') id: number) {
    return { data: await this.postService.getPostsByCircleId(id) };
  }

  @Get('/:circleId/post-counts')
  async getCirclePostCounts(ctx) {
    const circleId = parseInt(ctx.params.circleId, 10);
    const postCounts = await this.circleService.calculateCirclePostCounts(circleId);
    if (postCounts) {
      ctx.body = postCounts;
    } else {
      ctx.status = 404;
      ctx.body = 'Circle not found';
    }
  }

}
export const data = {
  users: [
    { id: 1, username: '小洛' },
    { id: 2, username: '小希' },
    { id: 3, username: '肉肉' },
  ],
  circles: [
    { id: 1, name: '小说', members: [1, 2], posts: [1, 2] },
    { id: 2, name: '美食', members: [3], posts: [3] },
  ],
  posts: [
    {
      id: 1,
      circleId: 1,
      writer: '小洛',
      date: '2024/08/02',
      content: '今天看了《洛希极限》，真的好浪漫！！',
      images: [
        '../image/洛希极限.png',
      ],
      comments: [1],
    },
    {
      id: 2,
      circleId: 1,
      writer: '小希',
      date: '2024/08/05',
      content: '今天四刷了《台风眼》，真的太有老电影的质感了，那种氛围感真的绝了！！！',
      images: [
        '../image/台风眼.jpg'
      ],
      comments: [2],
    },
    {
      id: 3,
      circleId: 2,
      writer: '肉肉',
      date: '2024/08/9',
      content: '古茗的柚子新品真的绝了！！都给我去喝！太清爽了',
      images: [
        '古茗.jpg'
      ],
      comments: [],
    },
  ],
  comments: [
    { id: 1, postId: 1, writer: '小希', text: '看到后面我真的哭死，太悲了' },
    { id: 2, postId: 2, writer: '小洛', text: '姐妹有品！！真的巨好看！！！' },
  ],
};
