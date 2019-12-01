import React from 'react';
import { Link } from 'react-router-dom';

import './Home.scss';
import { AllArticleSummaries } from '../Article';

export class Home extends React.Component {
    render() {
        return (
            <main className="column home">
                <div className="homeHeader">
                    <div className="homeLogo">
                        <img src="/images/ddrguide.svg" alt="DDRGuide Logo" />
                        <h1>DDRGuide</h1>
                    </div>
                    <p>Learn where, why, and how to play DanceDanceRevolution A and A20. Advice written &amp; vetted by experienced players, comprehensive resources of in-depth game knowledge for newcomers and experts alike, and more.</p>
                </div>
                <ul className="homeSections">
                    <li>
                        <h2>Articles</h2>
                        <AllArticleSummaries />
                    </li>
                    <li>
                        <h2>Resources</h2>
                        <ul className="contentSummaryList">
                            <li className="contentSummary">
                                <Link to="/glossary/">
                                    <img className="contentSummaryThumbnail" src="/images/irasutoya - friend_advice_woman.png" alt="" />
                                    <div className="contentSummaryText">
                                        <h3>Glossary</h3>
                                        <p>A comprehensive glossary of modern DDR terminology & slang.</p>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </main>
        );
    }
}