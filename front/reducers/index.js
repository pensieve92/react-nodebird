import { HYDRATE } from 'next-redux-wrapper';

import user from './user';
import post from './post';
import { combineReducers } from 'redux';

// const inintialState ={
//    user: {
    
//    },
//    post: {
       
//    },
// }



const rootReducer = (state, action) => {
  switch (action.type){
       case HYDRATE :               // 서버사이드렌더링 결과를 HYDRATE에서 받는다.
            console.log('HYDRATE', HYDRATE);
            return action.payload;
      default: {
          const combineReducer = combineReducers({
              user,
              post,
          });
          return combineReducer(state, action);
      }
  }
};
   
// HYDRATE 설정 다시 위^
// const rootReducer = combineReducers({
//     index: (state = {}, action) => {
//         switch (action.type) {
//             case 'HYDRATE' :    // 서버사이드렌더링 결과를 HYDRATE에서 받는다.
//                 console.log('HYDRATE', action);
//                 return {...state, ...action.payload};
//             default:
//                 return state;
//         }
//     },    
//     user, 
//     post,
// })

export default rootReducer;