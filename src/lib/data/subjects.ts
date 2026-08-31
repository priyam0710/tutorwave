export interface Subject {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description : string;
  classes: string[];
  boards: string[];
  category: 'core' | 'senior-secondary' | 'competitive' | 'early-learning' | 'language' | 'commerce';
  relatedSubjects: string[];
  seoTitle: string;
  seoDescription: string;
  faqs: { question: string; answer: string }[];
}

export const subjects: Subject[] = [
   {
    id: 'sub-001',
    name: 'Mathematics',
    slug: 'mathematics',
    icon: '📐',
    description :'Comprehensive Mathematics tutoring for Class 1–12 and IIT-JEE preparation, covering Algebra, Geometry, Calculus and more with a focus on conceptual clarity.',
    classes: ['Class 1–5', 'Class 6–10', 'Class 11–12','IIT-JEE'],
    boards: ['CBSE', 'ICSE','NIOS','IB','State Board'],
    category: 'core',
    relatedSubjects: ['Algebra','Geometry','Mensuration','Calculus','Number System'],
    seoTitle: 'Mathematics Home Tutor in Delhi NCR — TutorWave',
    seoDescription: 'Find experienced Mathematics tutors for Class 1–12 in Delhi NCR. Boards, Olympiads and IIT-JEE preparation. Home tuition and online classes available.',
    faqs: [
      { question: 'Which classes do you offer Mathematics tutoring for?', answer: 'We offer Mathematics tutoring from Class NUR tO Class 12, including Olympiads IIT-JEE preparation for Class 9–12 students.' },
      { question: 'Can tutors help with board exam preparation?', answer: 'Yes. Our tutors are experienced with CBSE, ICSE, NIOS, IB and State board patterns and can tailor sessions to exam requirements.' },
      { question: 'Is home tutoring available for Mathematics in Delhi NCR?', answer: 'Yes. TutorWave connects you with tutors who offer home visits across Delhi, Noida, Gurugram, Ghaziabad, Greater Noida and Faridabad.' },
      { question: 'How do I find the right Mathematics tutor?', answer: 'Share your child\'s class, board and specific topics. Our team will suggest suitable tutor options based on your requirement.' },
    ],
  },
  {
    id: 'sub-002',
    name: 'Science',
    slug: 'science',
    icon: '🔬',
    description: 'Comprehensive Science tutoring for Class 1–12 & beyond covering Physics, Chemistry and Biology concepts with practical understanding.',
    classes: ['Class 1–5', 'Class 6–10','Class 11-12'],
    boards: ['CBSE', 'ICSE','NIOS','IB','State Board'],
    category: 'core',
    relatedSubjects: ['physics', 'chemistry', 'biology'],
    seoTitle: 'Science Home Tutor in Delhi NCR — TutorWave',
    seoDescription: 'Find experienced Science tutors for Class 1–12 in Delhi NCR. CBSE, ICSE, NIOS, IB and State Boards. Home tuition and online classes available.',
    faqs: [
      { question: 'What does Science tutoring cover for Class 1–12?', answer: 'Science tutoring covers Physics, Chemistry and Biology topics as per the latest curriculum for each class.' },
      { question: 'Can a tutor help my child prepare for Science Olympiads?', answer: 'Yes. Several TutorWave tutors have experience preparing students for Science Olympiads and NTSE.' },
      { question: 'Is online Science tutoring available?', answer: 'Yes. Tutors offer both home visits and online sessions depending on your preference and location.' },
    ],
  },
  {
    id: 'sub-003',
    name: 'Physics',
    slug: 'physics',
    icon: '⚡',
    description: 'Expert Physics tutoring for Class 11–12 and competitive exam preparation including IIT-JEE and NEET.',
    classes: ['Class 9–12', 'IIT-JEE', 'NEET','Olympiads'],
     boards: ['CBSE', 'ICSE','NIOS','IB','State Board'],
    category: 'senior-secondary',
    relatedSubjects: ['mathematics', 'chemistry'],
    seoTitle: 'Physics Home Tutor in Delhi NCR — TutorWave',
    seoDescription: 'Find experienced Physics tutors for Class 11–12 and IIT-JEE/NEET preparation in Delhi NCR. Home and online classes available.',
    faqs: [
      { question: 'Do you have tutors for IIT-JEE Physics preparation?', answer: 'Yes. We have tutors with strong backgrounds in IIT-JEE Physics who can work on both concepts and problem-solving strategies.' },
      { question: 'How many sessions per week are recommended for Physics?', answer: 'Most students benefit from 2–3 sessions per week. Your tutor can suggest a schedule based on your current level and exam timeline.' },
      { question: 'Can tutors help with NCERT as well as advanced problems?', answer: 'Yes. Tutors can cover NCERT thoroughly and also work on advanced problems for competitive exam preparation.' },
    ],
  },
  {
    id: 'sub-004',
    name: 'Chemistry',
    slug: 'chemistry',
    icon: '🧪',
    description: 'Structured Chemistry tutoring for Class 11–12 with focus on conceptual clarity and exam preparation.',
    classes: ['Class 11–12'],
    boards: ['CBSE', 'IIT-JEE', 'NEET'],
    category: 'senior-secondary',
    relatedSubjects: ['physics', 'biology'],
    seoTitle: 'Chemistry Home Tutor in Delhi NCR — TutorWave',
    seoDescription: 'Find experienced Chemistry tutors for Class 11–12 and IIT-JEE/NEET preparation in Delhi NCR. Home and online classes available.',
    faqs: [
      { question: 'Is Chemistry tutoring available for both Organic and Inorganic topics?', answer: 'Yes. Tutors cover Physical, Organic and Inorganic Chemistry as per the CBSE and competitive exam syllabus.' },
      { question: 'Can a tutor help with NEET Chemistry preparation?', answer: 'Yes. We have tutors experienced with NEET Chemistry who can focus on high-weightage topics and previous year patterns.' },
      { question: 'How do I know if a tutor is right for my child?', answer: 'You can share your requirement and we will suggest suitable options. A trial session can help you assess the fit.' },
    ],
  },
  {
    id: 'sub-005',
    name: 'Biology',
    slug: 'biology',
    icon: '🌿',
    description: 'In-depth Biology tutoring for Class 11–12 and NEET preparation with focus on conceptual understanding.',
    classes: ['Class 11–12'],
    boards: ['CBSE', 'NEET'],
    category: 'senior-secondary',
    relatedSubjects: ['chemistry'],
    seoTitle: 'Biology Home Tutor in Delhi NCR — TutorWave',
    seoDescription: 'Find experienced Biology tutors for Class 11–12 and NEET preparation in Delhi NCR. Home and online classes available.',
    faqs: [
      { question: 'Do you have tutors specifically for NEET Biology?', answer: 'Yes. Several tutors on TutorWave specialise in NEET Biology and are familiar with the exam pattern and high-weightage chapters.' },
      { question: 'Can tutors help with diagram-based questions?', answer: 'Yes. Tutors can work on diagrams, labelling and the visual aspects of Biology that are important for board and NEET exams.' },
      { question: 'Is online Biology tutoring effective?', answer: 'Yes. Many students find online sessions effective for Biology, especially when tutors share annotated diagrams and notes digitally.' },
    ],
  },
  {
    id: 'sub-006',
    name: 'English',
    slug: 'english',
    icon: '📖',
    description: 'Comprehensive English tutoring covering grammar, comprehension, writing and literature for all classes.',
    classes: ['Class 1–5', 'Class 6–10', 'Class 11–12'],
    boards: ['CBSE', 'ICSE'],
    category: 'language',
    relatedSubjects: ['hindi'],
    seoTitle: 'English Home Tutor in Delhi NCR — TutorWave',
    seoDescription: 'Find experienced English tutors for Class 1–12 in Delhi NCR. CBSE and ICSE. Home and online classes available.',
    faqs: [
      { question: 'Can tutors help improve my child\'s spoken English?', answer: 'Yes. Some tutors focus on spoken English and communication skills alongside the academic curriculum.' },
      { question: 'Is English tutoring available for ICSE students?', answer: 'Yes. We have tutors experienced with both CBSE and ICSE English curricula, including literature and language papers.' },
      { question: 'What age groups do you cover for English tutoring?', answer: 'We cover Class 1 through Class 12. For younger children, tutors focus on reading, writing and basic grammar.' },
    ],
  },
  {
    id: 'sub-007',
    name: 'Hindi',
    slug: 'hindi',
    icon: '🗣️',
    description: 'Hindi language and literature tutoring for all classes with focus on grammar, writing and comprehension.',
    classes: ['Class 1–5', 'Class 6–10', 'Class 11–12'],
    boards: ['CBSE', 'ICSE'],
    category: 'language',
    relatedSubjects: ['english'],
    seoTitle: 'Hindi Home Tutor in Delhi NCR — TutorWave',
    seoDescription: 'Find experienced Hindi tutors for Class 1–12 in Delhi NCR. CBSE and ICSE. Home and online classes available.',
    faqs: [
      { question: 'Can tutors help with Hindi grammar and essay writing?', answer: 'Yes. Tutors cover grammar, essay writing, letter writing and comprehension as per the board curriculum.' },
      { question: 'Is Hindi tutoring available for Class 11–12 literature?', answer: 'Yes. We have tutors who can cover Hindi literature (Aroh, Vitan) for Class 11–12 CBSE students.' },
      { question: 'My child struggles with Hindi. Can a tutor help from basics?', answer: 'Yes. Tutors can assess your child\'s current level and build from foundational concepts at a comfortable pace.' },
    ],
  },
  {
    id: 'sub-008',
    name: 'Social Science',
    slug: 'social-science',
    icon: '🌍',
    description: 'Social Science tutoring covering History, Geography, Civics and Economics for Class 6–10.',
    classes: ['Class 6–10'],
    boards: ['CBSE', 'ICSE'],
    category: 'core',
    relatedSubjects: ['english', 'economics'],
    seoTitle: 'Social Science Home Tutor in Delhi NCR — TutorWave',
    seoDescription: 'Find experienced Social Science tutors for Class 6–10 in Delhi NCR. CBSE and ICSE. Home and online classes available.',
    faqs: [
      { question: 'Does Social Science tutoring cover all four components?', answer: 'Yes. Tutors cover History, Geography, Political Science and Economics as part of the Social Science curriculum.' },
      { question: 'Can tutors help with map work and diagram-based questions?', answer: 'Yes. Tutors can work on map skills, diagram labelling and the practical aspects of Geography and History.' },
      { question: 'Is Social Science tutoring available for Class 10 board preparation?', answer: 'Yes. Tutors are familiar with the Class 10 board pattern and can focus on important chapters and question types.' },
    ],
  },
  {
    id: 'sub-009',
    name: 'Computer Science',
    slug: 'computer-science',
    icon: '💻',
    description: 'Modern Computer Science tutoring covering programming, data structures and CBSE curriculum for Class 9–12.',
    classes: ['Class 9–10', 'Class 11–12'],
    boards: ['CBSE'],
    category: 'senior-secondary',
    relatedSubjects: ['mathematics'],
    seoTitle: 'Computer Science Home Tutor in Delhi NCR — TutorWave',
    seoDescription: 'Find experienced Computer Science tutors for Class 9–12 in Delhi NCR. CBSE curriculum. Home and online classes available.',
    faqs: [
      { question: 'What programming languages are covered in CBSE Computer Science?', answer: 'CBSE Class 11–12 Computer Science covers Python. Class 9–10 covers basic programming concepts and IT applications.' },
      { question: 'Can tutors help with practical file and project work?', answer: 'Yes. Tutors can assist with practical assignments, project files and lab work as part of the CBSE curriculum.' },
      { question: 'Is Computer Science tutoring available online?', answer: 'Yes. Online sessions work particularly well for Computer Science as tutors can share screens and review code in real time.' },
    ],
  },
  {
    id: 'sub-010',
    name: 'Commerce',
    slug: 'commerce',
    icon: '📊',
    description: 'Commerce tutoring for Class 11–12 covering Accountancy, Business Studies and Economics with focus on conceptual clarity and exam readiness.',
    classes: ['Class 11–12'],
    boards: ['CBSE'],
    category: 'commerce',
    relatedSubjects: ['economics', 'mathematics'],
    seoTitle: 'Commerce Home Tutor in Delhi NCR — TutorWave',
    seoDescription: 'Find experienced Commerce tutors for Class 11–12 in Delhi NCR. Accountancy, Business Studies and Economics. CBSE. Home and online classes available.',
    faqs: [
      { question: 'Does Commerce tutoring cover all three subjects?', answer: 'Yes. Tutors can cover Accountancy, Business Studies and Economics individually or as a combined Commerce package.' },
      { question: 'Can tutors help with Accountancy practical problems?', answer: 'Yes. Tutors work through journal entries, ledger accounts, balance sheets and other practical Accountancy problems.' },
      { question: 'Is Commerce tutoring available for Class 11 as well as Class 12?', answer: 'Yes. We have tutors for both Class 11 and Class 12 Commerce, including board exam preparation for Class 12.' },
    ],
  },
  {
    id: 'sub-011',
    name: 'Economics',
    slug: 'economics',
    icon: '📈',
    description: 'Economics tutoring for Class 11–12 covering Micro and Macro Economics with clear conceptual explanations and diagram-based learning.',
    classes: ['Class 11–12'],
    boards: ['CBSE'],
    category: 'commerce',
    relatedSubjects: ['commerce', 'social-science', 'mathematics'],
    seoTitle: 'Economics Home Tutor in Delhi NCR — TutorWave',
    seoDescription: 'Find experienced Economics tutors for Class 11–12 in Delhi NCR. Micro and Macro Economics. CBSE. Home and online classes available.',
    faqs: [
      { question: 'What topics are covered in Class 11–12 Economics?', answer: 'CBSE Economics covers Microeconomics (consumer behaviour, market structures) and Macroeconomics (national income, money, banking, government budget).' },
      { question: 'Can tutors help with diagram-based Economics questions?', answer: 'Yes. Diagrams are an important part of Economics exams and tutors can work on drawing and interpreting them correctly.' },
      { question: 'Is Economics tutoring available for students who find it difficult?', answer: 'Yes. Tutors can start from foundational concepts and build understanding at a pace that suits the student.' },
    ],
  },
];

export function getSubjectBySlug(slug: string): Subject | undefined {
  return subjects.find((s) => s.slug === slug);
}

export function getSubjectsByCategory(category: Subject['category']): Subject[] {
  return subjects.filter((s) => s.category === category);
}
