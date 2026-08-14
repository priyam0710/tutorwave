export interface Location {
  id: string;
  name: string;
  slug: string;
  region: string;
  description: string;
  areas: string[];
  tutorCount: number;
  seoTitle: string;
  seoDescription: string;
}

export const locations: Location[] = [
  {
    id: 'loc-001',
    name: 'Noida',
    slug: 'noida',
    region: 'Uttar Pradesh',
    description: 'TutorWave connects parents and students across Noida with verified home tutors for all classes and subjects.',
    areas: ['Sector 18', 'Sector 50', 'Sector 62', 'Sector 76', 'Sector 100', 'Sector 137', 'Sector 44', 'Sector 27'],
    tutorCount: 0,
    seoTitle: 'Home Tutors in Noida — TutorWave',
    seoDescription: 'Find verified home tutors in Noida for all classes and subjects. CBSE, ICSE, IIT-JEE, NEET. Home and online classes available.',
  },
  {
    id: 'loc-002',
    name: 'Delhi',
    slug: 'delhi',
    region: 'Delhi',
    description: 'TutorWave connects parents and students across Delhi with verified home tutors for all classes and subjects.',
    areas: ['South Delhi', 'North Delhi', 'East Delhi', 'West Delhi', 'Dwarka', 'Rohini', 'Vasant Kunj', 'Saket', 'Lajpat Nagar', 'Greater Kailash'],
    tutorCount: 0,
    seoTitle: 'Home Tutors in Delhi — TutorWave',
    seoDescription: 'Find verified home tutors in Delhi for all classes and subjects. CBSE, ICSE, IIT-JEE, NEET. Home and online classes available.',
  },
  {
    id: 'loc-003',
    name: 'Greater Noida',
    slug: 'greater-noida',
    region: 'Uttar Pradesh',
    description: 'TutorWave connects parents and students across Greater Noida with verified home tutors for all classes and subjects.',
    areas: ['Greater Noida West', 'Knowledge Park', 'Omega', 'Pari Chowk', 'Sector Alpha', 'Sector Beta'],
    tutorCount: 0,
    seoTitle: 'Home Tutors in Greater Noida — TutorWave',
    seoDescription: 'Find verified home tutors in Greater Noida for all classes and subjects. CBSE, ICSE, IIT-JEE, NEET. Home and online classes available.',
  },
  {
    id: 'loc-004',
    name: 'Ghaziabad',
    slug: 'ghaziabad',
    region: 'Uttar Pradesh',
    description: 'TutorWave connects parents and students across Ghaziabad with verified home tutors for all classes and subjects.',
    areas: ['Indirapuram', 'Vaishali', 'Raj Nagar Extension', 'Kaushambi', 'Crossings Republik', 'Mohan Nagar'],
    tutorCount: 0,
    seoTitle: 'Home Tutors in Ghaziabad — TutorWave',
    seoDescription: 'Find verified home tutors in Ghaziabad for all classes and subjects. CBSE, ICSE, IIT-JEE, NEET. Home and online classes available.',
  },
  {
    id: 'loc-005',
    name: 'Gurugram',
    slug: 'gurugram',
    region: 'Haryana',
    description: 'TutorWave connects parents and students across Gurugram with verified home tutors for all classes and subjects.',
    areas: ['DLF Phase 1–5', 'Sohna Road', 'Golf Course Road', 'Sector 14', 'Sector 56', 'Palam Vihar', 'MG Road', 'Cyber City'],
    tutorCount: 0,
    seoTitle: 'Home Tutors in Gurugram — TutorWave',
    seoDescription: 'Find verified home tutors in Gurugram for all classes and subjects. CBSE, ICSE, IIT-JEE, NEET. Home and online classes available.',
  },
  {
    id: 'loc-006',
    name: 'Faridabad',
    slug: 'faridabad',
    region: 'Haryana',
    description: 'TutorWave connects parents and students across Faridabad with verified home tutors for all classes and subjects.',
    areas: ['Sector 15', 'Sector 21', 'NIT Faridabad', 'Old Faridabad', 'Ballabhgarh', 'Neharpar'],
    tutorCount: 0,
    seoTitle: 'Home Tutors in Faridabad — TutorWave',
    seoDescription: 'Find verified home tutors in Faridabad for all classes and subjects. CBSE, ICSE, IIT-JEE, NEET. Home and online classes available.',
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}
