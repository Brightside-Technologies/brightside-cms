import React from "react";
import {Icon, Button, Form, Grid, Header, Divider, Segment} from "semantic-ui-react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import {withRouter} from "react-router";
import {connect} from "react-redux";

import cssHelpers from "../../helpers.module.css";

import {login, loginWithGoogle} from "../../actions/authentication.actions";

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

    handleLoginWithGoogle = () => {
        const {history, loginWithGoogleAction} = this.props;
        loginWithGoogleAction()
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
                            <Segment raised>
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
                        <Segment raised>
                            <Divider horizontal>OR LOG IN WITH</Divider>
                            <Button color="facebook">
                                <Icon name="facebook" /> Facebook
                            </Button>
                            <Button onClick={this.handleLoginWithGoogle} color="google plus">
                                <Icon name="google plus" /> Google Plus
                            </Button>
                        </Segment>
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
    loginAction: () => dispatch(login()),
    loginWithGoogleAction: () => dispatch(loginWithGoogle())
});

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(Login)
);
