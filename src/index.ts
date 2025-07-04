import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // ✅ import cors
import listingRoutes from "./routes/listing.route";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// ✅ Enable CORS (Allow requests from frontend)
app.use(cors({
  origin: ["http://localhost:3000", "https://frontend-srtvi.vercel.app"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ API routes
app.use('/api', listingRoutes);

// ✅ Default root route
app.get('/', (_, res) => {
  res.status(200).send('Hello, TypeScript with Express!');
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
