import React from "react";
import {Segment} from "semantic-ui-react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import Routes from "../../components/Routes";
import {getErrorMessage} from "../../reducers/index.reducer";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("PROPS", this.props);
        const {errorMessage} = this.props;
        return (
            <React.Fragment>
                <Routes />
                {!!errorMessage && <Segment color="red">{errorMessage}</Segment>}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    errorMessage: getErrorMessage(state),
    successMessage: state.successMessage
});

export default withRouter(connect(mapStateToProps)(App));
