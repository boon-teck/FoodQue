import './App.css';
import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Navigation from './components/navigation/Navigation'
import Taskerhome from "./components/tasker/Taskerhome";
import Register from "./components/user/Register";
import Login from "./components/user/LoginPage";
import TestTask from "./components/tasker/TestTask"
import Axios from "./utilz/Axios";
import SubmitTask from "./components/user/SubmitTask";
import SingleTask from "./components/tasker/SingleTask";
import SingleTaskCard from "./components/tasker/SingleTaskCard";
import SingleUserShowAll from "./components/user/SingleUserShowAll";

function App() {

    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // useeffect to get user details
    useEffect(() => {

        async function userDetails() {
            //not sure if it will work with django
            try {
                let {data} = await Axios.get("http://127.0.0.1:8000/auth/api/user")
                console.log(data)

                await setAuth(true)
                await setUser(data.username)
                setLoading(false)
            } catch (e) {
                await setAuth(false)
                await setUser(null)
                localStorage.removeItem("access")
            }
        }

        userDetails()


    }, [auth])




    return (
    <Router>
        <Navigation auth={auth} setAuth={setAuth} user={user}/>
        <Switch>
            <Route path="/" exact>
                <div>Landing page</div>
                {console.log(auth)}
            </Route>
            <Route path="/login" exact>
                <Login setAuth={setAuth} />
            </Route>
            <Route path="/register">
                <Register setAuth={setAuth} />
            </Route>
            {/*<Route path="/submit">*/}
            {/*    <SubmitTask />*/}
            {/*</Route>*/}
            <Route path="/testtask">
                <TestTask />
            </Route>
            <PrivateRoute path="/tasker/home" loading={loading} Component={Taskerhome} auth={auth} exact />
            <PrivateRoute path="/task/show/:id" loading={loading} Component={SingleTask} auth={auth} exact />
            <PrivateRoute path="/submit" loading={loading} Component={SubmitTask} auth={auth} exact />
            <PrivateRoute path="/user/tasks" loading={loading} Component={SingleUserShowAll} auth={auth} username={user} exact />

            {/*<PrivateRoute path="/submit" Component={SubmitTask} auth={auth} exact />*/}

            {/*<Route path="/tasker/home">*/}
            {/*    <Taskerhome auth={auth} exact/>*/    }
            {/*</Route>*/}
            <Route path= "*" >
                401 | Page do not exist yet
            </Route>
        </Switch>
    </Router>
  )
}

function PrivateRoute({auth, loading, Component, path, location, ...rest}){
    console.log(auth)
    if(loading){
        return <div>Loading</div>
    }
    return(
        <>
        { (auth) ? <Route path={path}> <Component auth={auth} {...rest}/></Route> :
            <Redirect to={{
                pathname: "/user/tasks",
                state: {from: location}
            }}/>
        }
        </>
    )}



export default App;
