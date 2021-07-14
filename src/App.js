import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navigation from './components/navigation/Navigation'
import Taskerhome from "./components/user/Taskerhome";
import Register from "./components/user/Register";
import Login from "./components/user/LoginPage";

function App() {
  return (
    <Router>
        <Navigation />
        <Switch>
            <Route path="/" exact>
                <div>Landing page</div>
            </Route>
            <Route path="/login" exact>
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
            <Route path="/tasker/home">
                <Taskerhome />
            </Route>
        </Switch>
    </Router>
  )
}

export default App;
