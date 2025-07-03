"use strict";
// import { PrismaClient,PropertyType } from '@prisma/client';
// import { faker } from '@faker-js/faker';
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
// const prisma = new PrismaClient();
// const PROPERTY_TYPES: PropertyType[] = [
//   PropertyType.Villa,
//   PropertyType.Apartment,
//   PropertyType.Studio,
//   PropertyType.Penthouse
// ];
// const AMENITIES = [
//   "Swimming Pool",
//   "Children's Play Area",
//   "Gym",
//   "Garden",
//   "Covered Parking",
//   "Security Staff",
//   "Central AC",
//   "Balcony",
//   "Private Garage",
//   "Pet Friendly"
// ];
// const SAMPLE_IMAGES = [
//   "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
//   "https://images.unsplash.com/photo-1572120360610-d971b9b6394d",
//   "https://images.unsplash.com/photo-1599423300746-b62533397364",
//   "https://images.unsplash.com/photo-1597047084897-dc16b019ebd7",
//   "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
//   "https://images.unsplash.com/photo-1600585154207-2a1bd0bf579f",
//   "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
//   "https://images.unsplash.com/photo-1570129477492-45c003edd2be"
// ];
// function getRandomAmenities() {
//   const shuffled = AMENITIES.sort(() => 0.5 - Math.random());
//   return shuffled.slice(0, Math.floor(Math.random() * 4) + 2);
// }
// function getRandomImages() {
//   const shuffled = SAMPLE_IMAGES.sort(() => 0.5 - Math.random());
//   return shuffled.slice(0, 4);
// }
// async function main() {
//   console.log("⏳ Seeding 100 fake listings...");
//   for (let i = 0; i < 100; i++) {
//     await prisma.listing.create({
//       data: {
//         title: `${faker.word.adjective()} ${faker.word.noun()} Residence`,
//         location: `${faker.location.streetAddress()}, ${faker.location.city()}, UAE`,
//         description: faker.lorem.paragraphs(2),
//         type: faker.helpers.arrayElement(PROPERTY_TYPES),
//         bedrooms: faker.number.int({ min: 1, max: 5 }),
//         bathrooms: faker.number.int({ min: 1, max: 4 }),
//         price: Number(faker.commerce.price({ min: 25000, max: 150000, dec: 2 })),
//         area: faker.number.int({ min: 800, max: 4000 }),
//         floors: faker.number.int({ min: 1, max: 3 }),
//         developerName: faker.company.name(),
//         security: faker.datatype.boolean(),
//         amenities: getRandomAmenities(),
//         images: getRandomImages()
//       }
//     });
//   }
//   console.log("✅ Done! 100 listings seeded.");
// }
// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(() => prisma.$disconnect());
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
const prisma = new client_1.PrismaClient();
const PROPERTY_TYPES = [
    client_1.PropertyType.Villa,
    client_1.PropertyType.Apartment,
    client_1.PropertyType.Studio,
    client_1.PropertyType.Penthouse
];
const AMENITIES = [
    "Swimming Pool",
    "Children's Play Area",
    "Gym",
    "Garden",
    "Covered Parking",
    "Security Staff",
    "Central AC",
    "Balcony",
    "Private Garage",
    "Pet Friendly"
];
const SAMPLE_IMAGES = [
    "https://res.cloudinary.com/drkxelewr/image/upload/v1751513898/Listings/jennifer-r-sZ9F_XkGJfI-unsplash_caxvuj.jpg", // brown and white concrete house near trees
    "https://res.cloudinary.com/drkxelewr/image/upload/v1751513845/Listings/digital-marketing-agency-ntwrk-g39p1kDjvSY-unsplash_c2iuts.jpg", // brown and white concrete house
    "https://res.cloudinary.com/drkxelewr/image/upload/v1751513843/Listings/florian-schmidinger-b_79nOqf95I-unsplash_dznilu.jpg", // 3D render modern building exterior
    "https://res.cloudinary.com/drkxelewr/image/upload/v1751513838/Listings/dillon-kydd-3Ignkeds3w8-unsplash_dfudps.jpg", // 3D render of house exterior at sunset
    "https://res.cloudinary.com/drkxelewr/image/upload/v1751513838/Listings/johnson-johnson-U6Q6zVDgmSs-unsplash_qncuwy.jpg", //working
    "https://res.cloudinary.com/drkxelewr/image/upload/v1751514029/Listings/gus-ruballo-h5QNclJUiA8-unsplash_ov0lgn.jpg", //working
    "https://res.cloudinary.com/drkxelewr/image/upload/v1751513838/Listings/ronnie-george-z11gbBo13ro-unsplash_1_mbkryh.jpg", //working
];
const LOCATIONS = [
    { address: "Downtown Dubai, Dubai, UAE", lat: 25.1972, lng: 55.2744 },
    { address: "Palm Jumeirah, Dubai, UAE", lat: 25.1122, lng: 55.1386 },
    { address: "Jumeirah Village Circle, Dubai, UAE", lat: 25.0553, lng: 55.2203 },
    { address: "Yas Island, Abu Dhabi, UAE", lat: 24.4958, lng: 54.6086 },
    { address: "Al Reem Island, Abu Dhabi, UAE", lat: 24.4937, lng: 54.3927 },
    { address: "Sharjah Waterfront City, Sharjah, UAE", lat: 25.3916, lng: 55.4925 },
    { address: "Ajman Corniche, Ajman, UAE", lat: 25.4180, lng: 55.4467 },
    { address: "Al Hamra Village, Ras Al Khaimah, UAE", lat: 25.7011, lng: 55.7946 }
];
function getRandomAmenities() {
    return faker_1.faker.helpers.arrayElements(AMENITIES, faker_1.faker.number.int({ min: 2, max: 5 }));
}
function getRandomImages() {
    return faker_1.faker.helpers.arrayElements(SAMPLE_IMAGES, 4);
}
function getRandomLocation() {
    return faker_1.faker.helpers.arrayElement(LOCATIONS);
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🧹 Deleting old listings...");
        yield prisma.listing.deleteMany();
        console.log("⏳ Seeding 100 real listings...");
        for (let i = 0; i < 100; i++) {
            const location = getRandomLocation();
            yield prisma.listing.create({
                data: {
                    title: `${faker_1.faker.word.adjective()} ${faker_1.faker.word.noun()} Residence`,
                    location: location.address,
                    latitude: location.lat,
                    longitude: location.lng,
                    description: faker_1.faker.lorem.paragraphs(2),
                    type: faker_1.faker.helpers.arrayElement(PROPERTY_TYPES),
                    bedrooms: faker_1.faker.number.int({ min: 1, max: 5 }),
                    bathrooms: faker_1.faker.number.int({ min: 1, max: 4 }),
                    price: Number(faker_1.faker.commerce.price({ min: 25000, max: 150000, dec: 2 })),
                    area: faker_1.faker.number.int({ min: 800, max: 4000 }),
                    floors: faker_1.faker.number.int({ min: 1, max: 3 }),
                    developerName: faker_1.faker.company.name(),
                    security: faker_1.faker.datatype.boolean(),
                    amenities: getRandomAmenities(),
                    images: getRandomImages()
                }
            });
        }
        console.log("✅ Done! 100 listings seeded.");
    });
}
main()
    .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
})
    .finally(() => prisma.$disconnect());
