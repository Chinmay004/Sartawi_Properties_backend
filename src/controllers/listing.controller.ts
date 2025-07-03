import { Request, Response,RequestHandler } from 'express';
import {
  createListingService,
  getAllListingsService,
  getListingByIdService
} from '../services/listing.service';
import prisma from '../prisma/client';

export const createListing: RequestHandler = async (req, res) => {
  try {
    const newListing = await createListingService(req.body);
    res.status(201).json(newListing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create listing' });
  }
};

export const getAllListings: RequestHandler = async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  try {
    const [listings, totalCount] = await Promise.all([
      getAllListingsService(skip, limit),
      prisma.listing.count(), // Count total listings
    ]);

    res.status(200).json({
      listings,
      totalCount,
    });
  } catch (err) {
    console.error("Failed to fetch listings:", err);
    res.status(500).json({ error: "Failed to fetch listings" });
  }
};


export const getListingById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const listing = await getListingByIdService(id);
    if (!listing) {
      res.status(404).json({ error: 'Listing not found' });
      return;
    }
    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch listing' });
  }
};
