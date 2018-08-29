import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import PublicLayout from "../containers/PublicLayout/PublicLayout";
import MainLayout from "../containers/MainLayout/MainLayout";
import LayoutRoute from "./LayoutRoute";
import withAuthentication from "./withAuthentication";
import withRoleAuthorization from "./withRoleAuthorization";

import NotFound from "./NotFound";
import Login from "./Login/Login";
import SignUp from "./SignUp";
import Home from "../containers/Home/Home";
import AdminDashboard from "../containers/AdminDashbboard";

export default function Routes() {
    const MainLayoutWithAuth = withAuthentication(MainLayout);
    return (
        <Switch>
            <Route exact path="/">
                <Redirect to="/login" />
            </Route>
            <LayoutRoute layout={PublicLayout} path="/login" component={Login} exact />
            <LayoutRoute layout={PublicLayout} path="/signup" component={SignUp} exact />
            <LayoutRoute layout={MainLayoutWithAuth} path="/client/home" component={Home} exact />
            <LayoutRoute
                layout={MainLayoutWithAuth}
                path="/admin/home"
                component={withRoleAuthorization(["Admin"])(AdminDashboard)}
                exact
            />
            <LayoutRoute layout={PublicLayout} component={NotFound} />
        </Switch>
    );
}
