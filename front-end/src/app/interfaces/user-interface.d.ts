export interface IUser {
  id: string;
  name: string;
  email: string;
  profilePictureLink: string;
  description: string;
  dateOfBirth: Date;
  language: string;
  skill: string[];
  currentEducation: string;
  experienceYears: number;
  interest: string[];
  learningResource: string[];
  tools: string[];
  filledInformation: boolean;
  friends: IUser[];
}
