import React, { Component } from 'react';
import logo from '../logo.svg';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Header extends Component{
    constructor(props){
        super(props);
        // console.log(this);
        this.signOut = this.signOut.bind(this);
    }
    signOut(){
        this.props.signOut();
    }
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{marginBottom:"40px"}}>
                 <Link className="navbar-brand" to="/" ><img src={logo} width="50" height="50" alt="google.com" />
          </Link>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>
                    </ul>

                    <ul className="nav navbar-nav ml-auto">
                    { !this.props.isAuth ?
                        [<li className="nav-item" key="signup">
                            <Link className="nav-link" to="/signup">Sign Up</Link>
                        </li>,
                        <li className="nav-item" key="signin">
                            <Link className="nav-link" to="/signin">Sign In</Link>
                        </li>]
                      : <li className="nav-item">
                      <Link className="nav-link" to="/signout" onClick={ this.signOut }>Sign Out</Link>
                      </li> }
                        
                    </ul>
                     


                </div>
            </nav>
        )
    }
}

function mapStateToProps(state){
    // console.log(state);
    return{
        isAuth : state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, actions)(Header);