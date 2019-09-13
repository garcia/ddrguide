import React from 'react';
import { Helmet } from 'react-helmet';
import { Router, Route, NavLink } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import './App.scss';
import Home from './Home';
import Glossary from './Glossary';
import ScrollToTop from './ScrollToTop';
  
function Sidebar() {
    return (
        <nav className="column">
            <div className="columnContents">
                <ul>
                    <li className="homeLink">
                        <NavLink to="/" exact={true} activeClassName="current">(logo)</NavLink>
                    </li>
                    <li className="newcomersLink">
                        <NavLink to="/newcomers/" activeClassName="current">Newcomers &amp; Novices</NavLink>
                    </li>
                    <li className="whatChangedLink">
                        <NavLink to="/whatchanged/" activeClassName="current">What's Changed?</NavLink>
                    </li>
                    <li className="improvingLink">
                        <NavLink to="/improving/" activeClassName="current">Improving Your Scores</NavLink>
                    </li>
                    <li className="glossaryLink">
                        <NavLink to="/glossary/" activeClassName="current">Glossary</NavLink>
                    </li>
                    <li className="songsLink">
                        <NavLink to="/songs/" activeClassName="current">Songs</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export const history = createBrowserHistory({
    basename: process.env.PUBLIC_URL
});

function App() {
    return (
        <Router history={history}>
            <Helmet defaultTitle="DDRGuide" titleTemplate="%s | DDRGuide">
                <meta charSet="utf-8" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="DDRGuide" />
                <meta property="og:site_name" content="DDRGuide" />
                <meta property="og:description" content="Learn where, why, and how to play DanceDanceRevolution. Help for newcomers, advice for competitive play, and references for DDR terminology and songs." />
                <link rel="canonical" href="https://garcia.github.io/ddrguide" />
            </Helmet>
            <div className="App">
                <Route path="/:any+" component={Sidebar} />
                <article className="column">
                    <div className="columnContents">
                        <Route path="/" exact component={Home} />
                        <Route path="/glossary/" component={Glossary} />
                    </div>
                </article>
            </div>
            <ScrollToTop />
        </Router>
    );
}

export default App;
