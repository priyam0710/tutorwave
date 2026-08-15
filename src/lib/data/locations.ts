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
    areas: ['Sector 18', 'Sector 50', 'Sector 62', 'Sector 76', 'Sector 100', 'Sector 137', 'Sector 44', 'Sector 27', 'Sector 137', 'Sector 74', 'Sector 78', 'Sector 76', 'Sector 77', 'Sector 45', 'Sector 104', 'Sector 120', 'Sector 100', 'Sector 150', 'Sector 75', 'Sector 121', 'Sector 79', 'Sector 62', 'Noida-Greater Noida Expressway', 'Sector 73', 'Sector 123', 'Sector 110', 'Sector 44', 'Sector 50', 'Sector 46','Sector 143','Sector 16-B','Sector 93-A','Sector 168', 'Sector 107', 'Sector 135', 'Sector 134', 'Sector 93', 'Sector 37', 'Sector 118', 'Sector 128', 'Sector 71', 'Sector 19', 'Sector 119', 'Sector 51', 'Sector 61', 'Sector 22', 'Sector 16 B', 'Sector 49', 'Sector 12', 'Sector 11', 'Sector 82', 'Sector 70', 'Sector 99', 'Sector 47', 'Sector 34', 'Sector 52', 'Sector 122', 'Sector 72', 'Sector 39', 'Sector 26', 'Sector 29', 'Sector 1', 'Sector 88', 'Sector-129', 'Sector 15', 'Sector 117', 'Sector 41', 'Sector 108', 'Sector-30', 'Sector 31', 'Sector 48', 'Sector 151', 'Sector 105', 'Sector 20', 'Sector 25', 'Sector 36', 'Sector 143 B', 'Sector 27', 'Sector 55', 'Sector 131', 'Sector 21', 'Sector-63', 'Sector 2', 'Sector 68', 'Sector 133', 'Sector 28', 'Sector 132', 'Sector 33', 'Dadri Road', 'Sector 23', 'Sector-166', 'Sector 149', 'Sector 115', 'Sector 6', 'Sector 80', 'Sector 89', 'Sector 83', 'Sector 106', 'Sector 145', 'Sector 143 A', 'Sector 101', 'Sector 102', 'Noida-Greater Noida Link Rd', 'Sector 2', 'Sector 126', 'Sector 84', 'Sector 17', 'Sector 3', 'Sector 81', 'Sector 113', 'Sector 94', 'Sector 66', 'Sector 116', 'Sector 98', 'Sector 138', 'Sector 90', 'Sector 148', 'Sector 62 A', 'Sorkha', 'Sector 32', 'Sector 10', 'Sector 16 A', 'Sector 56', 'Sector 57', 'Sector 58', 'Sector 5', 'Sector 60', 'Sector 64', 'Sector 7', 'Sector 8', 'Sector 9', 'Sector-59', 'Sector 65', 'Sector 9', 'Sector 165', 'Sector 125', 'Sector 127', 'Sector 130', 'Sector 167', 'Sector 164', 'Sector 161', 'Sector 159', 'Sector 158', 'Sector 157', 'Sector 156', 'Sector 155', 'Sector', 'Sector 153', 'Sector 147', 'Sector 146', 'Sector 97', 'Sector 67', 'Sector 69', 'Sector 85', 'Sector 87', 'Sector 91', 'Sector 95', 'Sector-140', 'Sector-141', 'Sector 14 A', 'Sector 94 A', 'Sector 140 A', 'Sector 167 B'],
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
