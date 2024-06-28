export interface ProfileUploadImage {
  formData: FormData;
}
export interface IProfilePictureCard {
  imageUrl: string;
  userName: string;
  handelLogout: () => void;
}
export interface IProfileInfoCard {
  userName: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  nationalId?: string;
  gender?: string;
  handleClick: () => void;
}
export interface IProfileDataField {
  name: string;
  value: string;
}
export interface IEducationalInfo {
  level?: string;
  department?: string;
  gradePointAverage?: string;
  degree?: string;
  creditHours?: string;
  creditHoursToGrad?: string;
}
