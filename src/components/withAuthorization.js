import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const withAuthorization = authCondition => WrappedComponent => {
    class AuthorizationComponent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                isAuthorized: false
            };
        }

        componentDidMount() {
            const {loggedInUser} = this.props;
            if (!authCondition(loggedInUser)) {
                this.setState({isAuthorized: false});
                console.log("UNAUTHORIZED");
            } else {
                this.setState({isAuthorized: true});
            }
        }

        render() {
            const {props} = this;
            const {isAuthorized} = this.state;
            return isAuthorized ? (
                <WrappedComponent {...props} isAuthorized={isAuthorized} />
            ) : null;
        }
    }

    const mapStateToProps = state => ({
        user: state.authenticationReducer.loggedInUser
    });

    return connect(mapStateToProps)(AuthorizationComponent);
};

export default withAuthorization;
