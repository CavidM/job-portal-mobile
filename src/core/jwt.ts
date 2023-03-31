import { Buffer } from 'buffer/';

export const getUserType = (token: string) => {
  const parts = token
    .split('.')
    .map((part) => Buffer.from(
      part.replace(/-/g, '+')
        .replace(/_/g, '/'), 'base64'
    )
      .toString());

  const payload = JSON.parse(parts[1]);

  // uncomment it for mocking user type
  // return 'C';

  return payload.authorities[0].authority.split('_')[1];
};
