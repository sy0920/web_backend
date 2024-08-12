import { Provide } from '@midwayjs/core';
// import { Circle } from '../entity/circle';
// import { Post } from '../entity/post';
// import { User } from '../entity/user';
// import { Comment } from '../entity/comment';
import { data } from '../controller/circle.controller';
@Provide()
export class CircleService {
  async getAllCircles() {
    return data.circles;
  }

  async createCircle(name: string) {
    const newCircle = {
      id: data.circles.length + 1,
      name: name,
      members: [],
      posts: [],
    };
    data.circles.push(newCircle);
    return newCircle;
  }

  async getCircleById(circleId: number) {
    console.log('data.circles: ', data.circles);
    return data.circles.find(circle => circle.id === circleId);
  }
  async calculateCirclePostCounts(circleId: number) {
    const circle = data.circles.find(c => c.id === circleId);
    if (!circle) {
      return null;
    }

    const memberPostCounts = circle.members.map(memberId => {
      const member = data.users.find(user => user.id === memberId);
      const postCount = data.posts.filter(post => post.circleId === circle.id && post.writer === member.username).length;
      return {
        memberId,
        username: member.username,
        postCount,
      };
    });

    return {
      circleId: circle.id,
      circleName: circle.name,
      memberPostCounts: memberPostCounts.sort((a, b) => b.postCount - a.postCount),
    };
  }

  async addMemberToCircle(circleId: number, id: number) {
    const circle = data.circles.find(c => c.id === circleId);
    if (!circle) {
      throw new Error('Circle not found');
    }
    if (!circle.members.includes(id)) {
      circle.members.push(id);
    }
    return circle;
  }

}