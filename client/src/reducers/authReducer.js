const initialState = {
    token: localStorage.getItem("hrms"),
    isAuthenticated: null,
    user: null,
  };

export default function authReducer (state = initialState , action) { 
      switch(action.type) {
          case 'SIGN_UP' : 
          case 'LOGIN' :
            localStorage.setItem('hrms',action.payload.token)
            return {
                isAuthenticated:true,
                user: action.payload.user,
                token: action.payload.token
            }
          case 'GETPROFILE' : 
            localStorage.getItem('hrms')
            return {
                ...state,
                isAuthenticated:true,
                user: action.payload
            }
          case 'LOGOUT': 
          case 'DELETE_PROFILE' :
          localStorage.removeItem('hrms')
          return {
            token:null,
            isAuthenticated: false,
            user: null,
          };
          case 'EDIT_PROFILE' :
            return {
              ...state,
              isAuthenticated:true,
              user: action.payload
          }
          case 'PROFILE_IMAGE_UPDATE' :
            return {
              ...state,
              user: action.payload
          }
          default : return state;
      }
  }
  
  // if empty string, than false