import { Response } from 'miragejs';

export const createAnnouncement = () => new Response(200, {}, {});

export const getCustomerAnnouncements = () => new Response(200, {},
  {
    data: {
      data: [
        {
          announcementStatus: 'ACTIVE',
          deadlineDate: 'dd.MM.yyyy',
          id: 0,
          professionName: 'string',
          specificationName: 'string'
        }
      ],
      numberOfElements: 0,
      pageNumber: 0,
      pageSize: 0,
      totalElements: 0,
      totalPages: 0
    },
    message: 'string',
    subErrors: [
      {}
    ],
    timestamp: '2021-09-29T15:05:26.852Z'
  });
export const getCustomerAnnouncementDetails = () => new Response(200, {},
  {
    data: {
      announcementStatus: 'ACTIVE',
      announcementType: null,
      cityDTO: { id: 1, name: 'Bakı' },
      deadlineDate: '2021-10-30',
      description: 'Aaa',
      emailAddress: '4@gmail.com',
      experience: null,
      genderType: null,
      id: 6,
      locationPayload: { longitude: '-122.40641700000003', latitude: '37.78583399999998', address: 'Union Square, Stockton St' },
      maxAge: 99,
      maxSalary: 5000,
      minAge: 18,
      minSalary: 0,
      phoneNumber: '9944444444',
      professionDTO: { id: 2, name: 'Sürücü' },
      specificationDTO: { id: 4, name: 'Kateqoriya B' }
    },
    message: 'string',
    subErrors: [
      {}
    ],
    timestamp: '2021-09-29T15:07:14.313Z'
  });

export const deleteAnnouncement = () => new Response(200);

export const getApplicantAnnouncements = () => new Response(200, {},
  {
    data: {
      data: [
        {
          agency: 'string',
          announcementSource: 'SELF',
          deadlineDate: 'dd.MM.yyyy',
          id: 0,
          maxSalary: 0,
          minSalary: 0,
          professionDTO: {
            id: 0,
            name: 'string'
          },
          specificationDTO: {
            id: 0,
            name: 'string'
          },
          starred: true
        }
      ],
      numberOfElements: 0,
      pageNumber: 0,
      pageSize: 0,
      totalElements: 0,
      totalPages: 0
    },
    message: 'string',
    subErrors: [
      {}
    ],
    timestamp: '2021-10-06T06:31:01.554Z'
  });

export const starAnnouncement = () => new Response(200);
export const addAnnouncementSpecifications = () => new Response(200);
export const deleteAnnouncementSpecifications = () => new Response(200);
