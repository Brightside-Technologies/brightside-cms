import React from "react";
import {Button, Form, Grid, Header, Message, Segment} from "semantic-ui-react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import {withRouter} from "react-router";
import {connect} from "react-redux";

import cssHelpers from "../../helpers.module.css";

import {login} from "../../actions/authentication.actions";

export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "jdoe@email.com",
            password: "Pass123"
        };
    }

    handleLogin = (username, password) => {
        const {history, loginAction} = this.props;
        loginAction(username, password)
            .then(() => {
                history.push("/private/home");
            })
            .catch(error => {
                console.log("LOGIN_ERROR", error);
            });
    };

    render() {
        const {username, password} = this.state;

        return (
            <div className={`${cssHelpers["h-100"]}`}>
                <Grid
                    className={`${cssHelpers["h-100"]}`}
                    textAlign="center"
                    verticalAlign="middle">
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as="h2" color="yellow" textAlign="center">
                            {/* <Image src="/logo.png" />  */}
                            Log-in to your account
                        </Header>
                        <Form size="large">
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="E-mail address"
                                />
                                <Form.Input
                                    fluid
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder="Password"
                                    type="password"
                                />

                                <Button
                                    onClick={() => {
                                        this.handleLogin(username, password);
                                    }}
                                    color="yellow"
                                    fluid
                                    size="large">
                                    Login
                                </Button>
                            </Segment>
                        </Form>
                        <Message>
                            New to us?
                            <a href="#">Sign Up</a>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

Login.propTypes = {
    loginAction: PropTypes.func.isRequired,
    history: ReactRouterPropTypes.history.isRequired
};

const mapDispatchToProps = dispatch => ({
    loginAction: () => dispatch(login())
});

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(Login)
);
