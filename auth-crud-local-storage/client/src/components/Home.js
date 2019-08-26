import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Home extends Component{
    async componentDidMount(){
        this.props.getTodoList();
    }
    render(){
        return (
            <div>                
                <h3>Todo List</h3>
                <table className="table table-striped" style={{marginTop:20}}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Create By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.todo.data <= 0
                            ? <tr><td colSpan="4" style={{textAlign:"center"}}>Data empty</td></tr>
                            : this.props.todo.data.map((todo, key) => (
                                <tr key={key}>
                                    <td className={todo.todo_completed ? 'completed' : null }>{todo.todo_description}</td>
                                    <td className={todo.todo_completed ? 'completed' : null }>{todo.todo_responsible}</td>
                                    <td className={todo.todo_completed ? 'completed' : null }>{todo.todo_priority}</td>
                                    <td>
                                        {/* <b>google</b> : { todo.create_by[0].google ? todo.create_by[0].google.name : null }<br/>
                                        <b>facebook</b> : { todo.create_by[0].facebook ? todo.create_by[0].facebook.name : null }<br/>
                                        <b>local</b>  : { todo.create_by[0].local ? todo.create_by[0].local.email : null }<br/> */}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        )
    }
};

function mapStateToProps(state){
    return{
        todo: state.data,
    }
}

export default connect(mapStateToProps, actions)(Home)