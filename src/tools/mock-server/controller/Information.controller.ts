import { Request, Response } from 'miragejs';
import { professionsList } from '../data/informationProfessions.data';

export const informationCities = () => new Response(200, {}, {
  message: null,
  data: [
    {
      id: 1,
      name: 'Baku'
    },
    {
      id: 2,
      name: 'Gəncə'
    }
  ],
  timestamp: '26.07.2021 11:57:10',
  subErrors: null
});

export const informationExperiences = () => new Response(200, {}, {
  message: null,
  data: [
    { value: '0-3 il', key: '0-3' },
    { value: '0-6 il', key: '0-6' },
    { value: '6-10 il', key: '6-10' }
  ],
  timestamp: '26.07.2021 11:57:10',
  subErrors: null
});

export const informationProfessions = () => new Response(200, {}, {
  message: null,
  data: professionsList,
  pageSize: 3,
  pageNumber: 0,
  numberOfElements: 3,
  totalPages: 0,
  totalElements: 0,
  timestamp: '26.07.2021 14:41:21',
  subErrors: null
});

export const informationSearchProfession = (schema: any, request: Request) => {
  const { name } = request.queryParams;

  let data = professionsList;

  if (name) {
    data = data.filter((item) => item.name.toLowerCase().search(name) > -1);
  }

  return new Response(200, {}, {
    message: null,
    data: {
      data,
      pageSize: 3,
      pageNumber: 0,
      numberOfElements: 3,
      totalPages: 0,
      totalElements: 0
    },
    timestamp: '26.07.2021 14:41:21',
    subErrors: null
  });
};

const data1 = [{
  id: 3,
  name: 'Kateqoriya A'
},
{
  id: 4,
  name: 'Kateqoriya B'
},
{
  id: 5,
  name: 'Kateqoriya C'
}];
const data2 = [{
  id: 6,
  name: 'Kateqoriya D'
},
{
  id: 7,
  name: 'Kateqoriya E'
}];
export const informationSpecificationsProfession = (schema: any, request: Request) => {
  const { professionId } = request.params;

  let data: any[] = [];

  switch (professionId) {
    case '1': {
      data = data1;
      break;
    }
    case '2': {
      data = data2;
      break;
    }
    default: {
      data = [];
      break;
    }
  }

  return {
    message: null,
    data,
    timestamp: '26.07.2021 14:43:15',
    subErrors: null
  };
};
export const getInformationSpecifications = () => new Response(200, {},
  {
    data: [
      {
        id: 0,
        name: 'string'
      }
    ],
    message: 'string',
    subErrors: [
      {}
    ],
    timestamp: '2021-10-10T21:37:59.757Z'
  });
