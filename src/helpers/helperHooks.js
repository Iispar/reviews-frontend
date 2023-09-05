/* eslint-disable import/prefer-default-export */
/**
 * Loads the users token and accountId from the localStorage.
 * @returns accounts id and token.
 */
export const useGetLocalStorage = () => {
  const token = window.localStorage.getItem('token');
  const accountId = window.localStorage.getItem('accountId');
  return ({ token, accountId });
};
