/* eslint-disable import/prefer-default-export */
/**
 * Loads the users token and accountId from the localStorage.
 * @returns accounts id and token.
 */
export const useGetLocalStorage = () => {
  const newToken = window.localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
  const curAccountId = window.localStorage.getItem('accountId').replace(/^"(.*)"$/, '$1');
  return ({ newToken, curAccountId });
};
