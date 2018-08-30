import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {getLoggedInUser} from "../reducers/index.reducer";

const withAuthorization = authCondition => WrappedComponent => {
    class AuthorizationComponent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                isAuthorized: false
            };
        }

        componentDidMount() {
            const {user} = this.props;
            if (!authCondition(user)) {
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

    const mapStateToProps = store => ({
        user: getLoggedInUser(store)
    });

    return connect(mapStateToProps)(AuthorizationComponent);
};

export default withAuthorization;
