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
  unverified: boolean;
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
    photo: "/assets/images/dheerajsharma.png",
    photoAlt: 'Dheeraj Sharma',
    subjects: ['Mathematics', 'Science', 'Physics', 'Chemistry', 'Biology'],
    classes: ['Class 9', 'Class 10'],
    boards: ['CBSE', 'State Board'],
    experience: 15,
    qualifications: ['M.Sc. Mathematics (CCS University)', 'B.Ed.'],
    locations:['Noida Sector 44', 'Noida Sector 45','Noida Sector 49','Noida Sector 50', 'Noida Sector 99', 'Noida Sector 62', ],
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
    name: 'Rupesh Jha',
    slug: 'Rupesh Jha',
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_1e7575f93-1765298093270.png",
    photoAlt: 'Rupesh-Jha',
    subjects: ['Maths','Science','Social Science','English',
    ],
    classes: ['Class 8', 'Class 9', 'Class 10','Class 11','Class 12','BBA','BCA',],
    boards: ['CBSE', 'ICSE',],
    experience: 17,
    qualifications: ['B.Tech in Electrical & Electronics'],
    locations: [
      'Nangloi',
      'Mundka',
      'Punjabi Bagh',
      'Rajouri Garden',
      'Ramesh Nagar',
      'Modi Nagar',
      'Kirti Nagar',
    ],
    teachingMode: ['home', 'online'],
    verified: true,
    rating: 5,
    reviewCount: 2,
    bio: '',
    availability: 'Weekdays 3pm–9pm, Weekends flexible',
    gender: 'Male',
    languages: ['English', 'Hindi']
  },
  {
    id: 'tutor-004',
    name: 'Jyoti Puri',
    slug: 'Jyoti Puri',
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_1e7575f93-1765298093270.png",
    photoAlt: 'Jyoti-Puri',
    subjects: [
      'All Subjects',
      'English',
      'Hindi',
      'Maths',
      'Science',
      'Social Science',
    ],
    classes: ['Class 1st - 8th', 'Class 9', 'Class 10'],
    boards: ['CBSE', 'ICSE','State Board',],
    experience: 5,
    qualifications: ['B.Tech in Electronics & Communication Engineering'],
    locations: [
      'Noida Sector 20',
      'Noida Sector 15',
      'Noida Sector 16',
      'Noida Sector 2',
      'Noida Sector 45',
      'Noida Sector 44',
    ],
    teachingMode: ['home', 'online'],
    verified: true,
    rating: 5,
    reviewCount: 7,
    bio: 'I specialize in teaching All Subjects for primary, middle and secondary school students. Commited to mentoring students not just for academic excellence, but to become lifelong learners and problem solvers',
    availability: 'Weekdays 3pm–9pm, Weekends flexible',
    gender: 'female',
    languages: ['English', 'Hindi']
  },
  {
    id: 'tutor-005',
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
  },

   {
    id: 'tutor-006',
    name: 'Rajeev Kumar',
    slug: 'Rajeev Kumar',
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_1e7575f93-1765298093270.png",
    photoAlt: 'Rajeev-kumar',
    subjects: ['All Subjects','Maths','Science','Social Science','English',],
    classes: ['Class 4','Class 5','Class 6','Class 7','Class 8', 'Class 9', 'Class 10','Class 11','Class 12',],
    boards: ['CBSE', 'ICSE',],
    experience: 10,
    qualifications: ['B.Tech in Electronics & Communication Engineering'],
    locations: [
     'Noida Sector 104',
      'Noida Sector 99',
      'Noida Sector 46',
      'Noida Sector 18',
      'Noida Sector 45',
      'Noida Sector 44',
      'Bhangel',
    ],
    teachingMode: ['home', 'online'],
    verified: true,
    rating: 5,
    reviewCount: 4,
    bio: '',
    availability: 'Weekdays 3pm–9pm, Weekends flexible',
    gender: 'Male',
    languages: ['English', 'Hindi']
  },

   {
    id: 'tutor-007',
    name: 'Basundhara Das',
    slug: 'Basundhara Das',
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_1e7575f93-1765298093270.png",
    photoAlt: 'Basundhara Das',
    subjects: ['All Subjects','Maths','Science','Social Science','English','Biology','Computer'],
    classes: ['Class 4','Class 5','Class 6','Class 7','Class 8', 'Class 9', 'Class 10','Class 11','Class 12',],
    boards: ['CBSE', 'ICSE',],
    experience: 10,
    qualifications: ['P.hd in cancer biology','M.Sc in Applied Microbiology','Bachelors in',],
    locations: [
     'Noida Sector 29',
      'Noida Sector 128',
      'Noida Sector 50',
      'Noida Sector 104',
      'Noida Sector 25',
      'Noida Sector 94',
      'Noida Sector 53',
      'Noida Sector 46',
    ],
    teachingMode: ['home', 'online'],
    verified: true,
    rating: 5,
    reviewCount: 8,
    bio: '',
    availability: 'Weekdays 3pm–9pm, Weekends flexible',
    gender: 'Female',
    languages: ['English', 'Hindi']
  },

   {
    id: 'tutor-008',
    name: 'Naveen Bhatnagar',
    slug: 'Naveen Bhatnagar',
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_1e7575f93-1765298093270.png",
    photoAlt: 'Naveen Bhatnagar',
    subjects: ['Maths','Science','Social Science','English','Accounts','Legal Studies','Economics','Business Studies',],
    classes: ['Class 6','Class 7','Class 8', 'Class 9', 'Class 10','Class 11','Class 12',],
    boards: ['CBSE', 'ICSE',],
    experience: 15,
    qualifications: ['M.Com','MBA','LLB',],
    locations: [
      'Maya Puri',
      'Dwarka Sector 2',
    ],
    teachingMode: ['home', 'online'],
    unverified: true,
    rating: 5,
    reviewCount: 2,
    bio: '',
    availability: 'Weekdays 3pm–9pm, Weekends flexible',
    gender: 'Male',
    languages: ['English', 'Hindi']
  },
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
