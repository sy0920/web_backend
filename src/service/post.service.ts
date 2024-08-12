import { Provide } from '@midwayjs/core';
// import { Post } from '../entity/post';
// import { Circle } from '../entity/circle';
import { data } from '../controller/circle.controller';
@Provide()
export class PostService {
    async getPostsByCircleId(circleId: number) {
        return data.posts.filter(post => post.circleId === circleId);
    }

    async getPostById(postId: number) {
        return data.posts.find(post => post.id === postId);
    }

    async getAllPosts() {
        return data.posts;
    }

    async createPost(circleId: number, content: string, images: string[], writer: string) {
        const newPost = {
            id: data.posts.length + 1,
            circleId: circleId,
            writer: writer,
            date: new Date().toLocaleDateString(),
            content: content,
            images: images,
            comments: [],
        };
        data.posts.push(newPost);
        data.circles[circleId - 1].posts.push(newPost.id);
        console.log('new Posts: ', data.posts);
        console.log('new Circles: ', data.circles);
        return newPost;
    }
}