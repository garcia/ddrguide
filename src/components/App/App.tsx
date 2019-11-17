import React from 'react';
import { Helmet } from 'react-helmet';
import { Router, Route, NavLink, Link, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import './App.scss';
import { Home } from '../Home';
import { Glossary } from '../Glossary';
import { ScrollToTop } from './ScrollToTop';
import { Article } from '../Article';
import { AllArticleSummariesPage } from '../Article';
import { Page404 } from '../Page404';
  
function Sidebar() {
    return (
        <nav className="column">
            <NavLink to="/" exact={true} activeClassName="current" className="homeLink">
                <img src="/images/ddrguide.svg" alt="DDRGuide Logo" />
                <span>DDRGuide</span>
            </NavLink>
            <ul>
                <li>
                    <NavLink to="/article/" activeClassName="current">Articles</NavLink>
                </li>
                <li>
                    <NavLink to="/glossary/" activeClassName="current">Glossary</NavLink>
                </li>
                <li>
                    <NavLink to="/songs/" activeClassName="current">Songs</NavLink>
                </li>
            </ul>
        </nav>
    )
}

function Footer() {
    return (
        <footer>
            <ul className="footerSections">
                <li>
                    <h3>DDRGuide.com</h3>
                    <ul className="footerLinks">
                        <li><Link to="/about/contributors/">Contributors</Link></li>
                        <li><Link to="/about/source/">Source</Link></li>
                        <li><a href="https://twitter.com/DDRGuide">Twitter</a></li>
                    </ul>
                </li>
                <li>
                    <h3>Friends</h3>
                    <ul className="footerLinks">
                        <li><a href="http://ddrcommunity.com/">DDRCommunity</a></li>
                        <li><a href="https://twitter.com/sf_evolved">SF Evolved</a></li>
                    </ul>
                </li>
                <li>
                    <h3>Mission</h3>
                    <p>
                        Our goal is to make general knowledge about DDR accessible to anyone and everyone interested.
                        If you'd like to contribute, message us on Twitter <a href="https://twitter.com/DDRGuide">@DDRGuide</a>.
                    </p>
                </li>
            </ul>
        </footer>
    )
}

export const history = createBrowserHistory({
    basename: process.env.PUBLIC_URL
});

export function App() {
    return (
        <Router history={history}>
            <Helmet defaultTitle="DDRGuide" titleTemplate="%s | DDRGuide">
                <meta charSet="utf-8" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="DDRGuide" />
                <meta property="og:site_name" content="DDRGuide" />
                <meta property="og:description" content="Learn where, why, and how to play DanceDanceRevolution. Help for newcomers, advice for competitive play, and references for DDR terminology and songs." />
                <link rel="canonical" href="https://www.ddrguide.com/" />
            </Helmet>
            <div className="App">
                <div className="top">
                    <Route path="/:any+" component={Sidebar} />
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/glossary/" component={Glossary} />
                        <Route path="/article/" exact component={AllArticleSummariesPage} />
                        <Route path="/article/:slug" render={({match}) => <Article key={match.params.slug} slug={match.params.slug} />} />
                        <Route component={Page404} />
                    </Switch>
                </div>
                <Footer />
            </div>
            <ScrollToTop />
        </Router>
    );
}