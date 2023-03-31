import { UserTypes } from '../../../context/Registration.context';
import { ProfessionDTO, SpecificationDTO, UserProfessionsDTO } from '../../user-service/UserService.types';
import { UserPhotoServiceGetType } from '../../user-photo-service/UserPhotoService.types';

export interface GetOrderUsersBySearchParamsRequestProps {
  countOfPerson: number,
  jobDescription: string,
  userSearchPayload: {
    authorityName: UserTypes,
    cityId: number,
    experience: string | null,
    genderType: string,
    maxAge: number,
    minAge: number,
    minSalary: number | null,
    pageIndex: number,
    pageSize: number,
    professionId: number,
    specificationId: number,
    isAgreedPrice?: boolean
  }
}

export interface GetOrderUsersBySearchParamsResponseProps {
  data: GetOrderUsersBySearchParamsResponsePayloadProps[]
  numberOfElements: number
  pageNumber: number
  pageSize: number
  totalElements: number
}

interface GetOrderUsersBySearchParamsResponsePayloadProps {
  userId: number,
  firstName: string,
  lastName: string,
  professionStarCount: number,
  personalStarCount: number,
  voteCount: number,
  userProfessionDTO: userProfessionDTO
  userPhotoDTO: null,
}

interface userProfessionDTO extends UserProfessionsDTO {
  id: number
}

export interface CreateOrderRequestProps {
  location: {
    address: string,
    latitude: number,
    longitude: number
  },
  users: userModel[]
}

interface userModel {
  userId: number
}
export interface CustomerOrdersModel{
  id: number,
  jobDescription: string,
  professionDTO: ProfessionDTO,
  specificationDTO: SpecificationDTO,
  createdDate: string,
  serviceOrderStatus: string
}
export interface CustomerOrdersResponseProps
{
  data: CustomerOrdersModel[],
  pageSize: number,
  pageNumber: number,
  numberOfElements: number,
  totalPages: number,
  totalElements: number
}
export interface CustomerOrderStatusResponseProps{
  status: string,
  count: number
}
export interface CustomersOrderUsers{
  firstName: string,
  lastName: string,
  serviceOrderUserStatus: string,
  date: string,
  phoneNumber: string,
  userPhotoDTO: UserPhotoServiceGetType
}
export interface CustomerOrderDetailsResponseProps extends CustomerOrdersModel{
  users: CustomersOrderUsers[],
  usersCount: number
}

export interface ScheduledOrderProps {
  // "untilToCheckDate": "yyyy-MM-dd"
  'untilToCheckDate': string
}
