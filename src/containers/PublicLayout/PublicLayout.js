import React, {Fragment} from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import Login from "../../components/Login/Login";
import cssHelpers from "../../helpers.module.css";

const PublicLayout = () => {
    return (
        <Fragment>
            <main className={cssHelpers["bg-gradient"]}>
                <Switch>
                    <Route path="/public/login" render={props => <Login {...props} />} />
                    <Redirect from="/public" to="/public/login" />
                </Switch>
            </main>
        </Fragment>
    );
};

export default PublicLayout;
