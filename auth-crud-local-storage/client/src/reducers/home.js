import { HOME_GET_DATA  } from '../actions/types';

const DEFAULT_STATE = {
    data : '',
}

export default (state = DEFAULT_STATE, action) =>{
    switch(action.type){
            case HOME_GET_DATA:
                console.log("home action.payload", action.payload)
                return { ...state, data: action.payload.data }
            default:
                return state;
    }
};