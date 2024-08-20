export interface UpdateUserDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  profilePictureLink: string;
  description: string;
  dateOfBirth: Date;
  language: string;
  skill: string;
  currentEducation: string;
  experienceYears: number;
  interest: string[];
  learningResource: string[];
  tools: string[];
}
