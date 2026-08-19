export interface Tutor {
  id: string;
  name: string;
  slug: string;
}

export const tutors: Tutor[] = [];

export const featuredTutors: Tutor[] = [];

export function getTutorBySlug(slug: string): Tutor | undefined {
  return tutors.find((tutor) => tutor.slug === slug);
}
