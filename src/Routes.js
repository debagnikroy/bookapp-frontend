import React from 'react';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Dashboard from "./user/UserDashboard";
import PrivateRoute from "./auth/PrivateRoute";
import MyCard from './core/MyCard';
import AddBook from './user/AddBook'
import Market from './core/Market';



const Routes=()=>{
    return(
    <BrowserRouter>
        <Switch>
            <Route path="/signin" exact component={Signin} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/" exact component={Signin} />            
            <Route path="/card" exact component={MyCard} />            
            <PrivateRoute path="/user/dashboard" exact component={Dashboard} />            
            <PrivateRoute path="/transferMarket" exact component={Market} />            
            <PrivateRoute path="/user/addBook" exact component={AddBook} />            
        </Switch>
    </BrowserRouter>
    )
}

export default Routes;
