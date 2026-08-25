export interface Resource {
  id: string;
  title: string;
  slug: string;
  category: 'parent-guide' | 'student-guide' | 'study-tips' | 'tutor-guide' | 'exam-prep' | 'educational';
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
}

export const resources: Resource[] = [
  {
    id: 'res-001',
    title: 'How to Choose the Right Home Tutor for Your Child',
    slug: 'how-to-choose-right-home-tutor',
    category: 'parent-guide',
    excerpt: 'A practical guide for parents on what to look for when selecting a home tutor — qualifications, teaching style, subject expertise and more.',
    content: `Choosing the right home tutor for your child is an important decision. Here are the key factors to consider:

1. Subject Expertise
Ensure the tutor has strong knowledge of the specific subject and class level your child needs help with. Ask about their educational background and teaching experience in that subject.

2. Teaching Style
Every child learns differently. Some students benefit from a structured approach while others need a more flexible, conversational style. Discuss the tutor's teaching methodology before committing.

3. Experience with the Relevant Board
CBSE, ICSE and state boards have different syllabus and exam patterns. Make sure the tutor is familiar with your child's specific board.

4. Communication
A good tutor communicates regularly with parents about the student's progress, areas of improvement and any concerns.

5. Consistency
Regular, consistent classes are more effective than sporadic intensive sessions. Ensure the tutor can commit to a reliable schedule.

6. Trial Session
Consider requesting a trial session before making a long-term commitment. This helps both the student and tutor assess compatibility.`,
    author: 'TutorWave Team',
    publishedAt: '2026-08-01',
    readTime: '5 min read',
    tags: ['Parents', 'Home Tuition', 'Tutor Selection'],
    seoTitle: 'How to Choose the Right Home Tutor — TutorWave Guide',
    seoDescription: 'A practical guide for parents on selecting the right home tutor for their child. Learn what to look for in qualifications, teaching style and experience.',
  },
  {
    id: 'res-002',
    title: 'CBSE vs ICSE: Which Board is Right for Your Child?',
    slug: 'cbse-vs-icse-which-board',
    category: 'parent-guide',
    excerpt: 'Understanding the key differences between CBSE and ICSE boards to help parents make an informed decision for their child\'s education.',
    content: `CBSE and ICSE are two of the most popular school boards in India. Here is a comparison to help you understand the differences:

CBSE (Central Board of Secondary Education)
- National board with standardised curriculum
- More focused on core subjects
- Widely accepted for competitive exams like IIT-JEE and NEET
- Generally considered less intensive in terms of volume
- Easier to transfer between schools across India

ICSE (Indian Certificate of Secondary Education)
- More comprehensive and detailed curriculum
- Strong emphasis on English language
- Broader subject coverage including arts and humanities
- Generally considered more rigorous
- Well-regarded for students pursuing humanities or arts

Which is better?
There is no single correct answer. The right board depends on your child's learning style, future goals and the quality of schools available in your area. Both boards have produced excellent students across all fields.`,
    author: 'TutorWave Team',
    publishedAt: '2026-08-05',
    readTime: '6 min read',
    tags: ['CBSE', 'ICSE', 'Parents', 'School Boards'],
    seoTitle: 'CBSE vs ICSE: Which Board is Right for Your Child? — TutorWave',
    seoDescription: 'Understand the key differences between CBSE and ICSE boards. A practical guide for parents to make an informed decision for their child\'s education.',
  },
  {
    id: 'res-003',
    title: 'Effective Study Habits for School Students',
    slug: 'effective-study-habits-school-students',
    category: 'study-tips',
    excerpt: 'Practical study strategies that help school students learn more effectively, retain information better and perform well in exams.',
    content: `Building good study habits early makes a significant difference in academic performance. Here are evidence-based strategies:

1. Consistent Study Schedule
Study at the same time each day. This builds a routine and makes it easier to focus. Even 45–60 minutes of focused daily study is more effective than long irregular sessions.

2. Active Recall
Instead of re-reading notes, test yourself. Close the book and try to recall what you just read. This strengthens memory significantly more than passive reading.

3. Spaced Repetition
Review material at increasing intervals — after 1 day, then 3 days, then a week. This is one of the most effective ways to retain information long-term.

4. Minimise Distractions
Keep phones away during study time. Even the presence of a phone reduces cognitive capacity. Use a dedicated study space if possible.

5. Take Breaks
Study for 40–45 minutes, then take a 5-minute break. This technique (Pomodoro method) maintains focus and prevents mental fatigue.

6. Prioritise Difficult Subjects
Tackle the most challenging subjects when your energy is highest, typically in the morning or early afternoon.`,
    author: 'TutorWave Team',
    publishedAt: '2026-08-10',
    readTime: '7 min read',
    tags: ['Study Tips', 'Students', 'Exam Preparation'],
    seoTitle: 'Effective Study Habits for School Students — TutorWave',
    seoDescription: 'Practical study strategies for school students. Learn how to study more effectively, retain information better and perform well in exams.',
  },
];

export function getResourceBySlug(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}

export function getResourcesByCategory(category: Resource['category']): Resource[] {
  return resources.filter((r) => r.category === category);
}
