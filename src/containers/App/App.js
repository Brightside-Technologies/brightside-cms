import React from "react";
import {BrowserRouter as Router, Route, Switch, Redirect, withRouter} from "react-router-dom";
import PublicLayout from "../PublicLayout/PublicLayout";
import MainLayout from "../MainLayout/MainLayout";

function App() {
    return (
        <Switch>
            {/* 
                MainLayout component should be hidden under a private route
                only accessible if user is authorized
             */}
            <Route path="/private" component={MainLayout} />
            <Route path="/public" component={PublicLayout} />
            <Redirect from="/" to="/public/login" />
        </Switch>
    );
}

export default withRouter(App);
