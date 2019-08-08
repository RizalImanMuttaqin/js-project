import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import CustomInput from './CustomInput'
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../actions';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

class SignUp extends Component{
    constructor(props){
        super(props);
        // console.log(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async onSubmit(formData){
        // console.log("submit", formData);
        // we call action create
        // console.log(this.props.signUp);
       this.props.signUp(formData).then( (res) => {
        //    console.log(res);
        });
    }

    responseGoogle(res){
        console.log("google", res);
    }
    
    responseFacebook(res){
        console.log("facebook", res);
    }

    render(){
        const { handleSubmit } = this.props;
        return(
            <div className="row">
                <div className="col">
                    <form onSubmit={ handleSubmit(this.onSubmit) }>
                        <fieldset>
                            <Field
                                name="email"
                                type="text"
                                id="email"
                                label = "Enter your email"
                                placeholder="example@example.com"
                                component={ CustomInput } />
                        </fieldset>
                        <fieldset>
                            <Field
                                name="password"
                                type="password"
                                label="Enter your password"
                                placeholder="yourpassword"
                                id="password"
                                component={ CustomInput } />
                        </fieldset>

                        { this.props.errorMsg ? 
                            <div className="alert alert-danger">
                              { this.props.errorMsg }  
                            </div> 
                        : null}
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </form>
                </div>
                <div className="col">
                    <div className="text-center">
                        <div className="alert alert-primary" >
                            Or Sign Up with 
                        </div>
                        {/* <button className="btn btn-primary" style={{marginRight:"20px"}}><span className="fa fa-facebook"></span> Facebook</button>
                        <button className="btn btn-danger"><span className="fa fa-google"></span> Google</button> */}
                        <div style={{marginBottom:"20px"}}>
                            <FacebookLogin
                                appId="2548542715176230"
                                autoLoad={false}
                                textButton="facebook"
                                fields="name, email, picture"
                                callback={this.responseFacebook}
                                size="small"
                                />
                        </div>
                        <div>
                            <GoogleLogin
                                clientId="640481382013-9mmt4q5v3i6j0d0euognelr3hl581tps.apps.googleusercontent.com"
                                textButton="google"
                                // fields="name, email, picture"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                 />
                        </div>
                        
                    </div>

                </div>
            </div>
        )
    }
};

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({form : 'signup'})
)(SignUp)

function mapStateToProps (state){
    return {
        errorMsg: state.auth.errorMsg
    }
}
// (SignUp)
// reduxForm({form : 'signup'})(SignUp);