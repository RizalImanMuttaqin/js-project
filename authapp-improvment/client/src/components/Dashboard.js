import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';


import * as actions from '../actions';

 class Dashboard extends Component{

    async componentDidMount(){
        this.props.getDashboard();
    }

    linkGoogle = async (res) =>{
        await this.props.linkGoogle(res.accessToken);
    }

    linkFacebook = async (res) =>{
        await this.props.linkFacebook(res.accessToken);
    }

    render(){
        return(
            <div>
            This is a Dashboard component
                <br/>
                Our Secret : <br/>
                <h3>
                    { this.props.secret   }
                </h3>
                <br/>
                <div className="row">
                    <div className="col" >
                        Link Your Account :
                        <div style={{marginBottom:"20px", marginTop:"10px"}}>
                            <FacebookLogin
                                appId="2548542715176230"
                                autoLoad={false}
                                textButton="facebook"
                                fields="name, email, picture"
                                callback={this.linkFacebook}
                                size="small"
                                isDisabled={ this.props.methods.includes('facebook') ? true : false }

                            />
                        </div>
                        { console.log("state on view", this.props.methods) }

                        <div>
                            <GoogleLogin
                                clientId="640481382013-9mmt4q5v3i6j0d0euognelr3hl581tps.apps.googleusercontent.com"
                                buttonText="Google"
                                // fields="name, email, picture"
                                onSuccess={this.linkGoogle}
                                onFailure={this.linkGoogle}
                                disabled={ this.props.methods.includes('google') ? true : false }
                            />
                        </div>
                    </div>
                    <div className="col" >
                        Unlink Your Account :
                        <div style={{marginBottom:"20px", marginTop:"10px"}}>
                            <FacebookLogin
                                appId="2548542715176230"
                                autoLoad={false}
                                textButton="facebook"
                                fields="name, email, picture"
                                callback={this.linkFacebook}
                                size="small"
                                isDisabled={ this.props.methods.includes('facebook') ? false : true }

                            />
                        </div>
                        <div>
                            <GoogleLogin
                                clientId="640481382013-9mmt4q5v3i6j0d0euognelr3hl581tps.apps.googleusercontent.com"
                                buttonText="Google"
                                // fields="name, email, picture"
                                onSuccess={this.linkGoogle}
                                onFailure={this.linkGoogle}
                                disabled={ this.props.methods.includes('google') ? false : true }
                            />
                        </div>
                    </div>

                </div>
            </div>

        )
    }
};

function mapStateToProps(state){
    console.log(state)
    return{
        secret: state.dash.secret,
        auth : state.auth,
        methods : state.dash.methods
    }
}

export default connect(mapStateToProps, actions)(Dashboard)