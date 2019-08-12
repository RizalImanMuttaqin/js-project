import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from "./auth";
import dashboarReducer from "./dashboard";
export default combineReducers({
    form : formReducer,
    auth : authReducer,
    dash : dashboarReducer,
});