import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import './App.scss';
import Glossary from './Glossary';

function Index() {
    return (
        <h1>It Works!</h1>
    );
}

function Sidebar() {
    return (
        <nav className="column">
            <div className="columnHeader">
                DDRGuide
            </div>
            <div className="columnContents">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/glossary/">Glossary</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

function App() {
    return (
        <Router>
            <Helmet defaultTitle="DDRGuide" titleTemplate="%s | DDRGuide">
                <meta charSet="utf-8" />
                <link rel="canonical" href="https://garcia.github.io/ddrguide" />
            </Helmet>
            <div className="App">
                <Sidebar />
                <article className="column">
                    <div className="columnContents">
                        <Route path={process.env.PUBLIC_URL + "/"} exact component={Index} />
                        <Route path={process.env.PUBLIC_URL + "/glossary/"} component={Glossary} />
                    </div>
                </article>
            </div>
        </Router>
    );
}

export const history = createBrowserHistory({
    basename: process.env.PUBLIC_URL
});

export default App;
