import { Request, Response, RequestHandler } from 'express';
import fs from 'fs/promises';
import { PropertyRecord } from '../types/propertyRecord';

const LISTINGS_FILE = "./src/listings/listingsData.json";

interface DeveloperSummary {
    name: string;
    properties: number;
    priceRange: string;
    propertyTypes: string[];
    featuredProperty?: {
        id: string;
        title: string;
        price: number;
        propertyId: string;
    };
}

interface AreaData {
    name: string;
    coordinates: [number, number];
    developers: DeveloperSummary[];
    totalProperties: number;
    averagePrice: number;
}

// Dubai area coordinates mapping
const DUBAI_AREAS: Record<string, [number, number]> = {
    'Downtown Dubai': [25.1972, 55.2744],
    'Dubai Marina': [25.0920, 55.1386],
    'Palm Jumeirah': [25.1122, 55.1386],
    'Arabian Ranches 3': [25.0553, 55.2203],
    'Town Square': [25.1189, 55.3788],
    'Dubai Hills Estate': [25.0553, 55.2203],
    'Dubai Silicon Oasis': [25.1189, 55.3788],
    'Business Bay': [25.1867, 55.2744],
    'Jumeirah Village Circle': [25.0553, 55.2203],
    'Dubai Sports City': [25.0553, 55.2203],
    'Dubai Production City': [25.1189, 55.3788],
    'Dubai International City': [25.1189, 55.3788],
    'Dubai Creek Harbour': [25.1972, 55.2744],
    'Dubai South': [25.0553, 55.2203],
    'Dubai World Central': [25.0553, 55.2203],
};

export const getMapAreas: RequestHandler = async (req, res) => {
    try {
        console.log("Map areas endpoint called");

        // Read from JSON file
        const fileContent = await fs.readFile(LISTINGS_FILE, 'utf-8');
        console.log("File read successfully, size:", fileContent.length);

        const properties: PropertyRecord[] = JSON.parse(fileContent);
        console.log("Properties parsed, count:", properties.length);

        // Filter active properties
        const activeProperties = properties.filter(prop =>
            prop.status === 'ACTIVE' &&
            prop.developer &&
            prop.region
        );

        // Group properties by region
        const areaGroups = activeProperties.reduce((acc, prop) => {
            const area = prop.region;
            if (!acc[area]) {
                acc[area] = [];
            }
            acc[area].push(prop);
            return acc;
        }, {} as Record<string, PropertyRecord[]>);

        // Process each area
        const areas: AreaData[] = Object.entries(areaGroups).map(([areaName, areaProperties]) => {
            // Group by developer within the area
            const developerGroups = areaProperties.reduce((acc, prop) => {
                const developer = prop.developer;
                if (!acc[developer]) {
                    acc[developer] = [];
                }
                acc[developer].push(prop);
                return acc;
            }, {} as Record<string, PropertyRecord[]>);

            // Create developer summaries
            const developers: DeveloperSummary[] = Object.entries(developerGroups).map(([devName, devProperties]) => {
                const prices = devProperties.map(p => p.price);
                const minPrice = Math.min(...prices);
                const maxPrice = Math.max(...prices);

                // Get unique property types
                const propertyTypes = [...new Set(devProperties.flatMap(p => p.propertyType))];

                // Find featured property (highest priced)
                const featuredProperty = devProperties.reduce((max, prop) =>
                    prop.price > max.price ? prop : max
                );

                return {
                    name: devName,
                    properties: devProperties.length,
                    priceRange: `${(minPrice / 1000000).toFixed(1)}M-${(maxPrice / 1000000).toFixed(1)}M`,
                    propertyTypes,
                    featuredProperty: {
                        id: featuredProperty.propertyId,
                        title: featuredProperty.title,
                        price: featuredProperty.price,
                        propertyId: featuredProperty.propertyId
                    }
                };
            });

            // Calculate area totals
            const totalProperties = areaProperties.length;
            const totalPrice = areaProperties.reduce((sum, prop) => sum + prop.price, 0);
            const averagePrice = totalPrice / totalProperties;

            return {
                name: areaName,
                coordinates: DUBAI_AREAS[areaName] || [25.2048, 55.2708], // Default to Dubai center
                developers,
                totalProperties,
                averagePrice
            };
        });

        // Get featured properties (top 8 by price)
        const featuredProperties = activeProperties
            .sort((a, b) => b.price - a.price)
            .slice(0, 8)
            .map(prop => ({
                id: prop.propertyId,
                title: prop.title,
                location: prop.region,
                latitude: DUBAI_AREAS[prop.region]?.[0] || 25.2048,
                longitude: DUBAI_AREAS[prop.region]?.[1] || 55.2708,
                developerName: prop.developer,
                price: prop.price,
                type: prop.propertyType[0] || 'Property'
            }));

        res.status(200).json({
            areas,
            featuredProperties,
            totalAreas: areas.length,
            totalProperties: activeProperties.length
        });

    } catch (err) {
        console.error("Failed to fetch map areas:", err);
        res.status(500).json({ error: "Failed to fetch map areas" });
    }
};

// Simple test endpoint
export const testMapEndpoint: RequestHandler = async (req, res) => {
    res.status(200).json({ message: "Map endpoint is working!" });
}; 