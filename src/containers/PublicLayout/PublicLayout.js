import React from "react";
import cssHelpers from "../../helpers.module.css";

export default function PublicLayout({children, ...rest}) {
    return (
        <React.Fragment>
            <main className={cssHelpers["bg-gradient"]}>{children}</main>
        </React.Fragment>
    );
}
