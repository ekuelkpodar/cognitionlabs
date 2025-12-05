import { PrismaClient } from "@prisma/client";

export class FollowService {
  constructor(private prisma: PrismaClient) {}
  async followUser(followerUserId: string, followedUserId: string) {
    return this.prisma.userFollow.create({ data: { followerUserId, followedUserId } });
  }
  async listFollowers(userId: string) {
    return this.prisma.userFollow.findMany({ where: { followedUserId: userId } });
  }
}
