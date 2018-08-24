import React from "react";
import PropTypes from "prop-types";
import withAuthorization from "./withAuthorization";

const withRoleAuthorization = authorizedRoles => WrappedComponent => {
    return function RoleAuthorization(props) {
        const isRoleAuthorized = authUser =>
            !!authUser && authorizedRoles.indexOf(authUser.Role) >= 0;
        const ComponentWithRoleAuthorization = withAuthorization(isRoleAuthorized)(
            WrappedComponent
        );
        return <ComponentWithRoleAuthorization authorizedRoles={authorizedRoles} {...props} />;
    };
};

export default withRoleAuthorization;
