"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListingById = exports.getAllListings = exports.createListing = void 0;
const listing_service_1 = require("../services/listing.service");
const client_1 = __importDefault(require("../prisma/client"));
const createListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newListing = yield (0, listing_service_1.createListingService)(req.body);
        res.status(201).json(newListing);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create listing' });
    }
});
exports.createListing = createListing;
const getAllListings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    try {
        const [listings, totalCount] = yield Promise.all([
            (0, listing_service_1.getAllListingsService)(skip, limit),
            client_1.default.listing.count(), // Count total listings
        ]);
        res.status(200).json({
            listings,
            totalCount,
        });
    }
    catch (err) {
        console.error("Failed to fetch listings:", err);
        res.status(500).json({ error: "Failed to fetch listings" });
    }
});
exports.getAllListings = getAllListings;
const getListingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const listing = yield (0, listing_service_1.getListingByIdService)(id);
        if (!listing) {
            res.status(404).json({ error: 'Listing not found' });
            return;
        }
        res.status(200).json(listing);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch listing' });
    }
});
exports.getListingById = getListingById;
