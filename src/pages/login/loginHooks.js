export const UseLogin = (username, password) => {
  console.log(`Login with username: ${username}, password: ${password}`);

  return true;
};

export const UseCreateAccount = (username, name, email, password) => {
  console.log(`New account with username: ${username}, name: ${name}, email: ${email}, password: ${password}`);

  return true;
};
