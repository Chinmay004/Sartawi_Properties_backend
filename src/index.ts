import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // ✅ import cors
import listingRoutes from "./routes/listing.route";
import cron from "node-cron";
import { refreshPixxiListings } from "./listings/fetchPixxi";
import v1Router from './routes/v1.route';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// ✅ Enable CORS (Allow requests from frontend)
app.use(cors()); // Open to all origins


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ API routes
app.use('/api/listing', listingRoutes);
app.use('/api/v1', v1Router);


// ✅ Default root route
app.get('/', (_, res) => {
  res.status(200).send('Hello, TypeScript with Express!');
});

// refreshPixxiListings();

// Schedule every hour
cron.schedule('0 * * * *', refreshPixxiListings);


// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
