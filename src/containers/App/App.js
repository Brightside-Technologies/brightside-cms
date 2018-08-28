import React from "react";
import {SemanticToastContainer, toast} from "react-semantic-toasts";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Routes from "../../components/Routes";

import {getErrorMessage} from "../../reducers/index.reducer";
import {RESET_ERROR_MESSAGE} from "../../actions/requests.actions";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    handleShowErrorMessage = errorMessage => {
        const {resetErrorMessage} = this.props;
        resetErrorMessage();

        setTimeout(() => {
            toast({title: "Error", description: errorMessage, type: "error", time: 4000}, () => {
                resetErrorMessage();
            });
        }, 0);
    };

    render() {
        console.log("PROPS", this.props);
        const {errorMessage} = this.props;
        return (
            <React.Fragment>
                <Routes />
                <SemanticToastContainer position="bottom-left" />
                {!!errorMessage && this.handleShowErrorMessage(errorMessage)}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    errorMessage: getErrorMessage(state),
    successMessage: state.successMessage
});

const mapDispatchToProps = dispatch => ({
    resetErrorMessage: () => dispatch(RESET_ERROR_MESSAGE())
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);
