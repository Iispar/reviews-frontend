import homeService from '../../services/homeService';

// eslint-disable-next-line import/prefer-default-export
export const useGetHome = async (accountId) => {
  try {
    const res = homeService.getHome(accountId);
    return res;
  } catch (exception) {
    // TODO: ERROR MESSAGE
    console.log('wrong credentials');
  }
  return null;
};
