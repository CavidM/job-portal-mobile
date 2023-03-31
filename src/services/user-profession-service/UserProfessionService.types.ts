export interface ProfessionDTO {
  id: number
  name: string
}

export interface SpecificationDTO {
  id: number
  name: string
}

export interface UserProfessionServiceResponseProps {
  experience: string,
  id: number,
  maxSalary: number,
  minSalary: number,
  professionDTO: ProfessionDTO,
  specificationDTO: SpecificationDTO
}
