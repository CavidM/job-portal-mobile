export interface UserDTO {
  firstName: string
  lastName: string
  fatherName: string
  birthDate: string
  phoneNumber: string
  fin: string
  gender: string
  authority: string
}

export interface ProfessionDTO {
  id:number
  name: string
}

export interface SpecificationDTO {
  id: number
  name: string
}

export interface UserProfessionsDTO {
  professionDTO: ProfessionDTO
  specificationDTO: SpecificationDTO
  experience: string;
  minSalary: number;
  maxSalary: number;
}

export interface UserServiceResponseProps {
  userDTO: UserDTO,
  userProfessionsDTO: UserProfessionsDTO[]
}

export interface SwitchUser {
  token: string,
  refreshToken: string
}
