import { HYDRATE } from 'next-redux-wrapper';

export const inintialState = {   
    loadMyInfoLoading: false, // 유저 정보 가져오기 시도중
    loadMyInfoDone: false,
    loadMyInfoError: null,
    loadUserLoading: false, // 유저 정보 가져오기 시도중
    loadUserDone: false,
    loadUserError: null,
    followLoading: false, // 팔로우 시도중
    followDone: false,
    followError: null,
    unfollowLoading: false, // 언팔로우 시도중
    unfollowDone: false,
    unfollowError: null,
    logInLoading: false, // 로그인 시도중
    logInDone: false,
    logInError: null,
    logOutLoading: false, // 로그아웃 시도중
    logOutDone: false,
    logOutError: null,
    signUpLoading: false, // 회원가입 시도중
    signUpDone: false,
    signUpError: null,
    changeNicknameLoading: false, // 닉네임 변경 시도중
    changeNicknameDone: false,
    changeNicknameError: null,
    loadFollowingsLoading: false,
    loadFollowingsDone: false,
    loadFollowingsError: null,
    loadFollowersLoading: false,
    loadFollowersDone: false,
    loadFollowersError: null,
    removeFollowerLoading: false,
    removeFollowerDone: false,
    removeFollowerError: null,
    me: null,
    userInfo: null,
};

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

const dummyUser = (data) => ({
 ...data,
 nickanme: 'jbh',
 id: 1,
 Posts:[],
 Followings:[],
 Followers:[],   
})

export const loginRequestAction = (data) => {
    return {
        type: LOG_IN_REQUEST,
        data, 
    }
};
export const logoutRequestAction = () => {
    return {
        type: LOG_OUT_REQUEST,        
    }
};
const reducer = (state = inintialState, action) => {
    switch (action.type) {
        case REMOVE_FOLLOWER_REQUEST:
        return {
            ...state,
            removeFollowerLoading : true,
            removeFollowerError : null,
            removeFollowerDone : false,
        }
        case REMOVE_FOLLOWER_SUCCESS:
            return {
                ...state,
                removeFollowerLoading : false,
                me :{
                    ...state.me,
                    Followers : state.me.Followers.filter((v) => v.id !== action.data.UserId),
                },                
                removeFollowerDone : true,
            }
          case REMOVE_FOLLOWER_FAILURE:
            return {
                ...state,
                removeFollowerLoading : false,
                removeFollowerError : action.error,
            }
          case LOAD_FOLLOWINGS_REQUEST:
            return {
                ...state,
                loadFollowingsLoading : true,
                loadFollowingsError : null,
                loadFollowingsDone : false,
            }
          case LOAD_FOLLOWINGS_SUCCESS:
            return {
                ...state,
                loadFollowingsLoading : false,
                me : {
                    ...state.me,
                    Followings : action.data,
                },                
                loadFollowingsDone : true,
            }
          case LOAD_FOLLOWINGS_FAILURE:
            return {
                ...state,
                loadFollowingsLoading : false,
                loadFollowingsError : action.error,
            }
          case LOAD_FOLLOWERS_REQUEST:
            return {
                ...state,
                loadFollowersLoading : true,
                loadFollowersError : null,
                loadFollowersDone : false,
            }
          case LOAD_FOLLOWERS_SUCCESS:
            return {
                ...state,
                loadFollowersLoading : false,
                me : {
                    Followers : action.data,
                },
                loadFollowersDone : true,
            }
          case LOAD_FOLLOWERS_FAILURE:
            return {
                ...state,
                loadFollowersLoading : false,
                loadFollowersError : action.error,
            }
          case LOAD_MY_INFO_REQUEST:
            return {
                ...state,
                loadMyInfoLoading : true,
                loadMyInfoError : null,
                loadMyInfoDone : false,
            }
          case LOAD_MY_INFO_SUCCESS:
            return {
                ...state,
                loadMyInfoLoading : false,
                me : action.data,
                loadMyInfoDone : true,
            }
          case LOAD_MY_INFO_FAILURE:
            return {
                ...state,
                loadMyInfoLoading : false,
                loadMyInfoError : action.error,
            }
          case LOAD_USER_REQUEST:
            return {
                ...state,
                loadUserLoading : true,
                loadUserError : null,
                loadUserDone : false,
            }
          case LOAD_USER_SUCCESS:
            return {
                ...state,
                loadUserLoading : false,
                userInfo : action.data,
                loadUserDone : true,
            }
          case LOAD_USER_FAILURE:
            return {
                ...state,
                loadUserLoading : false,
                loadUserError : action.error,
            }
          case FOLLOW_REQUEST:
            return {
                ...state,
                followLoading : true,
                followError : null,
                followDone : false,
            }
          case FOLLOW_SUCCESS:
            return {
                ...state,
                followLoading : false,                
                me :{
                    // Followings: Followings.push({ id: action.data.UserId }),
                    Followings: [ ...state.me.Posts, { id: action.data.UserId }],
                },                 
                followDone : true,
            }
          case FOLLOW_FAILURE:
            return {
                ...state,
                followLoading : false,
                followError : action.error,
            }
          case UNFOLLOW_REQUEST:
            return {
                ...state,
                unfollowLoading : true,
                unfollowError : null,
                unfollowDone : false,
            }
          case UNFOLLOW_SUCCESS:
            return {
                ...state,
                unfollowLoading : false,
                me : {
                    Followings : state.me.Followings.filter((v) => v.id !== action.data.UserId),
                },
                unfollowDone : true,
            }
          case UNFOLLOW_FAILURE:
            return {
                ...state,
                unfollowLoading : false,
                unfollowError : action.error,
            }
        case LOG_IN_REQUEST : 
        return {
            ...state,        
            logInLoading: true,     
            logInError:null,
            logInDone:false,
        }
        case LOG_IN_SUCCESS : 
        return {
            ...state,         
            logInLoading: false,   
            logInDone:true,
            me: dummyUser(action.data),               
        }
        case LOG_IN_FAILURE : 
        return {
            ...state,         
            logInLoading: false,   
            logInDone: true,
            logInError: action.error,
            
        }        
        case LOG_OUT_REQUEST : 
        return {
            ...state,             
            logOutLoading: true,
            logOutDone: false,
            logOutError: null,
        }
        case LOG_OUT_SUCCESS : 
        return {
            ...state, 
            logOutLoading: false,
            logOutDone: true,
            me: null,
           
        }
        case LOG_OUT_FAILURE : 
        return {
            ...state,             
            logOutLoading: false,
            logOutError:action.error,
        }
        case SIGN_UP_REQUEST : 
        return {
            ...state,             
            signUpLoading: true,
            signUpDone: false,
            signUpError: null,
        }
        case SIGN_UP_SUCCESS : 
        return {
            ...state, 
            signUpLoading: false,
            signUpDone: ture,
        }
        case SIGN_UP_FAILURE : 
        return {
            ...state,             
            signUpLoading: false,
            signUpError:action.error,
        }
        case CHANGE_NICKNAME_REQUEST : 
        return {
            ...state,             
            changeNicknameLoading: true,
            changeNicknameDone: false,
            changeNicknameError: null,
        }
        case CHANGE_NICKNAME_SUCCESS : 
        return {
            ...state, 
            changeNicknameLoading: false,
            changeNicknameDone: ture,
        }
        case CHANGE_NICKNAME_FAILURE : 
        return {
            ...state,             
            changeNicknameLoading: false,
            changeNicknameError:action.error,
        }
        case ADD_POST_TO_ME:
            // draft.me.Posts.unshift({ id: action.data });
            // break;
        return {
                ...state,
                me: {
                    ...state.me,
                    Posts: [{ id: action.data }, ...state.me.Posts],
                },
                };
        case REMOVE_POST_OF_ME:
            // draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
            // break;
        return {
            ...state,
            me: {
                    ...state.me,
                    Posts: state.me.Posts.filter((v) => v.id !== action.data),
                },
            };
      
        default: 
            return state;
        
    }
}

export default reducer;