// export interface Service {
//     id: string;
//     title: string;
//     description: string;
//     imageUrl: string;
//     Brand: string;
//     price: number;
//     discountedPrice: number;
//     discountPersent: number;
//     serviceDetails: string[];
// }

// export const services: Service[] = [
//     {
//         id: '1',
//         title: "Home Cleaning Service",
//         description: "Comprehensive cleaning service for homes, including living room, kitchen, and bathroom cleaning.",
//         imageUrl: "https://cdn.zyrosite.com/cdn-cgi/image/format=auto,w=574,h=322,fit=crop,q=100/cdn-ecommerce/store_01JCYZKF09EKDA2HS3ZXYAX2G1%2Fassets%2F1734717017311-store_01JCYZKF09EKDA2HS3ZXYAX2G1_assets_1734642265270-1701178669199-3d201d.webp",
//         Brand: "CleanMate",
//         price: 1500,
//         discountedPrice: 1200,
//         discountPersent: 20,
//         serviceDetails: [
//             "Living room deep cleaning",
//             "Kitchen degreasing and sanitization",
//             "Bathroom stain and tile scrubbing"
//         ]
//     },
//     {
//         id: '2',
//         title: "Plumbing Repair Service",
//         description: "Fix your plumbing issues quickly with our expert plumbers.",
//         imageUrl: "https://cdn.zyrosite.com/cdn-cgi/image/format=auto,w=574,h=322,fit=crop,q=100/cdn-ecommerce/store_01JCYZKF09EKDA2HS3ZXYAX2G1%2Fassets%2F1734717017311-store_01JCYZKF09EKDA2HS3ZXYAX2G1_assets_1734642265270-1701178669199-3d201d.webp",
//         Brand: "PlumbCare",
//         price: 2000,
//         discountedPrice: 1700,
//         discountPersent: 15,
//         serviceDetails: [
//             "Leak repair",
//             "Fixture installation",
//             "Drainage system maintenance"
//         ]
//     },
//     {
//         id: '3',
//         title: "Electrical Repair Service",
//         description: "Quick and reliable electrical repair service for all household issues.",
//         imageUrl: "https://cdn.zyrosite.com/cdn-cgi/image/format=auto,w=574,h=322,fit=crop,q=100/cdn-ecommerce/store_01JCYZKF09EKDA2HS3ZXYAX2G1%2Fassets%2F1734719510714-Washing-machine-repair-costs-explained-Featured-image-scaled1.webp",
//         Brand: "ElectroFix",
//         price: 1800,
//         discountedPrice: 1500,
//         discountPersent: 16,
//         serviceDetails: [
//             "Wiring repairs",
//             "Switchboard upgrades",
//             "Short circuit troubleshooting"
//         ]
//     },
//     {
//         id: '4',
//         title: "Home Painting Service",
//         description: "Give your home a fresh look with our expert painting services.",
//         imageUrl: "https://cdn.zyrosite.com/cdn-cgi/image/format=auto,w=574,h=322,fit=crop,q=100/cdn-ecommerce/store_01JCYZKF09EKDA2HS3ZXYAX2G1%2Fassets%2F1734718024640-store_01JCYZKF09EKDA2HS3ZXYAX2G1_assets_1733054866369-GettyImages-1407823157-1-e1671659346455.webp",
//         Brand: "PaintPro",
//         price: 8000,
//         discountedPrice: 7200,
//         discountPersent: 10,
//         serviceDetails: [
//             "Wall priming",
//             "Color consultation",
//             "Interior and exterior painting"
//         ]
//     },
//     {
//         id: '5',
//         title: "Pest Control Service",
//         description: "Keep your home safe from pests with our reliable pest control solutions.",
//         imageUrl: "https://cdn.zyrosite.com/cdn-cgi/image/format=auto,w=574,h=322,fit=crop,q=100/cdn-ecommerce/store_01JCYZKF09EKDA2HS3ZXYAX2G1%2Fassets%2F1734718024640-store_01JCYZKF09EKDA2HS3ZXYAX2G1_assets_1733054866369-GettyImages-1407823157-1-e1671659346455.webp",
//         Brand: "BugBusters",
//         price: 3000,
//         discountedPrice: 2500,
//         discountPersent: 17,
//         serviceDetails: [
//             "Cockroach treatment",
//             "Rodent control",
//             "Ant and termite eradication"
//         ]
//     },
//     {
//         id: '6',
//         title: "Carpet Cleaning Service",
//         description: "Deep cleaning service for carpets using eco-friendly methods.",
//         imageUrl: "https://cdn.zyrosite.com/cdn-cgi/image/format=auto,w=574,h=322,fit=crop,q=100/cdn-ecommerce/store_01JCYZKF09EKDA2HS3ZXYAX2G1%2Fassets%2F1734717017311-store_01JCYZKF09EKDA2HS3ZXYAX2G1_assets_1734642265270-1701178669199-3d201d.webp",
//         Brand: "EcoCleaners",
//         price: 1200,
//         discountedPrice: 1000,
//         discountPersent: 16,
//         serviceDetails: [
//             "Dry vacuuming",
//             "Shampoo cleaning",
//             "Stain treatment"
//         ]
//     },
//     {
//         id: '7',
//         title: "AC Repair and Maintenance",
//         description: "Keep your air conditioner in top condition with our maintenance service.",
//         imageUrl: "https://cdn.zyrosite.com/cdn-cgi/image/format=auto,w=574,h=322,fit=crop,q=100/cdn-ecommerce/store_01JCYZKF09EKDA2HS3ZXYAX2G1%2Fassets%2F1734718024640-store_01JCYZKF09EKDA2HS3ZXYAX2G1_assets_1733054866369-GettyImages-1407823157-1-e1671659346455.webp",
//         Brand: "CoolCare",
//         price: 2500,
//         discountedPrice: 2000,
//         discountPersent: 20,
//         serviceDetails: [
//             "Gas refilling",
//             "Compressor repair",
//             "Filter cleaning"
//         ]
//     },
//     {
//         id: '8',
//         title: "Home Security System Installation",
//         description: "Secure your home with the latest surveillance and security systems.",
//         imageUrl: "https://cdn.zyrosite.com/cdn-cgi/image/format=auto,w=574,h=322,fit=crop,q=100/cdn-ecommerce/store_01JCYZKF09EKDA2HS3ZXYAX2G1%2Fassets%2F1734719510714-Washing-machine-repair-costs-explained-Featured-image-scaled1.webp",
//         Brand: "SecureHome",
//         price: 15000,
//         discountedPrice: 13500,
//         discountPersent: 10,
//         serviceDetails: [
//             "Camera installation",
//             "Motion sensor setup",
//             "Mobile app integration"
//         ]
//     }

// ];


export interface Service {
    id: string;
    title: string;
    description: string;
    image: string;
    longDescription: string;
}

export const services: Service[] = [
    {
        id: '1',
        title: 'House Cleaning',
        description: 'Professional house cleaning services for your home',
        image: '/images/cleaning.jpg',
        longDescription: 'Our professional house cleaning service provides thorough cleaning of all rooms, including dusting, vacuuming, mopping, and sanitizing surfaces...'
    },
    {
        id: '2',
        title: 'Plumbing',
        description: 'Expert plumbing services for all your needs',
        image: '/images/plumbing.jpg',
        longDescription: 'Our licensed plumbers can handle any plumbing issue, from repairs to installations...'
    },
    {
        id: '3',
        title: 'Electrical',
        description: 'Reliable electrical services for your home',
        image: '/images/electrical.jpg',
        longDescription: 'Our certified electricians provide comprehensive electrical services...'
    },
    // Add more services as needed
];


