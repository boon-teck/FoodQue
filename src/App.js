import './App.css';
import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Navigation from './components/navigation/Navigation'
import Taskerhome from "./components/user/Taskerhome";
import Register from "./components/user/Register";
import Login from "./components/user/LoginPage";
import TestTask from "./components/tasker/TestTask"
import Axios from "axios";
import SubmitTask from "./components/user/SubmitTask";

function App() {

    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState(null);

    //useeffect to get user details
    // useEffect(() => {

        // async function userDetails() {
        //     //not sure if it will work with django
        //     try {
        //         let {data} = await Axios.get("/auth/api/user", {
        //             headers: {
        //                 authorization: `Bearer ${localStorage.access}`
        //             }
        //         })
        //
        //         await setAuth(true)
        //         await setUser(data.user)
        //     } catch (e) {
        //         await setAuth(false)
        //         await setUser(null)
        //         localStorage.removeItem("access")
        //     }
        // }

        // userDetails()


    // }, [auth])




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
            <Route path="/submit">
                <SubmitTask />
            </Route>
            <Route path="/testtask">
                <TestTask />
            </Route>
            {/*<PrivateRoute path="/tasker/home" Component={Taskerhome} auth={auth} exact />*/}
            <Route path="/tasker/home">
                <Taskerhome auth={auth} exact/>
            </Route>
            <Route path= "*" >
               Page do not exist yet
            </Route>
        </Switch>
    </Router>
  )
}

function PrivateRoute({auth, Component, path, location, ...rest}){
    console.log(auth)
    return(
        <>
        { (auth) ? <Route path={path}> <Component auth={auth} {...rest}/></Route> :
            <Redirect to={{
                pathname: "/login",
                state: {from: location}
            }}/>
        }
        </>
    )}



export default App;
