import React from "react";
import {Icon, Button, Form, Grid, Header, Divider, Segment} from "semantic-ui-react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import {withRouter} from "react-router";
import {connect} from "react-redux";

import cssHelpers from "../../helpers.module.css";

import {login, loginWithGoogle} from "../../actions/authentication.actions";
import {getUserByUid} from "../../actions/users.actions";
export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            isLoading: false
        };
    }

    handleLogin = (email, password) => {
        const {history, loginAction, getUserByUidAction} = this.props;
        loginAction(email, password)
            .then(response => {
                return getUserByUidAction(response.user.uid);
            })
            .then(response => {
                history.push(`/${response.Role.toLowerCase()}/home`);
            })
            .catch(error => {
                console.log("LOGIN_ERROR", error);
            });
    };

    handleLoginWithGoogle = () => {
        const {history, loginWithGoogleAction, getUserByUidAction} = this.props;
        loginWithGoogleAction()
            .then(response => {
                return getUserByUidAction(response.user.uid);
            })
            .then(response => {
                history.push(`/${response.Role.toLowerCase()}/home`);
            })
            .catch(error => {
                console.log("LOGIN_ERROR", error);
            });
    };

    handleEmailChange = email => {
        this.setState({email});
    };

    handlePasswordChange = password => {
        this.setState({password});
    };

    render() {
        const {email, password, isLoading} = this.state;
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
                                    onChange={ev => {
                                        this.handleEmailChange(ev.target.value);
                                    }}
                                    fluid
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="E-mail address"
                                />
                                <Form.Input
                                    onChange={ev => {
                                        this.handlePasswordChange(ev.target.value);
                                    }}
                                    fluid
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder="Password"
                                    type="password"
                                />
                                <Button
                                    disabled={!email || !password}
                                    loading={isLoading}
                                    onClick={() => {
                                        this.handleLogin(email, password);
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
                            <Button loading={isLoading} color="facebook">
                                <Icon name="facebook" /> Facebook
                            </Button>
                            <Button
                                loading={isLoading}
                                onClick={this.handleLoginWithGoogle}
                                color="google plus">
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
    loginAction: (email, password) => dispatch(login(email, password)),
    loginWithGoogleAction: () => dispatch(loginWithGoogle()),
    getUserByUidAction: userUid => dispatch(getUserByUid(userUid))
});

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(Login)
);
