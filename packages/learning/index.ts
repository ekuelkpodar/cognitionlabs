import { PrismaClient } from "@prisma/client";

export class LearningService {
  constructor(private prisma: PrismaClient) {}

  async listCourses(orgId?: string) {
    return this.prisma.course.findMany({ where: { OR: [{ organizationId: orgId }, { organizationId: null }] } });
  }

  async getCourse(id: string) {
    return this.prisma.course.findUnique({ where: { id }, include: { modules: { include: { lessons: true } }, skillTags: { include: { skillTag: true } } } });
  }
}
