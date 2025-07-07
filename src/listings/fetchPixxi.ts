import fs from "fs/promises";
import fetch from "node-fetch";
import { PropertyRecord } from "../types/propertyRecord"; // adjust path as needed


const PIXXI_URL = "https://dataapi.pixxicrm.ae/pixxiapi/v1/properties/";
const PIXXI_TOKEN = "GwoU8j7WFPwaAUfCz7B6NAHFwMBaSLak";
const LISTINGS_FILE = "./src/listings/listingsData.json";
const PAGE_SIZE = 100;

interface PixxiApiResponse {
  data?: {
    list?: any[];
    totalSize?: number;
  };
}

// interface LocalPropertyRecord {
//   id: number;
//   propertyId: string;
//   title: string;
//   description: string;
//   price: number;
//   bedrooms: number | null;
//   propertyType: string[];
//   region: string;
//   cityName: string;
//   developer: string;
//   listingType: string;
//   status: string;
//   amenities: string[];
//   images: string[];
// }

export async function refreshPixxiListings() {
let allListings: PropertyRecord[] = [];
  let page = 1;

  console.log("🔄 Starting Pixxi listings refresh...");

  while (true) {
    console.log(`📄 Fetching page ${page}...`);
    let res;
    try {
      res = await fetch(PIXXI_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-PIXXI-TOKEN": PIXXI_TOKEN
        },
        body: JSON.stringify({
          page,
          size: PAGE_SIZE
        })
      });
    } catch (err) {
      console.error(`❌ Error fetching page ${page}:`, err);
      break;
    }

    if (!res.ok) {
      console.error(`❌ API returned status ${res.status} for page ${page}`);
      break;
    }

    let data: PixxiApiResponse;
    try {
      data = await res.json() as PixxiApiResponse;
    } catch (err) {
      console.error("❌ Error parsing JSON:", err);
      break;
    }

    const list = data?.data?.list ?? [];
    if (!list.length) {
      console.log("✅ No more listings found, stopping.");
      break;
    }

const mapped: PropertyRecord[] = list.map((item: any) => ({
      id: item.id,
      propertyId: item.propertyId,
      title: item.title ?? "",
      description: item.description ?? "",
      price: item.price ?? 0,
      bedrooms: item?.bedRooms ?? null,
      propertyType: item?.propertyType ?? [],
      region: item?.region ?? "",
      cityName: item?.cityName ?? "",
      developer: item?.developer ?? "",
      listingType: item?.listingType ?? "",
      status: item?.status ?? "",
      amenities: item?.amenities ?? [],
      images: item?.photos ?? []
    }));

    allListings.push(...mapped);

    const totalSize = data.data?.totalSize ?? 0;
    if (page * PAGE_SIZE >= totalSize) {
      console.log("✅ All pages fetched.");
      break;
    }

    page++;
  }

  try {
    await fs.writeFile(LISTINGS_FILE, JSON.stringify(allListings, null, 2));
    console.log(`✅ Pixxi listings updated. Total saved: ${allListings.length}`);
  } catch (err) {
    console.error("❌ Error writing file:", err);
  }
}
