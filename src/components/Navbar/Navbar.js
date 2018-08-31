import React from "react";
import {Dropdown, Image, Menu} from "semantic-ui-react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import {withRouter} from "react-router";
import {connect} from "react-redux";

import {logout} from "../../actions/authentication.actions";
import {getLoggedInUser} from "../../reducers/index.reducer";

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeItem: "home"
        };
    }

    handNavbarItemClick = (e, {name}) => {
        this.setState({activeItem: name});
    };

    handleLogout = () => {
        const {history, logoutAction} = this.props;
        logoutAction().then(() => {
            history.push("/login");
        });
    };

    render() {
        console.log("PROPS", this.props);
        const {activeItem} = this.state;
        const {name, photoURL} = this.props.loggedInUser;
        const avatar = (
            <div>
                <Image src={photoURL} avatar />
                <span>{name}</span>
            </div>
        );
        return (
            <Menu fixed="top" inverted>
                <Menu.Item as="a" header>
                    <Image size="mini" src="/logo.png" style={{marginRight: "1.5em"}} />
                    Brightside CMS
                </Menu.Item>
                <Menu.Item name="home" as="a" active={activeItem === "home"}>
                    Home
                </Menu.Item>
                <Dropdown item simple text="Dropdown">
                    <Dropdown.Menu>
                        <Dropdown.Item>List Item</Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Header>Header Item</Dropdown.Header>
                        <Dropdown.Item>
                            <i className="dropdown icon" />
                            <span className="text">Submenu</span>
                            <Dropdown.Menu>
                                <Dropdown.Item>List Item</Dropdown.Item>
                                <Dropdown.Item>List Item</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Menu.Menu position="right">
                    <Dropdown button item trigger={avatar}>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={this.handleLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Menu>
        );
    }
}

/** TODO: FIX */
Navbar.propTypes = {
    loggedInUser: PropTypes.shape({
        isNewUser: PropTypes.bool,
        profile: PropTypes.object,
        providerId: PropTypes.string
    }).isRequired,
    logoutAction: PropTypes.func.isRequired,
    history: ReactRouterPropTypes.history.isRequired
};

const mapStateToProps = state => ({
    loggedInUser: getLoggedInUser(state)
});

const mapDispatchToProps = dispatch => ({
    logoutAction: () => dispatch(logout())
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Navbar)
);
