type RemoveSpaces = (str: string) => string
type AddPrefix = (prefix: string | number) => (text: string) => string

export const removeSpaces: RemoveSpaces = (str) => str.replace(/\s/g, '');

export const addPrefix: AddPrefix = (prefix) => (str) => `${prefix}${str}`;

export const pipe = (
  ...functions: any
) => (
  args: any
) => functions.reduce((arg: any, fn: any) => fn(arg), args);
