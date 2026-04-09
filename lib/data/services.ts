export interface Service {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  features: string[];
  image_url: string;
}

export const SERVICES: Service[] = [
  {
    slug: 'sneakers',
    name: 'Sneakers',
    shortName: 'Sneakers',
    tagline: 'Brand new kicks at unbeatable prices',
    description: 'Jordan, Nike, Adidas, New Balance, Yeezy — always authentic, always below retail. We source the hottest releases and bring them directly to Lancaster, PA with free pickup or local delivery.',
    features: [
      'Always brand new / deadstock',
      'Below retail pricing',
      'Jordan, Nike, Adidas, Yeezy, New Balance',
      'Every pair verified authentic',
      'Free local pickup or delivery',
    ],
    image_url: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&h=600&fit=crop',
  },
  {
    slug: 'electronics',
    name: 'Electronics & Devices',
    shortName: 'Electronics',
    tagline: 'Premium tech at better prices',
    description: 'From gaming consoles to headphones, we source brand new electronics at prices you won\'t find elsewhere. All items are verified authentic and brand new.',
    features: [
      'Gaming consoles & accessories',
      'Headphones & speakers',
      'Smart devices & wearables',
      'Brand new, sealed in box',
      'Free local pickup or delivery',
    ],
    image_url: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=600&fit=crop',
  },
  {
    slug: 'phones',
    name: 'Cell Phones & Accessories',
    shortName: 'Phones',
    tagline: 'Phones and accessories for less',
    description: 'New and certified pre-owned phones plus cases, chargers, and accessories. We carry the latest models at competitive prices.',
    features: [
      'Latest smartphones',
      'Cases & screen protectors',
      'Chargers & cables',
      'Certified pre-owned options',
      'Free local pickup or delivery',
    ],
    image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop',
  },
  {
    slug: 'apparel',
    name: 'Apparel & Streetwear',
    shortName: 'Apparel',
    tagline: 'Streetwear that hits different',
    description: 'Curated streetwear and apparel from top brands. From graphic tees to premium outerwear, we keep the style fresh and the prices right.',
    features: [
      'Premium streetwear brands',
      'Graphic tees & hoodies',
      'Hats & accessories',
      'Always authentic',
      'Free local pickup or delivery',
    ],
    image_url: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&h=600&fit=crop',
  },
  {
    slug: 'laundry',
    name: 'Laundry Essentials',
    shortName: 'Laundry',
    tagline: 'Everyday essentials at wholesale prices',
    description: 'Stock up on premium laundry products at prices well below the store. Detergent, fabric softener, dryer sheets — bulk and single available.',
    features: [
      'Premium brands for less',
      'Bulk and single options',
      'Detergent, softener, dryer sheets',
      'Household cleaning products',
      'Free local pickup or delivery',
    ],
    image_url: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=600&fit=crop',
  },
  {
    slug: 'personal-orders',
    name: 'Personal Orders',
    shortName: 'Personal Orders',
    tagline: 'Can\'t find it? We\'ll get it',
    description: 'Looking for something specific? Tell us what you need and we\'ll source it for you at the best price. No upfront cost — you only pay when we deliver.',
    features: [
      'Custom sourcing requests',
      'No upfront cost',
      'Best price guarantee',
      'Any product, any brand',
      'Free local pickup or delivery',
    ],
    image_url: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&h=600&fit=crop',
  },
];
