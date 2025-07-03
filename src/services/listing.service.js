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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListingByIdService = exports.getAllListingsService = exports.createListingService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createListingService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.listing.create({ data });
});
exports.createListingService = createListingService;
const getAllListingsService = (skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.listing.findMany({
        skip,
        take: limit,
        orderBy: {
            createdAt: "desc",
        },
    });
});
exports.getAllListingsService = getAllListingsService;
const getListingByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.listing.findUnique({ where: { id } });
});
exports.getListingByIdService = getListingByIdService;
