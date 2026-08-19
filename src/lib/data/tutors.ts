export interface Tutor {
  id: string;
  name: string;
  slug: string;
  photo: string;
  photoAlt: string;
  subjects: string[];
  classes: string[];
  boards: string[];
  experience: number; // years
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
  locations: ['Noida Sector 44','Noida Sector 45','Noida Sector 49','Noida Sector 50','Noida Sector 99','Noida Sector 62'],
  teachingMode: ['home',],
  verified: true,
  rating: 5,
  reviewCount: 3,
  bio: 'I have been teaching Mathematics and Science for over 15 years. My approach focuses on building strong conceptual foundations rather than rote learning. I work with students of Class 9th and 10th and have helped many students improve their board exam scores significantly.',
  availability: 'Weekdays 3pm–8pm, Weekends 9am–6pm',
  gender: 'Male',
  languages: ['English', 'Hindi']
},
{
  id: 'tutor-002',
  name: 'Priyanshu Singh',
  slug: 'Priyanshu - Singh',
  photo: "https://img.rocket.new/generatedImages/rocket_gen_img_13907f863-1772137966294.png",
  photoAlt: 'Priyanshu-Singh',
  subjects: ['Physics', 'Chemistry', 'Mathematics', 'Science',],
  classes: ['Class 9', 'Class 10','Class 11', 'Class 12', 'IIT-JEE'],
  boards: ['CBSE', 'ICSE','NIOS'],
  experience: 5,
  qualifications: ['Graduation from IIT Patna', 'Certified from Harvard University'],
  locations: ['ONLINE'],
  teachingMode: ['Online'],
  verified: true,
  rating: 5,
  reviewCount: 52,
  bio: 'IIT Ptna graduate with 5+ years of teaching experience in Physics, Chemistry and Mathematics for Class 11-12 and IIT-JEE preparation. I focus on problem-solving techniques and exam strategy.',
  availability: 'Weekdays 6pm–10pm, Weekends : 10am–6pm',
  gender: 'male',
  languages: ['English', 'Hindi']
},
{
  id: 'tutor-003',
  name: 'Anjali Gupta',
  slug: 'anjali-gupta',
  photo: "https://img.rocket.new/generatedImages/rocket_gen_img_1e7575f93-1765298093270.png",
  photoAlt: 'Anjali Gupta, English and Hindi tutor for primary and middle school in Gurgaon',
  subjects: ['English', 'Hindi', 'Social Science'],
  classes: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8'],
  boards: ['CBSE', 'ICSE'],
  experience: 5,
  qualifications: ['M.A. English Literature (JNU)', 'B.Ed.'],
  locations: ['Gurgaon Sector 56', 'DLF Phase 2', 'Sohna Road'],
  teachingMode: ['home', 'online'],
  verified: true,
  rating: 4.7,
  reviewCount: 28,
  bio: 'I specialize in English and Hindi for primary and middle school students. My teaching style is interactive and encourages reading, writing and communication skills. I have a particular focus on making language learning enjoyable.',
  availability: 'Weekdays 2pm–7pm, Weekends flexible',
  gender: 'female',
  languages: ['English', 'Hindi']
},
{
  id: 'tutor-004',
  name: 'Amit Khanna',
  slug: 'amit-khanna',
  photo: "https://img.rocket.new/generatedImages/rocket_gen_img_1a3f615c6-1786689318155.png",
  photoAlt: 'Amit Khanna, Biology and Chemistry tutor for NEET preparation in Delhi NCR',
  subjects: ['Biology', 'Chemistry'],
  classes: ['Class 11', 'Class 12'],
  boards: ['CBSE', 'NEET'],
  experience: 7,
  qualifications: ['M.Sc. Biochemistry (Delhi University)', 'B.Ed.'],
  locations: ['East Delhi', 'Mayur Vihar', 'Noida Sector 18'],
  teachingMode: ['home', 'online'],
  verified: true,
  rating: 4.8,
  reviewCount: 41,
  bio: 'I have been preparing students for NEET and board exams for 7 years. My teaching focuses on deep understanding of biological concepts and systematic approach to Chemistry. Several of my students have cleared NEET with good scores.',
  availability: 'Weekdays 5pm–9pm, Weekends 9am–5pm',
  gender: 'male',
  languages: ['English', 'Hindi']
},
{
  id: 'tutor-005',
  name: 'Neha Agarwal',
  slug: 'neha-agarwal',
  photo: "https://img.rocket.new/generatedImages/rocket_gen_img_1f1e521a4-1763301826296.png",
  photoAlt: 'Neha Agarwal, Mathematics tutor for primary and middle school in Ghaziabad',
  subjects: ['Mathematics', 'EVS', 'Science'],
  classes: ['Nursery', 'LKG', 'UKG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
  boards: ['CBSE', 'ICSE'],
  experience: 4,
  qualifications: ['B.Sc. Mathematics', 'B.Ed.', 'Montessori Certification'],
  locations: ['Indirapuram', 'Vaishali', 'Kaushambi'],
  teachingMode: ['home', 'online'],
  verified: true,
  rating: 4.9,
  reviewCount: 22,
  bio: 'I specialize in early childhood education and primary school tutoring. With Montessori training and 4 years of experience, I make learning fun and engaging for young children. I focus on building strong foundational skills in Maths and English.',
  availability: 'Weekdays 9am–1pm and 4pm–7pm',
  gender: 'female',
  languages: ['English', 'Hindi']
},
{
  id: 'tutor-006',
  name: 'Vikram Singh',
  slug: 'vikram-singh',
  photo: "https://img.rocket.new/generatedImages/rocket_gen_img_1d46202c3-1786689317765.png",
  photoAlt: 'Vikram Singh, Computer Science and Mathematics tutor in Noida',
  subjects: ['Computer Science', 'Mathematics', 'Physics'],
  classes: ['Class 9', 'Class 10', 'Class 11', 'Class 12'],
  boards: ['CBSE'],
  experience: 5,
  qualifications: ['B.Tech. Computer Science (GGSIPU)', 'MCA'],
  locations: ['Noida Sector 76', 'Noida Sector 100', 'Greater Noida'],
  teachingMode: ['home', 'online'],
  verified: true,
  rating: 4.7,
  reviewCount: 19,
  bio: 'Software professional turned educator with 5 years of teaching experience. I teach Computer Science, Mathematics and Physics for Class 9-12. My practical industry experience helps students understand real-world applications of what they learn.',
  availability: 'Weekdays 6pm–9pm, Weekends 10am–6pm',
  gender: 'male',
  languages: ['English', 'Hindi']
}];


export function getTutorBySlug(slug: string): Tutor | undefined {
  return tutors.find((t) => t.slug === slug);
}

export function getTutorsBySubject(subject: string): Tutor[] {
  return tutors.filter((t) => t.subjects.includes(subject));
}

export function getTutorsByLocation(location: string): Tutor[] {
  return tutors.filter((t) =>
  t.locations.some((l) => l.toLowerCase().includes(location.toLowerCase()))
  );
}
