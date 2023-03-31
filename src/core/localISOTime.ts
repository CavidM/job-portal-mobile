const tzOffset = (new Date()).getTimezoneOffset() * 60000;
export const localISOTime = (new Date(Date.now() - tzOffset)).toISOString().slice(0, -1);
