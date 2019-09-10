import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import './App.css';
import Glossary from './glossary';

function Index() {
    return (
        <h1>It Works!</h1>
    );
}

function App() {
    return (
        <Router>
        <Helmet defaultTitle="DDRGuide" titleTemplate="%s | DDRGuide">
            <meta charSet="utf-8" />
            <link rel="canonical" href="https://garcia.github.io/ddrguide" />
        </Helmet>
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/glossary/">Glossary</Link>
                    </li>
                </ul>
            </nav>

            <Route path="/" exact component={Index} />
            <Route path="/glossary/" component={Glossary} />
          </div>
      </Router>
  );
}

export const history = createBrowserHistory({
    basename: process.env.PUBLIC_URL
});

export default App;
