import { FeatureCategory, Hotspot, MaterialItem, TeamMember } from './types';

export const CATEGORY_DATA: Record<FeatureCategory, {
  title: string;
  description: string;
  stats: { label: string; value: string }[];
  image: string;
}> = {
  'Sustainable Living': {
    title: 'Sustainable Living',
    description: 'Harmonizing human habitat with natural ecosystems through zero-waste architecture, circular water purification, and passive bio-climatic comfort.',
    stats: [
      { label: 'Carbon Reduction', value: '85%' },
      { label: 'Water Recycled', value: '92%' }
    ],
    image: '/src/assets/images/ecodream_interior_nook_1785606203661.jpg'
  },
  'Modern Architecture': {
    title: 'Modern Architecture',
    description: 'Aerodynamic modular carbon shells integrated seamlessly into untouched landscapes, maximizing ambient solar heating and panoramic sightlines.',
    stats: [
      { label: 'Structural Life', value: '100+ Yrs' },
      { label: 'Thermal Mass', value: 'A++' }
    ],
    image: '/src/assets/images/ecodream_interior_nook_1785606203661.jpg'
  },
  'Energy Efficiency': {
    title: 'Energy Efficiency',
    description: 'Our commitment to eco-friendly practices ensures that every home we create is both beautiful and environmentally responsible.',
    stats: [
      { label: 'Energy Surplus', value: '+40%' },
      { label: 'Solar Output', value: '24 kW' }
    ],
    image: '/src/assets/images/ecodream_interior_nook_1785606203661.jpg'
  }
};

export const HOUSE_HOTSPOTS: Hotspot[] = [
  {
    id: 'solar-roof',
    x: 52,
    y: 36,
    title: 'Photovoltaic Solar Canopy',
    tag: 'Renewable Power',
    description: 'Curved glass roof tiles embedded with transparent perovskite solar cells generating 24kW daily.',
    metric: '100% Net Zero Energy',
    iconName: 'Sun'
  },
  {
    id: 'living-lounge',
    x: 68,
    y: 56,
    title: 'Smart Ambient Lounge',
    tag: 'Living Area',
    description: 'Circadian lighting systems synced with natural solar cycles and automatic thermal air exchangers.',
    metric: 'Optimal Comfort 21°C',
    iconName: 'Zap'
  },
  {
    id: 'kitchen-hub',
    x: 82,
    y: 58,
    title: 'Zero-Emission Kitchen Hub',
    tag: 'Culinary Space',
    description: 'Induction eco-cooktop with integrated organic waste composter and greywater heat exchanger.',
    metric: 'Zero Waste Rated',
    iconName: 'Sprout'
  },
  {
    id: 'aero-deck',
    x: 32,
    y: 58,
    title: 'Cantilevered Viewing Deck',
    tag: 'Outdoor Transition',
    description: 'Constructed with carbon-infused cross-laminated timber, designed to withstand extreme desert winds.',
    metric: 'Wind Rated 180 mph',
    iconName: 'Wind'
  }
];

export const FEATURED_PROPERTIES = [
  {
    id: 'prop-1',
    title: 'Efficient Wardrobe Arrangements',
    category: 'Architecture',
    location: '654 Prevail Hills, San Francisco',
    price: '$2,850,000',
    beds: 4,
    baths: 3.5,
    sqft: 3800,
    rating: 4.9,
    image: '/src/assets/images/luxury_estate_card_1785609677319.jpg',
    description: 'Minimalist integrated storage and walk-in eco wardrobing with automated climate regulation.',
    tags: ['Smart Home', 'Net Zero']
  },
  {
    id: 'prop-2',
    title: 'Fresh and Inviting Indoor Space',
    category: 'Interior',
    location: '882 Vista Ocean Rim, Malibu',
    price: '$3,400,000',
    beds: 5,
    baths: 4,
    sqft: 4500,
    rating: 4.8,
    image: '/src/assets/images/luxury_villa_pool_1785609657531.jpg',
    description: 'Sweeping double-height floor-to-ceiling glass doors opening onto an infinity plunge pool.',
    tags: ['Pool', 'Ocean View']
  },
  {
    id: 'prop-3',
    title: 'Creating Bookish Sanctuaries',
    category: 'Library Nook',
    location: '120 Pines Canyon, Aspen',
    price: '$1,950,000',
    beds: 3,
    baths: 2.5,
    sqft: 2900,
    rating: 5.0,
    image: '/src/assets/images/luxury_lounge_interior_1785606574390.jpg',
    description: 'A quiet acoustic sanctuary featuring custom solid oak shelving and floor-standing reading lamps.',
    tags: ['Acoustic', 'Woodland']
  },
  {
    id: 'prop-4',
    title: 'The Art Kitchen & Dining',
    category: 'Culinary',
    location: '410 Solaria Dune, Sedona',
    price: '$2,200,000',
    beds: 4,
    baths: 3,
    sqft: 3200,
    rating: 4.9,
    image: '/src/assets/images/luxury_lamp_cabinet_1785606543325.jpg',
    description: 'Seamless waterfall quartz countertops, concealed induction hobs, and integrated hydroponic herbal garden.',
    tags: ['Hydroponic', 'Zero Waste']
  },
  {
    id: 'prop-5',
    title: 'Glass Reflection Forest Pavilion',
    category: 'Eco Estate',
    location: '77 Sky Rim, Pacific Palisades',
    price: '$4,150,000',
    beds: 5,
    baths: 5,
    sqft: 5200,
    rating: 5.0,
    image: '/src/assets/images/ecodream_hero_house_1785606186489.jpg',
    description: 'A cantilevered steel-and-glass glass monument embedded in ancient redwood groves.',
    tags: ['Solar Canopy', 'Zero Carbon']
  },
  {
    id: 'prop-6',
    title: 'Bio-Climatic Desert Sanctuary',
    category: 'Solar Villa',
    location: '908 Oasis Springs, Palm Springs',
    price: '$3,890,000',
    beds: 4,
    baths: 4.5,
    sqft: 4100,
    rating: 4.9,
    image: '/src/assets/images/ecodream_interior_nook_1785606203661.jpg',
    description: 'Passive earth-sheltered structure with geothermal cooling loops and automated bioclimatic louvers.',
    tags: ['Geothermal', 'Passive Cooling']
  }
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    name: 'John D.',
    role: 'UI/UX Designer & Eco Resident',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    quote: 'Thanks to EcoDream & NestQuest, I found my dream sustainable home in no time. The passive solar design keeps the temperature perfect year-round!',
    rating: 4.9,
    project: 'Dune Pavilion #04'
  },
  {
    id: 't-2',
    name: 'Jesse Hiss',
    role: 'Principal Architect',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    quote: 'I had an incredible experience selling my eco-property through this platform. The 3D tour, hotspots, and customer support team were world-class.',
    rating: 4.9,
    project: 'Aspen Timber Villa'
  },
  {
    id: 't-3',
    name: 'Emily R.',
    role: 'First-time Eco Homeowner',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    quote: 'As a first-time homebuyer interested in green energy, the loan process was transparent and stress-free. Highly recommended!',
    rating: 4.9,
    project: 'Prevail Hills Residence'
  },
  {
    id: 't-4',
    name: 'Sarah L.',
    role: 'Real Estate Investor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    quote: 'The best part about this platform is the comprehensive microgrid data. Securing a low-carbon asset was handled efficiently and smoothly.',
    rating: 5.0,
    project: 'Malibu Ocean Vista'
  }
];

export const PARTNER_LOGOS = [
  { name: 'Entigo Realty Builder', icon: 'Building' },
  { name: 'Home Properties', icon: 'Home' },
  { name: 'Better Homes & Eco', icon: 'Sun' },
  { name: 'Arden Design Studio', icon: 'Compass' },
  { name: 'Green Canopy Capital', icon: 'ShieldCheck' }
];

export const LOAN_OPTIONS = [
  {
    id: 'loan-1',
    title: 'Top-rated loan officers help',
    rate: '4.2% Fixed APY',
    description: 'With a 4.8-star average rating, our dedicated eco-loan officers provide step-by-step guidance and carbon-credit matching.',
    badge: '4.8 ★ Rated'
  },
  {
    id: 'loan-2',
    title: 'Competitive green rates',
    rate: '3.8% Eco Discount',
    description: 'Strong rates, zero hidden fees, and total transparency to keep you informed through every architectural milestone.',
    badge: 'Best Value'
  },
  {
    id: 'loan-3',
    title: 'Low down payment options',
    rate: 'From 5% Down',
    description: 'We offer a variety of tailored green loan options to meet your budget and bring sustainable luxury homeownership closer.',
    badge: 'Flexible'
  }
];


export const MATERIAL_ITEMS: MaterialItem[] = [
  {
    id: 'bamboo-timber',
    name: 'Engineered Bamboo & Cross-Laminated Oak',
    origin: 'Sustainably Managed Certified Forests',
    ecoRating: 'A+ Net Negative',
    carbonOffset: '-1.8 kg CO2 / kg',
    description: 'We use the highest quality, sustainable materials to ensure your home is built to last while minimizing environmental impact.',
    image: '/src/assets/images/ecodream_materials_wood_1785606217307.jpg'
  },
  {
    id: 'recycled-carbon',
    name: 'Recycled Carbon Aerogel Shell',
    origin: 'Upcycled Industrial Composites',
    ecoRating: 'A++ Thermal',
    carbonOffset: '-2.4 kg CO2 / kg',
    description: 'Ultra-lightweight vacuum insulation panels delivering R-60 thermal resistance with zero synthetic foam.',
    image: '/src/assets/images/ecodream_materials_wood_1785606217307.jpg'
  },
  {
    id: 'low-e-glass',
    name: 'Triple-Pane Low-E Solar Glass',
    origin: 'Zero-Carbon European Foundry',
    ecoRating: '99% UV Block',
    carbonOffset: '-0.9 kg CO2 / m²',
    description: 'Electrochromic smart glass that tints automatically to regulate indoor temperature without blocking natural views.',
    image: '/src/assets/images/ecodream_interior_nook_1785606203661.jpg'
  }
];

export const TEAM_SPECIALISTS: TeamMember[] = [
  {
    id: '1',
    name: 'Elena Rostova',
    role: 'Principal Eco-Architect',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    expertise: 'Passive Solar Design & Bio-Architecture'
  },
  {
    id: '2',
    name: 'Marcus Vance',
    role: 'Chief Sustainability Engineer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    expertise: 'Closed-Loop Energy & Microgrids'
  },
  {
    id: '3',
    name: 'Aria Chen',
    role: 'Biophilic Interior Specialist',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    expertise: 'Non-Toxic Renewable Materials'
  },
  {
    id: '4',
    name: 'Dr. Julian Thorne',
    role: 'Material Scientist',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    expertise: 'Carbon-Negative Biomaterials'
  }
];
