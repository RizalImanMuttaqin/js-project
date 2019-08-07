import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Todo = props =>(
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
        <td>
            <Link className="btn btn-success" style={{color:"white"}} to={"/edit/"+props.todo._id}>Edit</Link>
               <input type="button" value="Delete" onClick={()=>props.delete(props.todo._id)} className="btn btn-danger"/>
        </td>
    </tr>
)

export default class TodosList extends Component{
    constructor(props){
        super(props);
        // this.deleteTodo  = this.deleteTodo.bind(this);
        this.state = {
            todos : [],
            id    : '',
        };
    }

    componentDidMount(){
        axios.get('http://localhost:4000/todos')
             .then(res=>{
                 this.setState({todos: res.data});
             })
             .catch(function(err){
                 console.log(err);
             });
    }
    componentDidUpdate(){
        axios.get('http://localhost:4000/todos')
             .then(res=>{
                 this.setState({todos: res.data});
             })
             .catch(function(err){
                 console.log(err);
             });
    }

    todoList(){
        var self = this;
        return this.state.todos.map(function(current, i){
            return <Todo todo={current} key={i} delete={self.deleteTodo} />;
            // return <Todo todo={current} key={i}  />;
        });
    }

    deleteTodo(id){
        // e.preventDefault();
        // console.log(id);
        axios.post("http://localhost:4000/todos/delete", {"_id": id})
        .then(res => console.log(res.data));
    }
    

    render(){
        return(
            <div>
                <h3>Todo List</h3>
                <table className="table table-striped" style={{marginTop : 20 }}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}