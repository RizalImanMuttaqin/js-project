// ActionCreators -> create/return Action ({}) -> dispatched -> middlewares -> reducers 

import axios from 'axios';
import { AUTH_SIGN_UP, AUTH_ERROR } from './types';

export const signUp = data => {
    return async dispatch => {
        /*
        1) kirim data ke server dari form  input 
        2) ambil respon dari server
        3) tentukan user login || !login\
        4) simpan token ke localstorage
        */
    //    axios.post("http://localhost:5000/users/signup", { email : email, password : password});
    axios.post("http://localhost:5000/users/signup", data)
       .then( (res) => {
            // console.log(res); //step one
            dispatch({
                type: AUTH_SIGN_UP,
                payload: res.data.token
            })
            localStorage.setItem('JWT_TOKEN', res.data.token);
       }).catch( (err) => {
            // console.log(err);   
            dispatch({
                type: AUTH_ERROR,
                payload: "email already in use"
            });
       })
       ;

    }
}