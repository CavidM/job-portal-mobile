import { ServiceResponseProps } from '../service.types';

export interface CityServiceResponseProps extends ServiceResponseProps<CityModel[]>{

}

export interface CityModel {
  id: number
  name: string
}

export interface ProfessionProps {
  id: number
  name: string
}

export interface ExperienceProps {
  key: string
  value: string
}

export interface InformationProfessionResponse extends ServiceResponseProps<ProfessionProps[]> {}
export interface InformationExperienceResponse extends ServiceResponseProps<ExperienceProps[]> {}
