import { AUTH_SIGN_UP, AUTH_SIGN_IN, AUTH_ERROR, AUTH_SIGN_OUT } from '../actions/types';
const DEFAULT_STATE = {
    isAuthenticated : false,
    errorMsg    : '',
}

export default (state = DEFAULT_STATE, action) =>{
    switch(action.type){
            case AUTH_SIGN_UP:
                console.log("succes signup action payload : ", action.payload);
                return { ...state, isAuthenticated: true, errorMsg: '' }
            case AUTH_SIGN_IN:
                console.log("succes login");
                return { ...state, isAuthenticated: true, errorMsg: '' }
            case AUTH_SIGN_OUT:
                return { ...state, isAuthenticated: false, errorMsg: ''  }
            case AUTH_ERROR:
                console.log("failed login");
                return { ...state, errorMsg: action.payload }
            default:
                return state;
    }
};