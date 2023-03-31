import { Request, Response } from 'miragejs';
import Schema from 'miragejs/orm/schema';
import { getUserData } from './User.data';

export const getUser = (schema: Schema, request: Request) => {
  const header = request.requestHeaders;

  if (!header?.Authorization) {
    return new Response(400);
  }

  return new Response(200, {},
    {
      message: null,
      data: getUserData,
      timestamp: '05.08.2021 10:17:46',
      subErrors: null
    });
};

export const putUser = () => new Response(200, {}, {
  message: null,
  data: {
    token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjM0NTZjIiwiZXhwIjoxNjMyMzk2OTE2LCJpYXQiOjE2MzIzMTA1MTYsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJST0xFX0MifV0sInN0YXR1cyI6IkFDVElWRSJ9.qtbp6WsTbBXA9cTm9VXKXbY_SgXi-ejc1dbA1WPrUwIuCJ40nYs0wZ4Hsv4Zbj0hA0GHwFYiRig6jVRFsBUOqw',
    refreshToken: 'f8477f8d-87f7-49f9-b4e0-346cc1532dcd'
  },
  timestamp: '03.08.2021 10:46:08',
  subErrors: null
});

export const postUser = () => new Response(200, {}, {
  success: true,
  data: {
    phone: '557115061'
  }
});

export const registerViaAsan = () => new Response(200, {}, {
  success: true,
  data: {
    authority: 'B',
    birthDate: null,
    fatherName: 'John',
    fin: 'fytghj7',
    firstName: 'Alakbarov',
    gender: null,
    cityId: 1,
    id: 76576,
    lastName: 'Doe',
    phoneNumber: '+99455867676'
  },
  message: 'string',
  subErrors: [
    {}
  ],
  timestamp: '2021-11-24T12:57:36.195Z'
});
/**
 * 409 -> in case of C-> B ( Profession does not exists )
 * any success status code (i.e 200) -> succesfully changed
 * any error status code -> unknown error
 */
export const switchUser = () => new Response(409);
