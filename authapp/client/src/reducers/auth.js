import { AUTH_SIGN_UP, AUTH_ERROR } from '../actions/types';
const DEFAULT_STATE = {
    isAuth      : false,
    token       : '',
    errorMsg    : '',
}

export default (state = DEFAULT_STATE, action) =>{
    switch(action.type){
            case AUTH_SIGN_UP:
                console.log("succes");
                return { ...state, token: action.payload, isAuthenticated: true, errorMsg: '' }
            case AUTH_ERROR:
                console.log("failed");
                return { ...state, errorMsg: action.payload }
            default:
                return false
    }
    return state;
};