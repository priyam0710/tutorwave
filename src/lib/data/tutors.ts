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
  teachingMode: ("home" | "online" | "both")[];
  verified: boolean;
  rating: number;
  reviewCount: number;
  bio: string;
  availability: string;
  gender: "male" | "female";
  languages: string[];
}

export const tutors: Tutor[] = [];

export const featuredTutors: Tutor[] = [];

export function getTutorBySlug(slug: string): Tutor | undefined {
  return tutors.find((tutor) => tutor.slug === slug);
}

export function getTutorsBySubject(subject: string): Tutor[] {
  return tutors.filter((tutor) => tutor.subjects.includes(subject));
}

export function getTutorsByLocation(location: string): Tutor[] {
  return tutors.filter((tutor) =>
    tutor.locations.some((loc) =>
      loc.toLowerCase().includes(location.toLowerCase())
    )
  );
}
