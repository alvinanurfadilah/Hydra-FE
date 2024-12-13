export type Gender = 'F' | 'M';

export const gendersLabel: { label: string; value: Gender }[] = [
  { label: 'Female', value: 'F' },
  { label: 'Male', value: 'M' },
];

export interface Candidate {
  id: number;
  bootcampClassId: number;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  address: string;
  domicile: string;
  phoneNumber: string;
}

export interface ResponseCandidate {
  id: number;
  fullName: string;
  bootcampId: number;
  phoneNumber: string;
  domicile: string;
}

export interface NewCandidate {
  bootcampClassId: number;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  address: string;
  domicile: string;
  phoneNumber: string;
}

export interface GetCandidate {
  message: string;
  status: string;
  data: Candidate;
}