export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
export type CourseStatus = 'coming-soon' | 'available' | 'enrolled';
export type CourseCategory = 'School' | 'Competitive Exams' | 'Skills' | 'Technology' | 'Teacher Development';

export interface CourseModule {
  title: string;
  duration: string;
  description: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  thumbnailAlt: string;
  instructor: string;
  instructorTitle: string;
  category: CourseCategory;
  level: CourseLevel;
  duration: string;
  moduleCount: number;
  description: string;
  excerpt: string;
  modules: CourseModule[];
  price: number | null; // null = free, number = price in INR
  status: CourseStatus;
  tags: string[];
  // Slug page sections (populated later)
  whatYoullLearn?: string[];
  seoTitle: string;
  seoDescription: string;
}

export const courses: Course[] = [
{
  id: 'course-001',
  title: 'Mathematics Foundations — Class 9 & 10',
  slug: 'mathematics-foundations-class-9-10',
  thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_129d6f6d8-1773344544151.png",
  thumbnailAlt: 'Mathematics textbook and notebook on a desk for Class 9 and 10 students',
  instructor: 'TutorWave Faculty',
  instructorTitle: 'Mathematics Department',
  category: 'School',
  level: 'intermediate',
  duration: '40 hrs',
  moduleCount: 6,
  excerpt: 'Complete CBSE Mathematics for Class 9 & 10 — concepts, solved examples and practice problems.',
  description:
  'A structured micro-course covering the complete CBSE Mathematics syllabus for Class 9 and 10. Includes concept explanations, solved examples and practice problems.',
  modules: [
  { title: 'Number Systems & Polynomials', duration: '6 hrs', description: 'Real numbers, polynomials and their properties.' },
  { title: 'Coordinate Geometry & Linear Equations', duration: '8 hrs', description: 'Cartesian plane, linear equations in two variables.' },
  { title: 'Triangles & Quadrilaterals', duration: '8 hrs', description: 'Congruence, similarity and properties of quadrilaterals.' },
  { title: 'Circles & Constructions', duration: '6 hrs', description: 'Circle theorems and geometric constructions.' },
  { title: 'Mensuration & Statistics', duration: '6 hrs', description: 'Area, volume and basic statistics.' },
  { title: 'Probability & Revision', duration: '6 hrs', description: 'Probability concepts and full syllabus revision.' }],

  price: null,
  status: 'coming-soon',
  whatYoullLearn: [
  'Master CBSE Class 9 & 10 Mathematics syllabus',
  'Solve problems across all major topics',
  'Build strong conceptual foundations',
  'Prepare effectively for board examinations'],

  tags: ['Mathematics', 'Class 9', 'Class 10', 'CBSE'],
  seoTitle: 'Mathematics Foundations Class 9 & 10 — TutorWave Micro Course',
  seoDescription:
  'Structured Mathematics micro-course for Class 9 and 10 CBSE students. Covers complete syllabus with concept explanations and practice problems.'
},
{
  id: 'course-002',
  title: 'Physics Essentials — Class 11 & 12',
  slug: 'physics-essentials-class-11-12',
  thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_12d9ed076-1772768277443.png",
  thumbnailAlt: 'Physics equations and diagrams for Class 11 and 12 students',
  instructor: 'TutorWave Faculty',
  instructorTitle: 'Physics Department',
  category: 'School',
  level: 'advanced',
  duration: '50 hrs',
  moduleCount: 6,
  excerpt: 'Mechanics, thermodynamics, electromagnetism and modern physics with exam-focused problem solving.',
  description:
  'Comprehensive Physics micro-course for Class 11 and 12 CBSE students. Covers mechanics, thermodynamics, electromagnetism and modern physics with exam-focused problem solving.',
  modules: [
  { title: 'Mechanics & Motion', duration: '10 hrs', description: "Kinematics, Newton's laws, work and energy." },
  { title: 'Thermodynamics', duration: '8 hrs', description: 'Heat, temperature and laws of thermodynamics.' },
  { title: 'Waves & Oscillations', duration: '8 hrs', description: 'Simple harmonic motion, waves and sound.' },
  { title: 'Electrostatics & Current Electricity', duration: '10 hrs', description: 'Electric fields, potential and circuits.' },
  { title: 'Magnetism & Electromagnetic Induction', duration: '8 hrs', description: "Magnetic fields and Faraday's law." },
  { title: 'Modern Physics & Revision', duration: '6 hrs', description: 'Atoms, nuclei and exam preparation.' }],

  price: null,
  status: 'coming-soon',
  whatYoullLearn: [
  'Understand all major Physics concepts for Class 11 & 12',
  'Solve numerical problems with confidence',
  'Prepare for CBSE board and competitive exams',
  'Build strong foundations for engineering entrance tests'],

  tags: ['Physics', 'Class 11', 'Class 12', 'CBSE', 'IIT-JEE'],
  seoTitle: 'Physics Essentials Class 11 & 12 — TutorWave Micro Course',
  seoDescription:
  'Comprehensive Physics micro-course for Class 11 and 12 CBSE students. Covers complete syllabus with exam-focused problem solving.'
},
{
  id: 'course-003',
  title: 'English Communication & Writing',
  slug: 'english-communication-writing',
  thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_187f85c94-1772782290418.png",
  thumbnailAlt: 'Open book and pen on a desk for English writing course',
  instructor: 'TutorWave Faculty',
  instructorTitle: 'English Department',
  category: 'School',
  level: 'beginner',
  duration: '20 hrs',
  moduleCount: 4,
  excerpt: 'Improve grammar, comprehension and writing skills for Class 6–10 students.',
  description:
  'A practical English course focused on improving communication, grammar and writing skills for Class 6–10 students.',
  modules: [
  { title: 'Grammar Foundations', duration: '5 hrs', description: 'Parts of speech, tenses and sentence structure.' },
  { title: 'Reading Comprehension', duration: '4 hrs', description: 'Strategies for understanding and analysing texts.' },
  { title: 'Writing Skills', duration: '6 hrs', description: 'Essays, letters, reports and creative writing.' },
  { title: 'Spoken English Basics', duration: '5 hrs', description: 'Pronunciation, vocabulary and conversation.' }],

  price: null,
  status: 'coming-soon',
  whatYoullLearn: [
  'Master English grammar and sentence construction',
  'Write essays, letters and reports confidently',
  'Improve reading comprehension skills',
  'Build spoken English vocabulary and fluency'],

  tags: ['English', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'CBSE'],
  seoTitle: 'English Communication & Writing Course — TutorWave Micro Course',
  seoDescription:
  'Practical English micro-course for Class 6–10 students. Improve grammar, comprehension and writing skills.'
},
{
  id: 'course-004',
  title: 'JEE Mathematics Crash Course',
  slug: 'jee-mathematics-crash-course',
  thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1240c93c8-1772092106765.png",
  thumbnailAlt: 'Student solving JEE Mathematics problems at a study desk',
  instructor: 'TutorWave Faculty',
  instructorTitle: 'IIT-JEE Mathematics',
  category: 'Competitive Exams',
  level: 'advanced',
  duration: '60 hrs',
  moduleCount: 8,
  excerpt: 'Focused JEE Mathematics preparation covering calculus, algebra, coordinate geometry and more.',
  description:
  'An intensive crash course designed for JEE aspirants. Covers high-weightage topics with shortcut techniques, previous year questions and mock tests.',
  modules: [
  { title: 'Algebra & Complex Numbers', duration: '8 hrs', description: 'Quadratics, progressions and complex number theory.' },
  { title: 'Trigonometry', duration: '6 hrs', description: 'Identities, equations and inverse trigonometry.' },
  { title: 'Coordinate Geometry', duration: '8 hrs', description: 'Straight lines, circles, parabola and ellipse.' },
  { title: 'Differential Calculus', duration: '10 hrs', description: 'Limits, continuity, derivatives and applications.' },
  { title: 'Integral Calculus', duration: '10 hrs', description: 'Integration techniques and definite integrals.' },
  { title: 'Vectors & 3D Geometry', duration: '8 hrs', description: 'Vector algebra and three-dimensional geometry.' },
  { title: 'Probability & Statistics', duration: '6 hrs', description: 'Probability theory and statistical methods.' },
  { title: 'Previous Year Questions & Mock Tests', duration: '4 hrs', description: 'Timed practice with JEE-level problems.' }],

  price: 1499,
  status: 'coming-soon',
  whatYoullLearn: [
  'Master all high-weightage JEE Mathematics topics',
  'Apply shortcut techniques for faster problem solving',
  'Practise with previous year JEE questions',
  'Build exam temperament through timed mock tests'],

  tags: ['JEE', 'Mathematics', 'Class 12', 'IIT-JEE', 'Competitive Exams'],
  seoTitle: 'JEE Mathematics Crash Course — TutorWave Micro Course',
  seoDescription:
  'Intensive JEE Mathematics preparation covering all high-weightage topics. Includes shortcut techniques and previous year questions.'
},
{
  id: 'course-005',
  title: 'NEET Biology — Cell Biology & Genetics',
  slug: 'neet-biology-cell-genetics',
  thumbnail: 'https://img.rocket.new/generatedImages/rocket_gen_img_189a2b9f1-1774546673012.png',
  thumbnailAlt: 'Biology diagrams and microscope for NEET preparation',
  instructor: 'TutorWave Faculty',
  instructorTitle: 'NEET Biology',
  category: 'Competitive Exams',
  level: 'advanced',
  duration: '30 hrs',
  moduleCount: 5,
  excerpt: 'Focused NEET Biology preparation on cell biology, genetics and molecular biology.',
  description:
  'A targeted micro-course covering Cell Biology and Genetics — two of the highest-weightage topics in NEET Biology. Includes diagrams, mnemonics and MCQ practice.',
  modules: [
  { title: 'Cell Structure & Function', duration: '6 hrs', description: 'Prokaryotic and eukaryotic cells, organelles.' },
  { title: 'Cell Division', duration: '5 hrs', description: 'Mitosis, meiosis and cell cycle regulation.' },
  { title: 'Principles of Inheritance', duration: '7 hrs', description: "Mendel's laws, chromosomal theory and linkage." },
  { title: 'Molecular Basis of Inheritance', duration: '7 hrs', description: 'DNA structure, replication, transcription and translation.' },
  { title: 'MCQ Practice & Revision', duration: '5 hrs', description: 'NEET-level MCQs and previous year questions.' }],

  price: 999,
  status: 'coming-soon',
  whatYoullLearn: [
  'Understand cell biology at NEET examination level',
  'Master genetics and molecular biology concepts',
  'Solve NEET MCQs with speed and accuracy',
  'Use mnemonics for faster recall in exams'],

  tags: ['NEET', 'Biology', 'Class 12', 'Competitive Exams'],
  seoTitle: 'NEET Biology Cell Biology & Genetics — TutorWave Micro Course',
  seoDescription:
  'Targeted NEET Biology micro-course on cell biology and genetics. Includes diagrams, mnemonics and MCQ practice.'
},
{
  id: 'course-006',
  title: 'Study Skills & Exam Preparation',
  slug: 'study-skills-exam-preparation',
  thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1c5f1a2ee-1786691266949.png",
  thumbnailAlt: 'Student organising notes and study materials at a clean desk',
  instructor: 'TutorWave Faculty',
  instructorTitle: 'Learning & Development',
  category: 'Skills',
  level: 'beginner',
  duration: '10 hrs',
  moduleCount: 4,
  excerpt: 'Build effective study habits, time management and exam strategies for school students.',
  description:
  'A practical skills course teaching students how to study smarter. Covers time management, note-taking, memory techniques and exam strategies.',
  modules: [
  { title: 'Building a Study Routine', duration: '2 hrs', description: 'Creating consistent, effective study habits.' },
  { title: 'Note-Taking & Active Recall', duration: '3 hrs', description: 'Cornell notes, mind maps and spaced repetition.' },
  { title: 'Time Management & Planning', duration: '3 hrs', description: 'Timetables, prioritisation and avoiding procrastination.' },
  { title: 'Exam Strategies & Stress Management', duration: '2 hrs', description: 'Revision techniques and managing exam anxiety.' }],

  price: null,
  status: 'coming-soon',
  whatYoullLearn: [
  'Create a personalised, effective study routine',
  'Use proven note-taking and memory techniques',
  'Manage time and prioritise tasks efficiently',
  'Approach exams with confidence and strategy'],

  tags: ['Study Skills', 'Exam Preparation', 'Time Management', 'All Classes'],
  seoTitle: 'Study Skills & Exam Preparation — TutorWave Micro Course',
  seoDescription:
  'Practical study skills course for school students. Learn time management, note-taking and exam strategies.'
},
{
  id: 'course-007',
  title: 'Introduction to Python Programming',
  slug: 'introduction-python-programming',
  thumbnail: 'https://img.rocket.new/generatedImages/rocket_gen_img_1dbbbadaf-1776161070452.png',
  thumbnailAlt: 'Laptop screen showing Python code for beginner programming students',
  instructor: 'TutorWave Faculty',
  instructorTitle: 'Technology & Coding',
  category: 'Technology',
  level: 'beginner',
  duration: '25 hrs',
  moduleCount: 6,
  excerpt: 'Learn Python from scratch — variables, loops, functions and basic projects.',
  description:
  'A beginner-friendly Python programming course for school students and young learners. No prior coding experience required.',
  modules: [
  { title: 'Getting Started with Python', duration: '3 hrs', description: 'Installation, IDE setup and first programs.' },
  { title: 'Variables, Data Types & Operators', duration: '4 hrs', description: 'Strings, numbers, booleans and expressions.' },
  { title: 'Control Flow — If, Loops', duration: '5 hrs', description: 'Conditional statements and iteration.' },
  { title: 'Functions & Modules', duration: '5 hrs', description: 'Defining functions and using Python libraries.' },
  { title: 'Lists, Tuples & Dictionaries', duration: '5 hrs', description: 'Working with Python data structures.' },
  { title: 'Mini Projects & Practice', duration: '3 hrs', description: 'Build small projects to consolidate learning.' }],

  price: 799,
  status: 'coming-soon',
  whatYoullLearn: [
  'Write Python programs from scratch',
  'Understand core programming concepts',
  'Work with data structures and functions',
  'Build small real-world Python projects'],

  tags: ['Python', 'Programming', 'Technology', 'Coding', 'Class 8', 'Class 9', 'Class 10'],
  seoTitle: 'Introduction to Python Programming — TutorWave Micro Course',
  seoDescription:
  'Beginner Python programming course for school students. Learn variables, loops, functions and build mini projects.'
},
{
  id: 'course-008',
  title: 'Effective Teaching Techniques for Home Tutors',
  slug: 'effective-teaching-techniques-home-tutors',
  thumbnail: 'https://img.rocket.new/generatedImages/rocket_gen_img_1ca2da390-1773116692593.png',
  thumbnailAlt: 'Tutor explaining concepts to a student at home with clear visual aids',
  instructor: 'TutorWave Faculty',
  instructorTitle: 'Teacher Development',
  category: 'Teacher Development',
  level: 'intermediate',
  duration: '15 hrs',
  moduleCount: 5,
  excerpt: 'Practical teaching strategies, lesson planning and student engagement techniques for home tutors.',
  description:
  'A professional development course for home tutors. Learn evidence-based teaching techniques, lesson planning and how to keep students engaged and motivated.',
  modules: [
  { title: 'Understanding How Students Learn', duration: '3 hrs', description: 'Learning styles, cognitive load and memory.' },
  { title: 'Lesson Planning & Structuring Sessions', duration: '3 hrs', description: 'Creating effective, goal-oriented lesson plans.' },
  { title: 'Explaining Concepts Clearly', duration: '3 hrs', description: 'Analogies, examples and scaffolding techniques.' },
  { title: 'Student Engagement & Motivation', duration: '3 hrs', description: 'Keeping students focused and building confidence.' },
  { title: 'Assessment & Feedback', duration: '3 hrs', description: 'Giving constructive feedback and tracking progress.' }],

  price: 599,
  status: 'coming-soon',
  whatYoullLearn: [
  'Apply evidence-based teaching strategies',
  'Plan structured, effective tutoring sessions',
  'Explain complex concepts with clarity',
  'Motivate and engage students consistently'],

  tags: ['Teaching', 'Tutors', 'Pedagogy', 'Teacher Development', 'Home Tutoring'],
  seoTitle: 'Effective Teaching Techniques for Home Tutors — TutorWave Micro Course',
  seoDescription:
  'Professional development course for home tutors. Learn teaching techniques, lesson planning and student engagement strategies.'
}];


export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getCoursesByCategory(category: string): Course[] {
  return courses.filter((c) => c.category === category);
}