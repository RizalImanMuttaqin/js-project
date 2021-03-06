import React, {Component} from 'react';
import axios from 'axios';

export default class EditTodosList extends Component{

    constructor(props){
        super(props);
        this.onChangeTodoDescription    = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible    = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority       = this.onChangeTodoPriority.bind(this);
        this.onChangeTodoCompleted       = this.onChangeTodoCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        }
    }

    componentDidMount(){
        const params = {
            id : this.props.match.params.id,
        }
        axios.get('http://localhost:4000/todos/'+params.id)
             .then( 
                res=>{
                 console.log(res.data);
                 this.setState({
                    todo_description    : res.data.todo_description,
                    todo_responsible    : res.data.todo_responsible,
                    todo_priority       : res.data.todo_priority,
                    todo_completed      : res.data.todo_completed,
                 });
             })
             .catch(function(err){
                 console.log(err);
             });
    }

    onChangeTodoDescription(e){
        this.setState({
            todo_description : e.target.value
        });
    }
    onChangeTodoResponsible(e){
        this.setState({
            todo_responsible : e.target.value
        });
        console.log(e.target.value);
    }
    onChangeTodoPriority(e){
        this.setState({
            todo_priority : e.target.value
        });
    }
    onChangeTodoCompleted(e){
        this.setState({
            todo_completed : !this.state.todo_completed
        });
        console.log(e.target.value);

    }

    onSubmit(e){
        e.preventDefault();
        console.log(`Form Submited`);
        console.log(`Todo Description   : ${this.state.todo_description}`);
        console.log(`Todo Responsible   : ${this.state.todo_responsible}`);
        console.log(`Todo Priority      : ${this.state.todo_priority}`);
        console.log(`Todo Complete      : ${this.state.todo_completed}`);

        const newTodo = {
            todo_description : this.state.todo_description,
            todo_responsible : this.state.todo_responsible,
            todo_priority    : this.state.todo_priority,
            todo_completed   : this.state.todo_completed,
        }
        const params = {
            id : this.props.match.params.id,
        }
        axios.post("http://localhost:4000/todos/update/"+params.id, newTodo)
        .then(res => console.log(res.data));
        this.props.history.push('/');
    }

    render(){
        return(
            <div>
                <h3>Edit Todos </h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                               className="form-control"
                               value    = {this.state.todo_description}
                               onChange = {this.onChangeTodoDescription} />
                        <label>Responsible: </label>
                        <input type="text"
                               className="form-control"
                               value    = {this.state.todo_responsible}
                               onChange = {this.onChangeTodoResponsible} />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className   ="form-check-input"
                                    type        ="radio"
                                    name        ="priorityOptions"
                                    value       ="Low"
                                    checked     ={this.state.todo_priority=="Low"}
                                    onChange    ={this.onChangeTodoPriority}/>
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className   ="form-check-input"
                                    type        ="radio"
                                    name        ="priorityOptions"
                                    value       ="Medium"
                                    checked     ={this.state.todo_priority=="Medium"}
                                    onChange    ={this.onChangeTodoPriority}/>
                            <label className="form-check-label"> Medium </label>
                            </div>
                        <div className="form-check form-check-inline">
                            <input  className   ="form-check-input"
                                    type        ="radio"
                                    name        ="priorityOptions"
                                    value       ="High"
                                    checked     ={this.state.todo_priority=="High"}
                                    onChange    ={this.onChangeTodoPriority}/>
                            <label className="form-check-label"> High </label>
                        </div>
                        <div className="form-check">
                        <input  type="checkbox"
                                className="form-check-input"
                                id="completedCheckbox"
                                name="completedCheckbox"
                                onChange={this.onChangeTodoCompleted}
                                checked={this.state.todo_completed}
                                value={this.state.todo_completed}/>
                                <label className="form-check-label" htmlFor="completedCheckbox">
                                    Completed
                                </label>
                        </div>  
                    </div>
                   
                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}