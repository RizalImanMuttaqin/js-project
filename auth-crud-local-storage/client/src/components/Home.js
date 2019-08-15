import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { isUndefined, isNull } from 'util';

class Home extends Component{
    async componentDidMount(){
        this.props.getTodoList();
    }
    render(){
        return (
            <div>
                <h3>Todo List</h3>
                <table className="table table-striped" style={{marginTop : 20 }}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Create By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.todo.data == 0
                            ? 'Loading list...'
                            : this.props.todo.data.map(todo => (
                                <tr>
                                    <td className={todo.todo_completed ? 'completed' : ''}>{todo.todo_description}</td>
                                    <td className={todo.todo_completed ? 'completed' : ''}>{todo.todo_responsible}</td>
                                    <td className={todo.todo_completed ? 'completed' : ''}>{todo.todo_priority}</td>
                                    <td>
                                        <b>google</b> : { todo.create_by[0].google ? todo.create_by[0].google.name : ''}<br/>
                                        <b>facebook</b> : { todo.create_by[0].facebook ? todo.create_by[0].facebook.name : ''}<br/>
                                        <b>local</b>  : { todo.create_by[0].local ? todo.create_by[0].local.email : '' }<br/>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
};

function mapStateToProps(state){
    console.log("state at home", state)
    return{
        todo: state.data,
    }
}

export default connect(mapStateToProps, actions)(Home)