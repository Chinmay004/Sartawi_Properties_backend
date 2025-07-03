import express from 'express';
import {
  createListing,
  getAllListings,
  getListingById
} from '../controllers/listing.controller';

const router = express.Router();

router.post('/listing', createListing);
router.get('/listing', getAllListings);
router.get('/listing/:id', getListingById);

export default router;
