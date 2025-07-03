import { PrismaClient, Listing, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const createListingService = async (data: Prisma.ListingCreateInput): Promise<Listing> => {
  return await prisma.listing.create({ data });
};

export const getAllListingsService = async (skip: number, limit: number): Promise<Listing[]> => {
  return await prisma.listing.findMany({
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });
};


export const getListingByIdService = async (id: string): Promise<Listing | null> => {
  return await prisma.listing.findUnique({ where: { id } });
};
