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
                    <p>Learn where, why, and how to play DanceDanceRevolution A and A20.</p>
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
                                    <img className="contentSummaryThumbnail" src="/images/Glossary - Thumbnail.jpg" alt="" />
                                    <div className="contentSummaryText">
                                        <h3>Glossary</h3>
                                        <p>A comprehensive glossary of modern DDR terminology & slang.</p>
                                    </div>
                                </Link>
                            </li>
                            <li className="contentSummary">
                                <Link to="/songs/" className="coming-soon">
                                    <img className="contentSummaryThumbnail" src="/images/Glossary - Thumbnail.jpg" alt="" />
                                    <div className="contentSummaryText">
                                        <h3>Song List</h3>
                                        <p>Basic information on every song in DDR A / A20.</p>
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