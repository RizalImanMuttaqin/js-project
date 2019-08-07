import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import CreateTodo from "./components/create-todos-list.component";
import EditTodo from "./components/edit-todos-list.component";
import TodoList from "./components/todos-list.component";
import logo from "./logo.svg";
function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="https://google.com" target="_blank" ><img src={logo} width="30" height="30" alt="google.com" />
          </a>
          <Link to="/" className="navbar-brand">Todo App</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">Todos</Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Create Todos</Link>
              </li>
            </ul>
          </div>
        </nav>
        {/* <h3>Testing 123</h3> */}
        {/* <input className="form-control"></input> */}  
        <Route path="/" exact component={TodoList} />
        <Route path="/edit/:id" exact component={EditTodo} />
        <Route path="/create" exact component={CreateTodo} />
      </div>
    </Router>
  );
}

export default App;
