const initialState = {
    userProfileImage : null,
    needLoad:false,
    url:null
} 

export default function image (state= initialState, action){
    switch(action.type){
        case 'USER_PROFILE_IMAGE' : return { 
            ...state,
            userProfileImage: action.payload
        }
        case 'NEED_LOAD' : return { 
            ...state,
            needLoad: true
        }
        case 'DONE_LOAD' : return { 
            ...state,
            needLoad: false
        }
        case 'GET_USER_PROFILE_IMAGE' : return {
            ...state,
            url:action.payload
        }
        default : return state;
    }
}