import shortId from 'shortid';

export const inintialState ={
    mainPosts:[{
        id: 1,
        User: {
            id: 1,
            nickname: '제로초',
        },
        content: '첫번째 게시글 #해시태그 #익스프레스',
        Images: [{
            src: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile5.uf.tistory.com%2Fimage%2F9966F8355C937B7027C674',
        }, {
            src: 'https://cdn.interfootball.co.kr/news/photo/201902/280018_1.jpg',
        }, {
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSfGLD8YOm1iqH4pNFV-5Bpk_AuN8Oouriz8A&usqp=CAU',
        }, {
            src: 'http://www.busan.com/nas/wcms/wcms_data/photos/2019/03/21/2019032122302000279_m.jpg',
        }],
        Comments: [{
            User: {
                nickname: 'nero',                
            },
            content: '우와 개정판이 나왔군요',
        }, {
            User:{
                nickname: 'zero',                
            },
            content: '집에 가고싶어요',
        }]
    }],
    imagePaths:[], // 이미지 업로드 
    addPostLoading:false,
    addPostDone:false,
    addPostError:null,    
    addCommentLoading:false,
    addCommentDone:false,
    addCommentError:null,    
    uploadImagesLoading:false,
    uploadImagesDone:false,
    uploadImagesError:null,    
}


export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE'; // 동기 액션

export const addPost = (data) => {
    return {
        type: ADD_POST_REQUEST,
        data,
    }
}


export const addComment = (data) => {
    return {
        type: ADD_COMMENT_REQUEST,
        data,
    }    
}

const dumyPost = (data) => ({
    id: shortId.generate(),
    content: data,
    User: {
        id: 1,
        nickname: '제로초',        
    },
    Images: [],
    Comments: []
});

const dummyComment = (data) => ({
    id: shortId.generate(),
    content: data,
    User: {
        id: 1,
        nickname: '제로초',        
    },  
});

const reducer = (state = inintialState, action) => {
    switch (action.type) {
        case REMOVE_IMAGE: 
        return {
            ...state,
            imagePaths : imagePaths.filter((v, i) => i !== action.data),
        }
        case UPLOAD_IMAGES_REQUEST:
            return {
                ...state,
                uploadImagesLoading: true,
                uploadImagesDone: false,
                uploadImagesError: null,
            }            
        case UPLOAD_IMAGES_SUCCESS:             
            return {
                ...state,
                imagePaths: action.data,
                uploadImagesLoading: false,
                uploadImagesDone:true,                
            }
        case UPLOAD_IMAGES_FAILURE: 
            return {
                uploadImagesLoading:false,
                uploadImagesError:action.error,
            }
        case ADD_POST_REQUEST:
            return {
                ...state,
                addPostLoading: true,
                addPostDone: false,
                addPostError: null,
            }            
        case ADD_POST_SUCCESS:             
            return {
                ...state,
                mainPosts:[action.data, ...state.mainPosts],
                addPostLoading: false,
                addPostDone:true,
                imagePaths: [],                
            }
        case ADD_POST_FAILURE: 
            return {
                addPostLoading:false,
                addPostError:action.error,
            }

        case ADD_COMMENT_REQUEST:
            return {
                ...state,
                addCommentLoading: true,
                addCommentDone: false,
                addCommentError: null,
            }               
        case ADD_COMMENT_SUCCESS: {
            // PostId가 문자열이라서 === 비교 false
            const postIndex = state.mainPosts.findIndex((v)=> v.id === action.data.PostId );
            const post = {...state.mainPosts[postIndex]};
            // post.Comments = [dummyComment(action.data.content), ...post.Comments];
            post.Comments = [action.data.content, ...post.Comments];
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = post;            
            return {                
                ...state,
                mainPosts,
                mainPosts:[dumyPost(action.data), ...state.mainPosts],
                addCommentLoading: false,
                addCommentDone:true,                
            }
        }
        case ADD_COMMENT_FAILURE: 
            return {
                addCommentLoading:false,
                addCommentError:action.error,
            }
        case LOAD_POST_SUCCESS:
            return {
                ...state.addCommentDone,
                loadPostLoading : false,
                loadPostDone : true,
                singlePost : action.data
            }
        case LOAD_POST_FAILURE:
            return {
                loadPostLoading : false,
                loadPostError : action.error
            }
        case LOAD_POSTS_REQUEST:
        default: 
            return state;
        
    }
}

export default reducer;