// ActionCreators -> create/return Action ({}) -> dispatched -> middlewares -> reducers 

import axios from 'axios';
import { 
    AUTH_SIGN_UP, 
    AUTH_SIGN_IN, 
    AUTH_ERROR,
    AUTH_SIGN_OUT,
    DASHBOARD_GET_DATA,
    AUTH_LINK_GOOGLE,
    AUTH_UNLINK_GOOGLE,
    AUTH_LINK_FACEBOOK,
    AUTH_UNLINK_FACEBOOK,
    HOME_GET_DATA,
 } from './types';


export const oauthGoogle = data => {
    return async dispatch => {
        // console.log(data);
        try{
            const res = await axios.post('http://localhost:5000/users/oauth/google', { access_token : data});
            dispatch({
                type: AUTH_SIGN_UP,
                payload: res.data
            });
            axios.defaults.headers.common['Authorization']=res.data.token;
            localStorage.setItem('JWT_TOKEN', res.data.token);
        } catch (err){
            console.log(err);
        };
    }
}

export const oauthFacebook = data => {
    return async dispatch => {
        // console.log(data);
        try{
            const res = await axios.post('http://localhost:5000/users/oauth/facebook', { access_token : data});
            console.log(res);
            dispatch({
                type: AUTH_SIGN_UP,
                payload: res.data
            });
            axios.defaults.headers.common['Authorization']=res.data.token;
            localStorage.setItem('JWT_TOKEN', res.data.token);
        }catch (err) {
            console.log(err);
        };
    }
}

export const signUp = data => {
    return async dispatch => {
        /*
        1) kirim data ke server dari form  input 
        2) ambil respon dari server
        3) tentukan user login || !login\
        4) simpan token ke localstorage
        */
    //    axios.post("http://localhost:5000/users/signup", { email : email, password : password});
        try{
            const res = await axios.post("http://localhost:5000/users/signup", data);
            dispatch({
                type: AUTH_SIGN_UP,
                payload: res.data
            });
            axios.defaults.headers.common['Authorization']=res.data.token;
            localStorage.setItem('JWT_TOKEN', res.data.token);
        }catch (err)  {
            // console.log(err);
            if(err){   
                dispatch({
                    type: AUTH_ERROR,
                    payload: "email already in use"
                });
            }
        }
    }
}


export const signIn = data => {
    return async dispatch => {
      try {
        let res = await axios.post('http://localhost:5000/users/signin', data);
        dispatch({
          type: AUTH_SIGN_IN,
          payload: res.data
        });
        axios.defaults.headers.common['Authorization']=res.data.token;
        localStorage.setItem('JWT_TOKEN', res.data.token);
      } catch(err) {
        dispatch({
          type: AUTH_ERROR,
          payload: 'Email and password combination isn\'t valid'
        })
      }
    };
  }


export const signOut = data => {
    return async dispatch => {
        // console.log(data);
        dispatch({
            type: AUTH_SIGN_OUT,
            payload: ''
        });
        axios.defaults.headers.common['Authorization']='';
        localStorage.removeItem('JWT_TOKEN');
    }
}


export const getDashboard = () => {
    return async dispatch => {
        try{
            const res = await axios.get('http://localhost:5000/users/secret');
            console.log(res.data.resource);
            dispatch({
                type: DASHBOARD_GET_DATA,
                payload: res.data
            });
        } catch(err){
            console.log(err);
        }
    }
}


export const linkGoogle = data => {
    return async dispatch => {
        // console.log(data);
        const res = await axios.post('http://localhost:5000/users/oauth/link/google', { access_token : data});
        console.log(res);
        dispatch({
            type : AUTH_LINK_GOOGLE,
            payload : res.data
        })
    }
}

export const unlinkGoogle = data => {
    return async dispatch => {
        // console.log(data);
        const res = await axios.post('http://localhost:5000/users/oauth/unlink/google');
        dispatch({
            type : AUTH_UNLINK_GOOGLE,
            payload : res.data
        })
    }
}

export const linkFacebook = data => {
    return async dispatch => {
        console.log(data);
        const res = await axios.post('http://localhost:5000/users/oauth/link/facebook', { access_token : data});
        dispatch({
            type : AUTH_LINK_FACEBOOK,
            payload : res.data
        })
    }
}

export const unlinkFacebook = data => {
    return async dispatch => {
        // console.log(data);
        const res = await axios.post('http://localhost:5000/users/oauth/unlink/facebook');
        dispatch({
            type : AUTH_UNLINK_FACEBOOK,
            payload : res.data
        })
    }
}

export const getTodoList = () => {
    return async dispatch => {
        try{
            const res = await axios.get('http://localhost:5000/users/todo/');
            console.log("action getTodoList", res.data);
            dispatch({
                type: HOME_GET_DATA,
                payload: res.data
            });
        } catch(err){
            console.log(err);
        }
    }
}