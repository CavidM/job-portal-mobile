import { ServiceResponseProps, ServiceResponseWithPagination } from '../../service.types';

export interface locationPayload {
    address: string,
    latitude: string,
    longitude: string
}

export interface ApplicantOrdersModel{
    locationPayload: locationPayload,
    minSalary: string,
    orderCreatorFullName: string,
    orderCreatorPhoneNumber: string,
    orderDate: string,
    orderDescription: string,
    professionName: string,
    serviceOrderUserId: number,
    serviceOrderUserStatus: string,
    specificationName: string
}
export interface ApplicantOrdersResponseProps extends
    ServiceResponseWithPagination<ApplicantOrdersModel[]>{
}
export interface ApplicantOrderDetailsResponseProps extends
    ServiceResponseProps<ApplicantOrdersModel>{
}
export interface ApplicantOrderStatusResponseProps extends ServiceResponseProps<any>{
    serviceOrderUserStatus: string,
    status: string,
    count: number
}
