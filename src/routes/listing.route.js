"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const listing_controller_1 = require("../controllers/listing.controller");
const router = express_1.default.Router();
router.post('/listing', listing_controller_1.createListing);
router.get('/listing', listing_controller_1.getAllListings);
router.get('/listing/:id', listing_controller_1.getListingById);
exports.default = router;
