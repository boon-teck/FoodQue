import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navigation from './components/navigation/Navigation'
import Taskerhome from "./components/main_pages/Taskerhome";
import Test from "./components/main_pages/Test";
import Register from "./components/main_pages/Register";
import Login from "./components/main_pages/LoginPage";

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
            <Route path="/test" exact>
                <Test />
            </Route>
            <Route path="/tasker/home">
                <Taskerhome />
            </Route>
        </Switch>
    </Router>
  )
}

export default App;
