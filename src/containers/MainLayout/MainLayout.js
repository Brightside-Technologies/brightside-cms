import React, {Fragment} from "react";
import Navbar from "../../components/Navbar/Navbar";
import cssHelpers from "../../helpers.module.css";

export default function MainLayout({children, ...rest}) {
    return (
        <Fragment>
            <Navbar />
            <main className={`${cssHelpers["mt-5"]} ${cssHelpers["pt-5"]}`}>{children}</main>
        </Fragment>
    );
}
