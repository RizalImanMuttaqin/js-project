import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import {Link} from 'react-router-dom';


import * as actions from '../actions';

 class Dashboard extends Component{

    async componentDidMount(){
        await this.props.getDashboard();
    }

    async componentDidUpdate(prevProps, prevState) {
// ???
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

    deleteTodo = async (id) => {
        // console.log(id);
        await this.props.deleteTodo(id);
        await this.props.getDashboard();
        ;
    }
    
    render(){
        return(
            <div>
                <div className="row">
                    <Link className="btn btn-info" to={"/create"}>Create Todo</Link>
                    {console.log("dashboard this.props",this.props)}
                    <table className="table table-striped" style={{marginTop:20}}>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Responsible</th>
                                <th>Priority</th>
                                <th>Create By</th>
                                <th>actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.todo <= 0
                                ? <tr><td colSpan="5" style={{textAlign:"center"}}>Data empty</td></tr>
                                : this.props.todo.map((todo, key) => (
                                    <tr key={key}>
                                        <td className={todo.todo_completed ? 'completed' : null }>{todo.todo_description}</td>
                                        <td className={todo.todo_completed ? 'completed' : null }>{todo.todo_responsible}</td>
                                        <td className={todo.todo_completed ? 'completed' : null }>{todo.todo_priority}</td>
                                        <td>
                                            <b>google</b> : { todo.create_by[0].google ? todo.create_by[0].google.name : null }<br/>
                                            <b>facebook</b> : { todo.create_by[0].facebook ? todo.create_by[0].facebook.name : null }<br/>
                                            <b>local</b>  : { todo.create_by[0].local ? todo.create_by[0].local.email : null }<br/>
                                        </td>
                                        <td>
                                            <Link className="btn btn-success" style={{color:"white"}} to={"/edit/"+todo._id}>Edit</Link>
                                            <input type="button" value="Delete" onClick={() => this.deleteTodo(todo._id)} className="btn btn-danger"/>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <div className="col" >
                        Link Your Account :
                        <div style={{marginBottom:"20px", marginTop:"10px"}}>
                            <FacebookLogin
                                appId="2548542715176230"
                                    isDisabled={this.props.methods.includes('facebook') ? true : false}
                                    textButton="facebook"
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
        todo : state.dash.data_todo,
        auth : state.auth,
        methods : state.dash.methods
    }
}

export default connect(mapStateToProps, actions)(Dashboard)