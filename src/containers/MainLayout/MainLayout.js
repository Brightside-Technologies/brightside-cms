import React, {Fragment} from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import cssHelpers from "../../helpers.module.css";

import Home from "../Home/Home";
import Navbar from "../../components/Navbar/Navbar";

function MainLayout() {
    return (
        <Fragment>
            <Navbar />
            <main className={`${cssHelpers["mt-5"]} ${cssHelpers["pt-5"]}`}>
                <Switch>
                    <Route path="/private/home" component={Home} />
                    <Redirect from="/private" to="/private/home" />
                </Switch>
            </main>
        </Fragment>
    );
}

export default MainLayout;
