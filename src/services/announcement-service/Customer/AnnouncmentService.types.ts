import { ProfessionDTO, SpecificationDTO } from '../../user-service/UserService.types';
import { CityModel } from '../../information-service/InformationService.types';
import { ServiceResponseProps, ServiceResponseWithPagination } from '../../service.types';
import { LocationProps } from '../../../store/slices/createOrderPayload';

export interface CreateAnnouncementRequestProps {
    location: LocationProps,
    announcementStatus: string,
    announcementType: string,
    cityDTO: CityModel,
    deadlineDate: string,
    description: string,
    emailAddress: string,
    experience: string,
    genderType: string,
    id: number,
    maxAge: number,
    maxSalary: number,
    minAge: number,
    minSalary: number,
    phoneNumber: string,
    professionDTO: ProfessionDTO,
    specificationDTO: SpecificationDTO
}
export interface AnnouncementDetailsModel{
    announcementStatus: string
    announcementType: string
    cityDTO: CityModel
    deadlineDate: string
    description: string
    emailAddress: string
    experience: string
    genderType: string
    id: number
    locationPayload: LocationProps
    maxAge: number
    maxSalary: number
    minAge: number
    minSalary: number
    phoneNumber: string
    professionDTO: ProfessionDTO
    specificationDTO: SpecificationDTO
}
export interface AnnouncementsModel{
    announcementStatus: string
    deadlineDate: string
    id: number
    professionName: string
    specificationName: string
}
export interface AnnouncementsResponseProps extends
    ServiceResponseWithPagination<AnnouncementsModel[]>{
}
export interface AnnouncementDetailsResponseProps extends
    ServiceResponseProps<AnnouncementDetailsModel>{
}
