import React from "react";
import PropTypes from "prop-types";
import {authRef} from "../firebase";

export default function withAuthentication(WrappedComponent) {
    return class Authentication extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                isAuthenticated: false
            };
        }

        componentDidMount() {
            const {history} = this.props;
            authRef().onAuthStateChanged(authUser => {
                if (authUser) {
                    this.setState({isAuthenticated: true});
                } else {
                    this.setState({isAuthenticated: false});
                    history.push("/public/login");
                }
            });
        }

        render() {
            const {props} = this;
            const {isAuthenticated} = this.state;
            return isAuthenticated ? (
                <WrappedComponent {...props} isAuthenticated={isAuthenticated} />
            ) : null;
        }
    };
}
