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

    unlinkGoogle = async () =>{
        await this.props.unlinkGoogle();
    }

    linkFacebook = async (res) =>{
        await this.props.linkFacebook(res.accessToken);
    }
    
    unlinkFacebook = async () =>{
        await this.props.unlinkFacebook();
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
                                isDisabled={this.props.methods.includes('facebook') ? true : false}
                                    textButton="Facebook"
                                    fields="name,email,picture"
                                    callback={this.linkFacebook}
                                    cssClass="btn btn-outline-primary"
                            />
                        </div>
                        <div>
                            <GoogleLogin 
                                clientId="640481382013-9mmt4q5v3i6j0d0euognelr3hl581tps.apps.googleusercontent.com"
                                disabled={this.props.methods.includes('google') ? true : false}
                                render={renderProps => (
                                    <button className="btn btn-outline-danger" onClick={renderProps.onClick} disabled={renderProps.disabled}>Google</button>
                                    )}
                                    onSuccess={this.linkGoogle}
                                    onFailure={this.linkGoogle}
                            />
                        </div>
                    </div>
                    <div className="col" >
                        Unlink Your Account :
                        <div style={{marginBottom:"20px", marginTop:"10px"}}>
                            <button 
                                style={{ marginRight: 15 }} 
                                className="btn btn-outline-primary" 
                                onClick={ () => this.unlinkFacebook() } 
                                disabled={ this.props.methods.includes('facebook') ? false : true }
                                >
                            Facebook
                            </button>
                        </div>
                        <div>
                        <button 
                            className="btn btn-outline-danger" 
                            onClick={ () => this.unlinkGoogle() }
                            disabled={ this.props.methods.includes('google') ? false : true }
                        >
                        Google
                        </button>
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