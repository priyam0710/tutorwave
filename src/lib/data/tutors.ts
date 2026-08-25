export interface Tutor {
  id: string;
  name: string;
  slug: string;
  photo: string;
  photoAlt: string;
  subjects: string[];
  classes: string[];
  boards: string[];
  experience: number;
  qualifications: string[];
  locations: string[];
  teachingMode: ('home' | 'online' | 'both')[];
  verified: boolean;
  rating: number;
  reviewCount: number;
  bio: string;
  availability: string;
  gender: 'male' | 'female';
  languages: string[];
}

export const tutors: Tutor[] = [
  {
    id: 'tutor-001',
    name: 'Dheeraj Sharma',
    slug: 'Dheeraj-sharma',
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_13907f863-1772137966294.png",
    photoAlt: 'Dheeraj Sharma',
    subjects: ['Mathematics', 'Science', 'Physics', 'Chemistry', 'Biology'],
    classes: ['Class 9', 'Class 10'],
    boards: ['CBSE', 'State Board'],
    experience: 15,
    qualifications: ['M.Sc. Mathematics (CCS University)', 'B.Ed.'],
    locations: [
      'Noida Sector 44',
      'Noida Sector 45',
      'Noida Sector 49',
      'Noida Sector 50',
      'Noida Sector 99',
      'Noida Sector 62'
    ],
    teachingMode: ['home'],
    verified: true,
    rating: 5,
    reviewCount: 3,
    bio: 'I have been teaching Mathematics and Science for over 15 years. My approach focuses on building strong conceptual foundations rather than rote learning. I work with students of Class 9th and 10th and have helped many students improve their board exam scores significantly.',
    availability: 'Weekdays 3pm–8pm, Weekends 9am–6pm',
    gender: 'male',
    languages: ['English', 'Hindi']
  },

  {
    id: 'tutor-002',
    name: 'Priyanshu Singh',
    slug: 'Priyanshu-Singh',
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_13907f863-1772137966294.png",
    photoAlt: 'Priyanshu-Singh',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Science'],
    classes: ['Class 9', 'Class 10', 'Class 11', 'Class 12', 'IIT-JEE'],
    boards: ['CBSE', 'ICSE', 'NIOS'],
    experience: 5,
    qualifications: ['Graduation from IIT Patna', 'Certified from Harvard University'],
    locations: ['ONLINE'],
    teachingMode: ['online'],
    verified: true,
    rating: 5,
    reviewCount: 52,
    bio: 'IIT Patna graduate with 5+ years of teaching experience in Physics, Chemistry and Mathematics for Class 11-12 and IIT-JEE preparation. I focus on problem-solving techniques and exam strategy.',
    availability: 'Weekdays 6pm–10pm, Weekends 10am–6pm',
    gender: 'male',
    languages: ['English', 'Hindi']
  },

  {
    id: 'tutor-003',
    name: 'Ilma Khan',
    slug: 'ilma-khan',
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_1e7575f93-1765298093270.png",
    photoAlt: 'Ilma-khan',
    subjects: [
      'All Subjects',
      'English',
      'Hindi',
      'Maths',
      'Science',
      'Social Science',
      'Psychology',
      'Urdu'
    ],
    classes: ['Class NUR - 8th', 'Class 11', 'Class 12'],
    boards: ['CBSE', 'ICSE'],
    experience: 5,
    qualifications: ['B.Sc in Psychology(Hons.)'],
    locations: [
      'Malviya Nagar',
      'Tughlakabad',
      'Sangam Vihar',
      'Saket',
      'Mehrauli',
      'CR Park',
      'India Gate',
      'Sainik Farm'
    ],
    teachingMode: ['home', 'online'],
    verified: true,
    rating: 5,
    reviewCount: 20,
    bio: 'I specialize in teaching All Subjects for primary and middle school students. My teaching style is interactive and encourages reading, writing and communication skills. I have a particular focus on making language learning enjoyable.',
    availability: 'Weekdays 2pm–9pm, Weekends flexible',
    gender: 'female',
    languages: ['English', 'Hindi']
  }
];

export function getTutorBySlug(slug: string): Tutor | undefined {
  return tutors.find((t) => t.slug === slug);
}

export function getTutorsBySubject(subject: string): Tutor[] {
  return tutors.filter((t) => t.subjects.includes(subject));
}

export function getTutorsByLocation(location: string): Tutor[] {
  return tutors.filter((t) =>
    t.locations.some((l) =>
      l.toLowerCase().includes(location.toLowerCase())
    )
  );
}

// ============================================================
// FEATURED TUTORS
// Edit this list anytime to control which tutors appear
// on the homepage Featured Tutors section.
// ============================================================

export const featuredTutorIds = [
  'tutor-002', // Priyanshu Singh
  'tutor-001', // Dheeraj Sharma
  'tutor-003', // Ilma Khan
];

// Automatically get the full tutor data from the main tutors list
export const featuredTutors = featuredTutorIds
  .map((id) => tutors.find((tutor) => tutor.id === id))
  .filter((tutor): tutor is Tutor => tutor !== undefined);
