import { PrismaClient, GalleryVisibility, GalleryItemType } from "@prisma/client";

export class GalleryService {
  constructor(private prisma: PrismaClient) {}

  async list(params: { visibility?: GalleryVisibility; type?: GalleryItemType; orgId?: string }) {
    return this.prisma.galleryItem.findMany({
      where: {
        visibility: params.visibility,
        type: params.type,
        OR: [{ visibility: GalleryVisibility.PUBLIC }, { organizationId: params.orgId }]
      },
      include: { ratings: true, reviews: true }
    });
  }

  async publish(input: {
    organizationId?: string;
    creatorUserId: string;
    type: GalleryItemType;
    refType: string;
    refId: string;
    visibility: GalleryVisibility;
    title: string;
    shortDescription?: string;
    longDescription?: string;
    tags?: string[];
  }) {
    return this.prisma.galleryItem.create({ data: { ...input, tags: input.tags ?? [] } });
  }

  async rate(galleryItemId: string, userId: string, rating: number) {
    return this.prisma.galleryRating.upsert({
      where: { galleryItemId_userId: { galleryItemId, userId } },
      update: { rating },
      create: { galleryItemId, userId, rating }
    });
  }
}
