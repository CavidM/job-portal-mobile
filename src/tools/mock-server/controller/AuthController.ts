import { Request, Response } from 'miragejs';

export const authRequest = () => ({
  success: true,
  data: {
    fin: '6hmhm0s',
    bithdate: '07/08/1997'
  }
});

export const refreshToken = (schema: any, request: Request) => {
  const { refreshToken: authRefreshToken } = JSON.parse(request.requestBody);

  if (authRefreshToken === 'wrong refresh token') {
    return new Response(400);
  }

  return new Response(200, {}, {
    data: {
      refreshToken: 'mock refresh token',
      token: 'mock token'
    },
    message: null,
    subErrors: null,
    timestamp: '04.08.2021 10:32:50'
  });
};

export const validateToken = (schema: any, request: Request) => {
  const header = request.requestHeaders;

  if (header.Authorization.length < 10) {
    return new Response(400);
  }

  return new Response(200);
};
