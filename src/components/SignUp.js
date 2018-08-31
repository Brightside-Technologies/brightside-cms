import React from "react";
import {Icon, Button, Form, Grid, Header, Divider, Segment, Message} from "semantic-ui-react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import {withRouter} from "react-router";
import {connect} from "react-redux";

import cssHelpers from "../helpers.module.css";

import {signUpUser} from "../actions/authentication.actions";
//import {getUserByUid} from "../../actions/users.actions";
//import {deleteCurrentUser} from "../../actions/users.actions";
import {getIsLoading} from "../reducers/index.reducer";

export class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            comfirmPassword: ""
        };
    }

    handleSignUpUser = (email, password, name) => {
        const {history, signUpUserAction} = this.props;
        signUpUserAction(email, password, name).then(() => {
            //history.push()
        });
    };

    handleSignUpWithGoogle = () => {};

    handleSignUpWithFacebook = () => {};

    handleEmailChange = email => {
        this.setState({email});
    };

    handlePasswordChange = password => {
        this.setState({password});
    };

    handleConfirmPasswordChange = confirmPassword => {
        this.setState({confirmPassword});
    };

    handleNameChange = name => {
        this.setState({name});
    };

    render() {
        const {name, email, password, confirmPassword} = this.state;
        const {isLoading} = this.props;
        return (
            <div className={`${cssHelpers["h-100"]}`}>
                <Grid
                    className={`${cssHelpers["h-100"]}`}
                    textAlign="center"
                    verticalAlign="middle">
                    <Grid.Column style={{maxWidth: 450}}>
                        <Form className="attached fluid segment" size="large">
                            <Header as="h1">New to Brightside CMS?</Header>
                            <Header as="h3">Sign Up with</Header>
                            <Button
                                disabled
                                loading={isLoading}
                                onClick={() => {}}
                                color="facebook">
                                <Icon name="facebook" /> Facebook
                            </Button>
                            <Button
                                disabled
                                loading={isLoading}
                                onClick={() => {}}
                                color="google plus">
                                <Icon name="google plus" /> Google Plus
                            </Button>
                            <Divider horizontal>OR</Divider>
                            <Form.Input
                                onChange={ev => {
                                    this.handleNameChange(ev.target.value);
                                }}
                                fluid
                                icon="user"
                                iconPosition="left"
                                placeholder="Name"
                            />
                            <Form.Input
                                onChange={ev => {
                                    this.handleEmailChange(ev.target.value);
                                }}
                                fluid
                                icon="mail"
                                iconPosition="left"
                                placeholder="E-mail Address"
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
                            <Form.Input
                                onChange={ev => {
                                    this.handleConfirmPasswordChange(ev.target.value);
                                }}
                                fluid
                                icon="lock"
                                iconPosition="left"
                                placeholder="Confirm Password"
                                type="password"
                            />
                            <Button
                                disabled={
                                    !name || !email || !password || password !== confirmPassword
                                }
                                loading={isLoading}
                                onClick={() => {
                                    this.handleSignUpUser(email, password, name);
                                }}
                                color="yellow"
                                fluid
                                size="large">
                                Sign Up
                            </Button>
                        </Form>
                        <Message attached="bottom" warning>
                            <Icon name="help" />
                            Already signed up?&nbsp;
                            <a href="/login">Login here</a>
                            &nbsp;instead.
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

// Login.propTypes = {
//     loginAction: PropTypes.func.isRequired,
//     history: ReactRouterPropTypes.history.isRequired
// };

const mapDispatchToProps = dispatch => ({
    signUpUserAction: (email, password, name) => dispatch(signUpUser(email, password, name))
});

const mapStateToProps = state => ({
    isLoading: getIsLoading(state)
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SignUp)
);
