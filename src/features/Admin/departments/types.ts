export interface Department {
  name: string;
  info: string;
  image: string;
  code: string;
  graduationCreditHours: number;
}

export interface CreateDepartmentDto {
  name: string;
  info: string;
  image: string;
  code: string;
}

export interface UpdateDepartmentDto {
  code: string;
  data: { name: string; info: string; image: string; code: string };
}

export interface DepartmentUploadImage {
  code: string;
  formData: FormData;
}
