import axios from 'axios';
import redirect from './redirect';
import { setCookie, getCookie, removeCookie } from './session';

// export const signIn = async (email, password) => {
//   const error = validateCredentials(email, password);
//   if (error) {
//     return error;
//   }

//   const res = await authenticate(email, password);
//   if (!res.jwt) {
//     return res;
//   }

//   setCookie('jwt', res.jwt);
//   redirect('/user');
//   return null;
// };

// export const signUp = async (name, email, password, password_confirmation) => {
//   const error = validateNewUser(name, email, password, password_confirmation);
//   if (error) {
//     return error;
//   }

//   const res = await createUser(name, email, password, password_confirmation);

//   if (!res.data) {
//     return res;
//   }

//   setCookie('success', `${name}, your account was created.`);
//   redirect('/auth/login');
//   return null;
// };

export const signOut = (ctx = {}) => {
  if (process.browser) {
    removeCookie('jwt');
    redirect('/sign-in', ctx);
  }
};

export const authenticate = (name, plat) => {
  const url = `/api/auth/?plat=${plat}&name=${name}`;
  return axios.get(url);
};


export const getJwt = ctx => getCookie('jwt', ctx.req);

export const isAuthenticated = ctx => !!getJwt(ctx);

export const redirectIfAuthenticated = (ctx) => {
  if (isAuthenticated(ctx)) {
    redirect('/', ctx);
    return true;
  }
  return false;
};

export const redirectIfNotAuthenticated = (ctx) => {
  if (!isAuthenticated(ctx)) {
    redirect('/soldier', ctx);
    return true;
  }
  return false;
};
