"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors")); // ✅ import cors
const listing_route_1 = __importDefault(require("./routes/listing.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// ✅ Enable CORS (Allow requests from frontend)
app.use((0, cors_1.default)({
    origin: "http://localhost:3000", // frontend origin
    credentials: true, // if using cookies or auth headers
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// ✅ API routes
app.use('/api', listing_route_1.default);
// ✅ Default root route
app.get('/', (_, res) => {
    res.status(200).send('Hello, TypeScript with Express!');
});
// ✅ Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
