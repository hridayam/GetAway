//example
//import * from './filename goes here'; // so that you don't have to import from each file seperately

import { login } from './auth';

export { login };

import { register } from './reg';

export { register};


// export function loginRequired(request){
//   return{
//
//     type: 'LOAD_USER',
//     payload: api({url: `/users${id}`})
//   };
// }
//
// export const LoginUser = (username, password) =>
//    (dispatch, getState, api) => dispatch({
//      type: 'LOGIN_USER',
//      payload: api({
//        method: 'POST',
//        url: `/login`,
//        body: {username, password}
//      })
//    });
//
// }
