const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60",
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-118.7798, 34.0259],
    },
    category: "Beach",
  },
  {
    title: "Modern Loft in Downtown",
    description:
      "Stay in the heart of the city in this stylish loft apartment.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "New York City",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-74.006, 40.7128],
    },
    category: "Iconic cities",
  },
  {
    title: "Mountain Retreat",
    description:
      "Unplug and unwind in this peaceful mountain cabin surrounded by nature.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=800&q=60",
    },
    price: 1000,
    location: "Aspen",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-106.8175, 39.1911],
    },
    category: "Trending",
  },
  {
    title: "Historic Villa in Tuscany",
    description:
      "Experience the charm of Tuscany in this beautifully restored Italian villa.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Florence",
    country: "Italy",
    geometry: {
      type: "Point",
      coordinates: [11.2558, 43.7696],
    },
    category: "Castles",
  },
  {
    title: "Secluded Treehouse Getaway",
    description:
      "Live among the treetops in this unique retreat surrounded by greenery.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=800&q=60",
    },
    price: 800,
    location: "Portland",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-122.6784, 45.5152],
    },
    category: "Farms",
  },
  {
    title: "Beachfront Paradise",
    description:
      "Enjoy sandy beaches, ocean views, and ultimate relaxation in this tropical condo.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=60",
    },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    geometry: {
      type: "Point",
      coordinates: [-86.8515, 21.1619],
    },
    category: "Beach",
  },
  {
    title: "Rustic Cabin by the Lake",
    description:
      "Spend your days fishing, kayaking, and relaxing beside a beautiful lake.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=800&q=60",
    },
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-120.0324, 39.0968],
    },
    category: "Farms",
  },
  {
    title: "Luxury Penthouse with City Views",
    description:
      "Enjoy a luxurious penthouse with panoramic views of the city skyline.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=60",
    },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-118.2437, 34.0522],
    },
    category: "Trending",
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description:
      "Stay in a cozy alpine chalet with beautiful mountain views and ski access.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=60",
    },
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
    geometry: {
      type: "Point",
      coordinates: [7.2286, 46.0964],
    },
    category: "Arctic",
  },
  {
    title: "Safari Lodge in the Serengeti",
    description:
      "Experience African wildlife while staying in a comfortable safari lodge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=60",
    },
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
    geometry: {
      type: "Point",
      coordinates: [34.8333, -2.3333],
    },
    category: "Farms",
  },
  {
    title: "Historic Canal House",
    description:
      "Stay in a charming canal-side house in the heart of Amsterdam.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands",
    geometry: {
      type: "Point",
      coordinates: [4.9041, 52.3676],
    },
    category: "Iconic cities",
  },
  {
    title: "Private Island Retreat",
    description:
      "Enjoy an exclusive tropical escape surrounded by crystal-clear waters.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=60",
    },
    price: 10000,
    location: "Mamanuca Islands",
    country: "Fiji",
    geometry: {
      type: "Point",
      coordinates: [177.1, -17.67],
    },
    category: "Beach",
  },
  {
    title: "Glass House with Amazing Pool",
    description:
      "Relax in a modern glass house featuring a private pool and scenic surroundings.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=60",
    },
    price: 2800,
    location: "Palm Springs",
    country: "United States",
    geometry: {
      type: "Point",
      coordinates: [-116.5453, 33.8303],
    },
    category: "Amazing pools",
  },
  {
    title: "Charming Parisian Apartment",
    description:
      "Discover Paris from this elegant apartment near famous landmarks and cafes.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=60",
    },
    price: 2200,
    location: "Paris",
    country: "France",
    geometry: {
      type: "Point",
      coordinates: [2.3522, 48.8566],
    },
    category: "Rooms",
  },
  {
    title: "Snowy Cabin Under the Northern Lights",
    description:
      "Experience a peaceful winter escape surrounded by snowy forests and Arctic scenery.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=60",
    },
    price: 1700,
    location: "Tromso",
    country: "Norway",
    geometry: {
      type: "Point",
      coordinates: [18.9553, 69.6492],
    },
    category: "Arctic",
  },
];

module.exports = { data: sampleListings };
