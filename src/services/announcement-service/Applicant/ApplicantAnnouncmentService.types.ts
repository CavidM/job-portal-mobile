import { ProfessionDTO, SpecificationDTO } from '../../user-service/UserService.types';
import { ServiceResponseWithPagination } from '../../service.types';

export interface ApplicantAnnouncementsModel{
    agency: string,
    announcementSource: string,
    deadlineDate: string,
    id: number,
    maxSalary: number,
    minSalary: number,
    professionDTO: ProfessionDTO,
    specificationDTO: SpecificationDTO,
    starred: true
}
export interface ApplicantAnnouncementsResponseProps extends
    ServiceResponseWithPagination<ApplicantAnnouncementsModel[]>{
}
