import Helmet from "react-helmet";
import React from "react";

export function Page404() {
    return (
        <main className="column">
            <Helmet>
                <title>404</title>
            </Helmet>
            <div className="contentHeader">
                <h1>404</h1>
                <p>There's nothing at this address. Sorry! Let us know <a href="https://twitter.com/DDRGuide">@DDRGuide</a> if you think this is a mistake.</p>
            </div>
        </main>
    );
}