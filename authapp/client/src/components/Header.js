import React, { Component } from 'react';
import logo from '../logo.svg';
import {Link} from 'react-router-dom';
export default class Header extends Component{
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{marginBottom:"40px"}}>
                 <Link className="navbar-brand" to="https://google.com" target="_blank" ><img src={logo} width="50" height="50" alt="google.com" />
          </Link>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Dashboard</Link>
                        </li>
                    </ul>


                    <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">Sign Up</Link>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/signin">Sign In</Link>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/signout">Sign Out</Link>
                        </li>
                    </ul>


                </div>
            </nav>
        )
    }
}