import { DASHBOARD_GET_DATA, AUTH_LINK_GOOGLE, AUTH_LINK_FACEBOOK, AUTH_UNLINK_GOOGLE, AUTH_UNLINK_FACEBOOK  } from '../actions/types';

const DEFAULT_STATE = {
    secret    : '',
    methods   : [],
}

export default (state = DEFAULT_STATE, action) =>{
    switch(action.type){
            case AUTH_LINK_GOOGLE:
                // console.log("try to link google");
                // console.log("action", action.payload)
                return { ...state, methods: action.payload.methods }
            case AUTH_LINK_FACEBOOK:
                // console.log("try to link facebook");
                // console.log("action", action.payload)
                return { ...state, methods: action.payload.methods }
            case AUTH_UNLINK_GOOGLE:
                // console.log("try to link google");
                // console.log("action", action.payload)
                return { ...state, methods: action.payload.methods }
            case AUTH_UNLINK_FACEBOOK:
                // console.log("try to link facebook");
                // console.log("action", action.payload)
                return { ...state, methods: action.payload.methods }
            case DASHBOARD_GET_DATA:
                console.log("try to get data secret");
                // console.log("action", action.payload)
                return { ...state, secret: action.payload.resource, methods: action.payload.methods }
            default:
                return state;
    }
};