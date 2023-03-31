import { Request, Response } from 'miragejs';
import { orderUsers } from './Order.data';
import { QuestionnaireData } from '../questionnaire/questionnaire.data';

export const getOrderUsersBySearchParams = (schema: any, request: Request) => {
  const { requestBody } = request;
  return new Response(200, {}, {
    message: null,
    data: {
      data: [],
      pageSize: 10,
      pageNumber: 0,
      numberOfElements: 0,
      totalPages: 1,
      totalElements: 0
    },
    timestamp: '23.08.2021 17:03:13',
    subErrors: null
  });
  return new Response(200, {}, {
    message: null,
    data: {
      data: orderUsers,
      pageSize: 10,
      pageNumber: 0,
      numberOfElements: 5,
      totalPages: 1,
      totalElements: 5
    },
    timestamp: '23.08.2021 17:03:13',
    subErrors: null
  });
};

export const createOrder = () => new Response(200, {}, {});

export const getCustomerOrders = () => new Response(200, {},
  {
    message: null,
    data: {
      data: [{
        id: 18,
        jobDescription: 'It is a long established fact that a reader will be distracted by the readable content sometimes on purpose',
        professionDTO:
            { id: 1, name: 'It is a long established fact that a reader will be distracted by the readable content sometimes on purpose' },
        specificationDTO:
            { id: 1, name: 'It is a long established fact that a reader will be distracted by the readable content sometimes on purpose' },
        createdDate: '08.09.2021 21:45',
        serviceOrderStatus: 'DONE',
        users: null,
        usersCount: 0
      },
      {
        id: 1,
        jobDescription: 'It is a long established fact that a reader will be distracted by the readable content sometimes on purpose',
        professionDTO:
              { id: 1, name: 'Rəngsazrrri' },
        specificationDTO:
              { id: 1, name: 'Mənzil təmirirffr' },
        createdDate: '08.09.2021 21:45',
        serviceOrderStatus: 'PENDING',
        users: null,
        usersCount: 0
      },
      {
        id: 11,
        jobDescription: 'aa',
        professionDTO:
              { id: 1, name: 'Rəngsaz' },
        specificationDTO:
              { id: 1, name: 'Mənzil təmiri' },
        createdDate: '08.09.2021 21:45',
        serviceOrderStatus: 'CANCELLED',
        users: null,
        usersCount: 0
      }
      ],
      pageSize: 1,
      pageNumber: 0,
      numberOfElements: 1,
      totalPages: 2,
      totalElements: 1
    },
    timestamp: '09.09.2021 01:13:50',
    subErrors: null
  });

export const getCustomerOrderDetails = () => new Response(200, {},
  {
    message: null,
    data: {
      id: 18,
      jobDescription: 'It is a long established fact that a reader will be distracted by the readable content sometimes on purpose',
      professionDTO:
          { id: 1, name: 'It is a long established fact that a reader will be distracted by the readable content sometimes on purpose' },
      specificationDTO:
          { id: 1, name: 'It is a long established fact that a reader will be distracted by the readable content sometimes on purpose' },
      createdDate: '08.09.2021 21:45',
      serviceOrderStatus: 'DONE',
      users: [
        {
          firstName: 'It is a long established fact that a reader will be distracted by the readable content sometimes on purpose',
          lastName: 'b',
          serviceOrderUserStatus: 'DONE',
          date: '2021-09-02T09:54:24.912827',
          phoneNumber: '994553419665',
          userPhotoDTO: null
        },
        {
          firstName: 'b',
          lastName: 'a',
          serviceOrderUserStatus: 'PENDING',
          date: '2020-09-02T09:54:24.913827',
          phoneNumber: '994553419666',
          userPhotoDTO: null
        },
        {
          firstName: 'c',
          lastName: 'c',
          serviceOrderUserStatus: 'CANCELLED',
          date: '2021-09-02T09:54:24.914829',
          phoneNumber: '994553419667',
          userPhotoDTO: null
        }
      ],
      usersCount: 3
    },
    timestamp: '02.09.2021 20:02:55',
    subErrors: null
  });

export const getCustomerOrderStatus = () => new Response(200, {},
  {
    message: null,
    data: [
      {
        status: 'OPEN',
        count: 5
      },
      {
        status: 'PENDING',
        count: 1
      }
    ],
    timestamp: '02.09.2021 10:03:20',
    subErrors: null
  });

export const createScheduledOrder = (schema: any, request: Request) => new Response(200);

export const getApplicantOrders = () => new Response(200, {},
  {
    data: {
      data: [{
        locationPayload: {
          address: 'string',
          latitude: 'string',
          longitude: 'string'
        },
        minSalary: 0,
        orderCreatorFullName: 'Qizilgul Abdullayeva',
        orderCreatorPhoneNumber: 'string',
        orderDate: 'dd.MM.yyyy HH:mm',
        orderDescription: 'string',
        professionName: 'stringstringisTruncated',
        serviceOrderUserId: 0,
        serviceOrderUserStatus: 'PENDING',
        specificationName: 'stringstring'
      },
      {
        locationPayload: {
          address: 'string',
          latitude: 'string',
          longitude: 'string'
        },
        minSalary: null,
        orderCreatorFullName: 'fullName fullName fullName',
        orderCreatorPhoneNumber: 'string',
        orderDate: 'today',
        orderDescription: 'string fullName fullName fullName orderDescription: orderDescriptionstring fullName fullName fullName fulfbjkj',
        professionName: 'string',
        serviceOrderUserId: 1,
        serviceOrderUserStatus: 'DONE',
        specificationName: 'string'
      }
      ],
      numberOfElements: 1,
      pageNumber: 1,
      pageSize: 0,
      totalElements: 2,
      totalPages: 3
    },
    message: 'string',
    subErrors: [
      {}
    ],
    timestamp: '2021-09-10T08:25:01.643Z'
  });

export const getApplicantOrderStatus = () => new Response(200, {},
  {
    data: [
      {
        count: 1,
        serviceOrderUserStatus: 'PENDING',
        status: 'PENDING'
      }
    ],
    message: 'string',
    subErrors: [
      {}
    ],
    timestamp: '2021-09-13T06:14:45.726Z'
  });
export const getApplicantOrderDetails = () => new Response(200, {},
  {
    data: {
      locationPayload: {
        address: 'Atatürk parkı',
        latitude: '40.401859',
        longitude: '49.850550'
      },
      minSalary: null,
      orderCreatorFullName: 'fullName fullName fullName',
      orderCreatorPhoneNumber: '552773141',
      orderDate: 'dd.MM.yyyy HH:mm',
      orderDescription: 'string fullName fullName fullName orderDescription: orderDescriptionstring fullName fullName fullName fulfbjkj',
      professionName: 'stringstringisTruncated',
      serviceOrderUserId: 0,
      serviceOrderUserStatus: 'ACCEPTED',
      specificationName: 'stringstring'
    }
  });
export const acceptOrderRequest = () => new Response(200);

export const declineOrderRequest = () => new Response(200);
export const finishOrderRequest = () => new Response(200, {}, QuestionnaireData);
export const cancelOrderRequest = () => new Response(200, {}, QuestionnaireData);
