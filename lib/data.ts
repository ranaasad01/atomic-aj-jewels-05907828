export const BRAND_NAME = "AJ Jewels";
export const BRAND_TAGLINE = "Handmade with love, one bracelet at a time";

export interface NavLink {
  label: string;
  href: string;
  key: string;
}

export const navLinks: NavLink[] = [
  { label: "Shop", href: "/", key: "shop" },
  { label: "Cart", href: "/cart", key: "cart" },
];

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  shortDesc: string;
  materials: string;
  careInstructions: string;
  care: string;
  isNew: boolean;
  category: string;
}

export const products: Product[] = [
  {
    id: "rainbow-beaded",
    name: "Rainbow Beaded Bracelet",
    price: 4.50,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=rainbow%20beaded",
    description: "Bright rainbow beads on stretchy cord. So fun to wear every day!",
    shortDesc: "Bright rainbow beads on stretchy cord. So fun to wear every day!",
    materials: "Colourful acrylic beads, stretchy elastic cord",
    careInstructions: "Keep away from water. Store in a dry place.",
    care: "Keep away from water. Store in a dry place.",
    isNew: false,
    category: "beaded",
  },
  {
    id: "golden-star-charm",
    name: "Golden Star Charm Bracelet",
    price: 5.00,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=gold%20bracelet",
    description: "Shiny gold beads with a little star charm in the middle. Super pretty! ⭐",
    shortDesc: "Shiny gold beads with a little star charm in the middle. Super pretty! ⭐",
    materials: "Gold-tone beads, metal star charm, stretchy cord",
    careInstructions: "Avoid water and perfume. Polish gently with a soft cloth.",
    care: "Avoid water and perfume. Polish gently with a soft cloth.",
    isNew: true,
    category: "charm",
  },
  {
    id: "pastel-friendship",
    name: "Pastel Friendship Bracelet",
    price: 3.50,
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/3f95171a0dfb49b29b71b4fc4a08a522.jpg",
    description: "Soft pink, lilac and mint threads woven together. Great to share with your bestie! 💜",
    shortDesc: "Soft pink, lilac and mint threads woven together. Great to share with your bestie! 💜",
    materials: "Cotton embroidery thread in pastel shades",
    careInstructions: "Hand wash gently if needed. Air dry flat.",
    care: "Hand wash gently if needed. Air dry flat.",
    isNew: false,
    category: "friendship",
  },
  {
    id: "ocean-wave",
    name: "Ocean Wave Bracelet",
    price: 4.00,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=blue",
    description: "Blue and white beads that look just like the sea. 🌊",
    shortDesc: "Blue and white beads that look just like the sea. 🌊",
    materials: "Blue and white acrylic beads, stretchy cord",
    careInstructions: "Keep away from water. Store in a dry place.",
    care: "Keep away from water. Store in a dry place.",
    isNew: false,
    category: "beaded",
  },
  {
    id: "strawberry-charm",
    name: "Strawberry Charm Bracelet",
    price: 5.50,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=charm%20bracelet",
    description: "Red and green beads with a tiny strawberry charm. So cute! 🍓",
    shortDesc: "Red and green beads with a tiny strawberry charm. So cute! 🍓",
    materials: "Red and green beads, metal strawberry charm, stretchy cord",
    careInstructions: "Avoid water and perfume. Store carefully.",
    care: "Avoid water and perfume. Store carefully.",
    isNew: true,
    category: "charm",
  },
  {
    id: "silver-sparkle",
    name: "Silver Sparkle Bracelet",
    price: 4.50,
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/08ea1d937c004129bbaa1b66db7c0bb0.jpg",
    description: "Clear sparkly beads that catch the light. Feels like wearing glitter! ✨",
    shortDesc: "Clear sparkly beads that catch the light. Feels like wearing glitter! ✨",
    materials: "Crystal-clear acrylic beads, silver-tone spacers, stretchy cord",
    careInstructions: "Keep away from water. Handle with care.",
    care: "Keep away from water. Handle with care.",
    isNew: false,
    category: "sparkly",
  },
  {
    id: "sunflower-bead",
    name: "Sunflower Bead Bracelet",
    price: 4.00,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=yellow",
    description: "Yellow and brown beads shaped into a sunflower pattern. Bright and happy! 🌻",
    shortDesc: "Yellow and brown beads shaped into a sunflower pattern. Bright and happy! 🌻",
    materials: "Yellow and brown acrylic beads, stretchy cord",
    careInstructions: "Keep away from water. Store in a dry place.",
    care: "Keep away from water. Store in a dry place.",
    isNew: false,
    category: "beaded",
  },
  {
    id: "heart-stack",
    name: "Heart Stack Bracelet",
    price: 6.00,
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/ccc5d8bfb2bc406cb47ce350138184ac.jpg",
    description: "Three thin bracelets with little heart beads. Wear them all together! 💕",
    shortDesc: "Three thin bracelets with little heart beads. Wear them all together! 💕",
    materials: "Heart-shaped beads in pink and red, stretchy cord (set of 3)",
    careInstructions: "Keep away from water. Store flat.",
    care: "Keep away from water. Store flat.",
    isNew: true,
    category: "sparkly",
  },
];

export interface CartItem {
  productId: string;
  quantity: number;
}
