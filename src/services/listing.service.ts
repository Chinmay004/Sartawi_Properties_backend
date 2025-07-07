import { PrismaClient, Listing, Prisma } from '@prisma/client';
import fs from "fs/promises";
import path from "path";
import { PropertyRecord } from "../types/propertyRecord";


const prisma = new PrismaClient();
const LISTINGS_FILE = "./src/listings/listingsData.json"; // ✅ Add this line



export interface ListingsFilter {
  page: number;
  limit: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  propertyType?: string;
  region?: string;
  cityName?: string;
  developer?: string;
  listingType?: string;
  status?: string;
  amenities?: string[];
}

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

export async function getFilteredPropertiesService(
  filters: ListingsFilter
): Promise<{ records: PropertyRecord[]; totalCount: number }> {
  const fileContent = await fs.readFile(LISTINGS_FILE, "utf-8");
  let data: PropertyRecord[] = JSON.parse(fileContent);

  const {
    page,
    limit,
    search,
    minPrice,
    maxPrice,
    bedrooms,
    propertyType,
    region,
    cityName,
    developer,
    listingType,
    status,
    amenities
  } = filters;

  let filtered = data;

  if (search) {
    const lower = search.toLowerCase();
    filtered = filtered.filter(item =>
      (item.title?.toLowerCase().includes(lower) || 
       item.description?.toLowerCase().includes(lower) ||
       item.region?.toLowerCase().includes(lower) ||
       item.cityName?.toLowerCase().includes(lower) ||
       item.developer?.toLowerCase().includes(lower))
    );
  }

  if (minPrice !== undefined) {
    filtered = filtered.filter(item => item.price >= minPrice);
  }
  if (maxPrice !== undefined) {
    filtered = filtered.filter(item => item.price <= maxPrice);
  }

  if (bedrooms !== undefined) {
    filtered = filtered.filter(item => item.bedrooms === bedrooms);
  }

  if (propertyType) {
    filtered = filtered.filter(item =>
      item.propertyType.some(pt => pt.toLowerCase() === propertyType.toLowerCase())
    );
  }

  if (region) {
    filtered = filtered.filter(item => item.region.toLowerCase() === region.toLowerCase());
  }

  if (cityName) {
    filtered = filtered.filter(item => item.cityName.toLowerCase() === cityName.toLowerCase());
  }

  if (developer) {
    filtered = filtered.filter(item => item.developer.toLowerCase() === developer.toLowerCase());
  }

  if (listingType) {
    filtered = filtered.filter(item => item.listingType.toLowerCase() === listingType.toLowerCase());
  }

  if (status) {
    filtered = filtered.filter(item => item.status.toLowerCase() === status.toLowerCase());
  }

  if (amenities && amenities.length) {
    filtered = filtered.filter(item =>
      amenities.every(a =>
        item.amenities.map(am => am.toLowerCase()).includes(a.toLowerCase())
      )
    );
  }

  const totalCount = filtered.length;
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    records: filtered.slice(start, end),
    totalCount
  };
}
