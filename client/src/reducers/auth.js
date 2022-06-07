import { AUTH, LOGOUT } from '../constants/actionTypes';

const authReducer = (state={ authData:null },action) => {
    switch(action.type)
    {
       case AUTH: 
        if(action){ // Not null
            localStorage.setItem('profile',JSON.stringify({...action.data}));
            return {...state, authData: action.data}
        }
        return state;
        case LOGOUT:
            localStorage.clear();
        return {...state, authData:null};
        default:
           return state;
    }
}

export default authReducer;