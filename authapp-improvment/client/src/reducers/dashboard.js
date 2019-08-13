import { DASHBOARD_GET_DATA } from '../actions/types';

const DEFAULT_STATE = {
    secret    : '',
    methods   : [],
}

export default (state = DEFAULT_STATE, action) =>{
    switch(action.type){
            case DASHBOARD_GET_DATA:
                console.log("try to get data secret");
                // console.log("action", action.payload)
                return { ...state, secret: action.payload.resource, methods: action.payload.methods }
            default:
                return state;
    }
};