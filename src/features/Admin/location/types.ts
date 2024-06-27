export interface LocationDto {
  id: number;
  name: string;
  info: string;
  image: string;
  path: string;
  maxCapacity: number;
}

export interface CreateLocationDto {
  id: number;
  name: string;
  info: string;
  image: string;
  path: string;
  maxCapacity: number;
}
export interface UpdateLocationDto {
  id: number;
  data: { 
    name: string;
    info: string;
    image: string;
    path: string;
    maxCapacity: number;
  };
}

export interface LocationUploadImage {
  id: number;
  formData: FormData;
}