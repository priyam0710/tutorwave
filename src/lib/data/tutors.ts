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
    slug: 'dheeraj-sharma',
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
    slug: 'priyanshu-singh',
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
    bio: 'IIT Patna graduate with 5+ years of teaching experience in Physics, Chemistry and Mathematics for Class 11-12 and IIT-JEE preparation. I focus on problem-solving techniques and exam strategy',
    availability: 'Weekdays 6pm–10pm, Weekends 10am–6pm',
    gender: 'male',
    languages: ['English', 'Hindi']
  },
 {
    id: 'tutor-003',
    name: 'Rupesh Jha',
    slug: 'rupesh-jha',
    photo: "/assets/images/rupeshjha.png",
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
    teachingMode: ['home',],
    verified: true,
    rating: 5,
    reviewCount: 2,
    bio: 'With 17 years of teaching experience, I help students from Class 8 through Class 12 (and BBA/BCA learners too) build strong fundamentals in Maths, Science, Social Science and English. My engineering background helps me connect abstract concepts to real-world examples, which makes difficult topics much easier to grasp. I offer home tuitions across West Delhi.',
        availability: 'Weekdays 6pm–10pm, Weekends 10am–6pm',
    gender: 'male',
    languages: ['English', 'Hindi']
  },
  {
    id: 'tutor-012',
   name: 'Jyoti Puri',
    slug: 'Jyoti-puri',
    photo: "/assets/images/jyotipuri.png",
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
    photo: "/assets/images/ilmakhan.png",
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
    slug: 'rajeev-kumar',
    photo: "/assets/images/rajeevkumar.png",
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
    bio: 'With 10 years of teaching experience and a background in Electronics & Communication Engineering, I teach all major subjects to students from Class 4 through Class 12. I focus on building strong fundamentals and exam confidence, with both home and online sessions available across Noida.',
    availability: 'Weekdays 3pm–9pm, Weekends flexible',
    gender: 'Male',
    languages: ['English', 'Hindi']
  },

   {
    id: 'tutor-007',
    name: 'Basundhara Das',
    slug: 'basundhara-das',
    photo:"/assets/images/basundharadas.png",
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
    bio: 'I hold a Ph.D. in Cancer Biology and an M.Sc. in Applied Microbiology, and I bring 10 years of teaching experience to students from Class 4 through Class 12. Alongside core subjects, I have a particular strength in Biology and Computer, and I offer both home and online classes across Noida.',
    availability: 'Weekdays 3pm–9pm, Weekends flexible',
    gender: 'Female',
    languages: ['English', 'Hindi']
  },

   {
    id: 'tutor-008',
    name: 'Naveen Bhatnagar',
    slug: 'naveen-bhatnagar',
    photo: "/assets/images/naveenbhatnagar.png",
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
    verified: false,
    rating: 5,
    reviewCount: 2,
    bio: 'With 15 years of teaching experience and a professional background spanning M.Com, MBA and LLB, I teach Commerce-oriented subjects including Accountancy, Economics and Business Studies alongside core subjects for Class 6 through Class 12. I offer both home and online sessions across West Delhi.',
    availability: 'Weekdays 3pm–9pm, Weekends flexible',
    gender: 'Male',
    languages: ['English', 'Hindi']
  },
  {
    id: 'tutor-009',
    name: 'Shikha Singh',
    slug: 'shikha-singh',
    photo: "/assets/images/shikhasingh.png",
    photoAlt: 'Shikha Singh',
    subjects: ['All Subjects','Maths','Science','Social Science','English','Biology','Computer'],
    classes: ['Class KG To 5th','Class 6','Class 7','Class 8',],
    boards: ['CBSE', 'ICSE',],
    experience: 3,
    qualifications: ['B.Ed','M.Sc (Botany)','B.Sc(Chemistry,Zoology,Botany)',],
    locations: [
     'Noida Sector 48',
      'Noida Sector 50',
      'Noida Sector 47',
      'Noida Sector 45',
      'Noida Sector 49',
      'Noida Sector 44',
      'Noida Sector 46',
    ],
    teachingMode: ['home', 'online'],
    verified: true,
    rating: 4.9,
    reviewCount: 3,
    bio: 'I am a B.Ed and M.Sc (Botany) graduate with a strong science background, specialising in teaching young learners from KG through Class 8. I focus on building curiosity and confidence in Maths, Science and English through interactive, age-appropriate teaching methods, with both home and online classes available across Noida.',
    availability: 'Weekdays 3pm–9pm, Weekends flexible',
    gender: 'Female',
    languages: ['English', 'Hindi']
  },
  {
    id: 'tutor-010',
    name: 'Priyanshu Tiwari',
    slug: 'priyanshu-tiwari',
    photo: "/assets/images/priyanshutiwari.png",
    photoAlt: 'Priyanshu-Tiwari',
    subjects: ['Maths','Science','Social Science','English','Physics','Chemistry','Biology',],
    classes: ['Class 4','Class 5','Class 6','Class 7','Class 8', 'Class 9', 'Class 10','Class 11','Class 12',],
    boards: ['CBSE', 'ICSE',],
    experience: 4,
    qualifications: ['B.Tech in Computer Science Engineering',],
    locations: [
     'Noida Sector 49',
      'Noida Sector 50',
      'Noida Sector 46',
      'Noida Sector 168',
      'Noida Sector 78',
      'Noida Sector 30',
      'Noida Sector 31',
      'Gaur City',
      'Surajpur',
      'Bhangel',
    ],
    teachingMode: ['home',],
    verified: true,
    rating: 5,
    reviewCount: 8,
    bio: 'As a Computer Science Engineering graduate, I bring a structured, logic-first approach to teaching Maths, Science and allied subjects for Class 4 through Class 12. I focus on step-by-step problem solving and regular practice to help students build genuine confidence ahead of their exams. I currently teach home tuitions across Noida and Greater Noida West.',
    availability: 'Weekdays 3pm–9pm, Weekends flexible',
    gender: 'Male',
    languages: ['English', 'Hindi']
  },

  {
    id: 'tutor-011',
    name: 'Adarsh Chaudhary',
    slug: 'adarsh-chaudhary',
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_1e7575f93-1765298093270.png",
    photoAlt: 'Adarsh-Chaudhary',
    subjects: ['All Subjects','Maths','Science','Social Science','English','Physics','Chemistry','Biology',],
    classes: ['Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8', 'Class 9', 'Class 10',],
    boards: ['CBSE', 'ICSE',],
    experience: 4,
    qualifications: ['B.A. in History, Political Science & English',],
    locations: [
     'Ranjeet Nagar',
      'Karol Bagh',
      'Patel Nagar',
      'Rajendra Place',
      'Shadipur',
    ],
    teachingMode: ['home',],
    verified: true,
    rating: 5,
    reviewCount: 2,
    bio: 'I hold a B.A. in History, Political Science and English, and I teach all major subjects for Class 1 through Class 10. I enjoy working with younger students, focusing on building strong reading, writing and reasoning skills alongside core subject knowledge. I offer home tuitions across Central and West Delhi.',
    availability: 'Weekdays 4pm–9pm, Weekends flexible',
    gender: 'Male',
    languages: ['English', 'Hindi']
  },

   {
    id: 'tutor-012',
    name: 'Suraj Gupta',
    slug: 'suraj-gupta',
    photo: "/assets/images/surajgupta.png",
    photoAlt: 'Suraj-Gupta',
    subjects: ['All Subjects','Maths','Science','Social Science','English','Economics','Business Studies',],
    classes: ['Class 4','Class 5','Class 6','Class 7','Class 8', 'Class 9', 'Class 10','Class 11','Class 12'],
    boards: ['CBSE', 'ICSE','NIOS',],
    experience: 4,
    qualifications: [ 'Bachelor of Business Administration in Financial Investment Analysis',],
    locations: [
     'Noida Sector 44',
      'Noida Sector 43',
      'Noida Sector 45',
      'Noida Sector 2',
      'Noida Sector 3',
      'Noida Sector 4',
      'Noida Sector 6',
      'Noida Sector 8',
      'Noida Sector 11',
      'Noida Sector 12',
      'Noida Sector 22',],
    teachingMode: ['home','online',],
    verified: true,
    rating: 5,
    reviewCount: 10,
    bio: 'I teach all major subjects for Class 4 to Class 10. I enjoy working with younger students, focusing on building strong reading, writing and reasoning skills alongside core subject knowledge. I offer home tuitions and online classes both.',
    availability: 'Weekdays 4pm–6pm, Weekends flexible',
    gender: 'Male',
    languages: ['English', 'Hindi']
  },
   {
    id: 'tutor-013',
    name: 'Simran Sharma',
    slug: 'Simran-Sharma',
    photo: "/assets/images/simransharma.png",
    photoAlt: 'Simran-Sharma',
    subjects: ['All Subjects','Maths','Science','Social Science','English','Computer','EVS',],
    classes: ['Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8', 'Class 9', 'Class 10',],
    boards: ['CBSE', 'Cambridge',],
    experience: 7,
    qualifications: [ 'B.Ed & CTET Qualified',],
    locations: [
     'Noida Extension',
      'Greater Noida',
      'Tech Zone 4',
      'Gaur City',],
    teachingMode: ['home','online',],
    verified: true,
    rating: 5,
    reviewCount: 2,
    bio: 'I teach all major subjects for Class 1 to Class 10. I enjoy working with younger students, focusing on building strong reading, writing and reasoning skills alongside core subject knowledge. I offer home tuitions and online classes both.',
    availability: 'Weekdays 4pm–6pm, Weekends flexible',
    gender: 'Female',
    languages: ['English', 'Hindi']
  },
  {
    id: 'tutor-014',
   name: 'Jyoti',
    slug: 'Jyoti',
    photo: "/assets/images/jyoti.png",
    photoAlt: 'Jyoti',
    subjects: [
      'All Subjects',
      'English',
      'Hindi',
      'Maths',
      'Science',
      'Social Science',
    ],
    classes: ['Class 1st - 8th',],
    boards: ['CBSE',],
    experience: 3,
    qualifications: ['B.Ed in Mathematics',],
    locations: [
      'Noida Sector 48',
      'Noida Sector 49',
      'Barola',
    ],
    teachingMode: ['home',],
    verified: true,
    rating: 5,
    reviewCount: 2,
    bio: 'I specialize in teaching All Subjects for primary and middle school students. Commited to mentoring students not just for academic excellence, but to become lifelong learners and problem solvers',
    availability: 'Weekdays 3pm–7pm, Weekends flexible',
    gender: 'female',
    languages: ['English', 'Hindi']
  },
    {
    id: 'tutor-015',
    name: 'Vishal',
    slug: 'vishal',
    photo: "/assets/images/vishal.png",
    photoAlt: 'vishal',
    subjects: ['All Subjects','Maths','Science','Social Science','English','Physics','Chemistry','Hindi',],
    classes: ['Class 4','Class 5','Class 6','Class 7','Class 8', 'Class 9', 'Class 10','Class 11','Class 12'],
    boards: ['CBSE', 'ICSE',],
    experience: 5,
    qualifications: [ 'M.Sc.(Hons.) in Mathematics',],
    locations: [
     'GTB Nagar',
      'Burari',
      'North Delhi',],
    teachingMode: ['home',],
    verified: true,
    rating: 5,
    reviewCount: 2,
    bio: 'I teach all major subjects for Class 4 to Class 10. I enjoy working with younger students, focusing on building strong reading, writing and reasoning skills alongside core subject knowledge. I offer home tuitions and online classes both.',
    availability: 'Weekdays 4pm–6pm, Weekends flexible',
    gender: 'Male',
    languages: ['English', 'Hindi']
  },

   {
    id: 'tutor-016',
    name: 'Ragini Kumari',
    slug: 'Ragini-Kumari',
    photo: "/assets/images/ragini.png",
    photoAlt: 'Ragini-Kumari',
    subjects: ['All Subjects','Maths','Science','Social Science','English','Computer','EVS',],
    classes: ['NUR-KG','Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7',],
    boards: ['CBSE', 'State Board',],
    experience: 5,
    qualifications: [ 'Bachelor of Arts (B.A.)',],
    locations: [
       'Noida Sector 35',
      'Noida Sector 48',
      'Noida Sector 49',
      'Barola',
      'Bhangel',],
    teachingMode: ['home',],
    verified: true,
    rating: 5,
    reviewCount: 3,
    bio: 'I teach all major subjects for Class 1 to Class 10. I enjoy working with younger students, focusing on building strong reading, writing and reasoning skills alongside core subject knowledge. I offer home tuitions and online classes both.',
    availability: 'Weekdays 3pm–7pm, Weekends flexible',
    gender: 'Female',
    languages: ['English', 'Hindi']
  },
   {
    id: 'tutor-017',
    name: 'Sumit Kumar',
    slug: 'sumit-kumar',
    photo: "/assets/images/sumitkumar.png",
    photoAlt: 'Sumit-Kumar',
    subjects: ['All Subjects','Maths','Science','Social Science','English','Physics','Hindi',],
    classes: ['Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8', 'Class 9', 'Class 10','Class 11','Class 12'],
    boards: ['CBSE', 'ICSE','NIOS',],
    experience: 3,
    qualifications: [ 'B.Tech in Computer Science Engineering',],
    locations: [
     'Noida Sector 45',
      'Noida Sector 43',
      'Noida Sector 44',
      'Sadarpur',
      'Chhalera',
      'Noida Sector 49',
      'Noida Sector 18',
      'Noida Sector 15',
      'Noida Sector 16',
      'Noida Sector 104',
      'Noida Sector 99',],
    teachingMode: ['home',],
    verified: true,
    rating: 5,
    reviewCount: 3,
    bio: 'I teach all major subjects for Class 4 to Class 10. I enjoy working with younger students, focusing on building strong reading, writing and reasoning skills alongside core subject knowledge. I offer home tuitions and online classes both.',
    availability: 'Weekdays 4pm–6pm, Weekends flexible',
    gender: 'Male',
    languages: ['English', 'Hindi']
  },
];

export function getTutorBySlug(slug: string): Tutor | undefined {
  const normalized = decodeURIComponent(slug).trim().toLowerCase();
  return tutors.find((t) => t.slug.toLowerCase() === normalized);
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
