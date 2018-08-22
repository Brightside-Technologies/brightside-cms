import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import PublicLayout from "../containers/PublicLayout/PublicLayout";
import MainLayout from "../containers/MainLayout/MainLayout";
import LayoutRoute from "./LayoutRoute";
import withAuthentication from "./withAuthentication";

import NotFound from "./NotFound";
import Login from "./Login/Login";
import Home from "../containers/Home/Home";

export default function Routes() {
    const MainLayoutWithAuth = withAuthentication(MainLayout);
    return (
        <Switch>
            <Route exact path="/">
                <Redirect to="/public/login" />
            </Route>
            <LayoutRoute layout={PublicLayout} path="/public/login" component={Login} exact />
            <LayoutRoute layout={MainLayoutWithAuth} path="/private/home" component={Home} exact />
            <LayoutRoute layout={PublicLayout} component={NotFound} />
        </Switch>
    );
}
