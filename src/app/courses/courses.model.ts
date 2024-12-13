export interface CourseResponse {
  id: string;
  skill: string;
  trainer: string;
  startDate: string;
  endDate: string;
  progress: number;
  evaluationDate: string;
}

export interface NewCourse {
  skillId: string;
  trainerId: number;
  startDate: Date;
  endDate: Date;
  bootcampId: number;
}

export interface SkillResponse {
  id: string;
  name: string;
  description: string;
}

export interface TrainerResponse {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: string;
  phoneNumber: string;
  isAvailable: boolean;
  isActive: boolean;
}

export interface EditCourse {
  id: string;
  progress: number
  evaluationDate: Date;
}
