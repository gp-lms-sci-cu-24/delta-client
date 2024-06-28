export interface AnnouncementDto {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  editedAt: string;
}

export interface IProps {
  id: number;
  title: string;
  description: string;
  editedAt: string | null;
  createdAt: string | null;
}

export interface CreateAnnouncementDto {
  title: string;
  description: string;
  type: type;
  userName: string;
}

export interface UpdateAnnouncementDto {
  id: number;
  data: CreateAnnouncementDto;
}

export enum type {
  GENERAL = "GENERAL",
  STUDENT_ONLY = "STUDENT_ONLY",
  PROFESSOR_ONLY = "PROFESSOR_ONLY",
  SPECIFIC_USER = "SPECIFIC_USER",
}

export const AnnouncementType = [
  {
    value: type.GENERAL,
    label: "GENERAL",
  },
  {
    value: type.PROFESSOR_ONLY,
    label: "PROFESSOR_ONLY",
  },
  {
    value: type.SPECIFIC_USER,
    label: "SPECIFIC_USER",
  },
  { value: type.STUDENT_ONLY, label: "STUDENT_ONLY" },
];
