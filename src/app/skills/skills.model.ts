export interface SkillResponse {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface SkillInsert {
  id: string;
  name: string;
  description: string;
  categoryId: number;
}

export interface SkillUpdate {
  id: string;
  name: string;
  description: string;
  categoryId: number;
}

export interface GetSkill {
  message: string;
  status: string;
  data: SkillUpdate;
}
