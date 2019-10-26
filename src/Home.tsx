import React from 'react';
import { Link } from 'react-router-dom';

import './Home.scss';

class Home extends React.Component {
    render() {
        return (
            <div className="home">
                <div className="homeHeader">
                    <div className="homeLogo">
                        <img src="/images/ddrguide.svg" />
                        <h1>DDRGuide</h1>
                    </div>
                    <p>Learn where, why, and how to play DanceDanceRevolution A and A20.</p>
                </div>
                <div className="homePages homeGuides">
                    <ul>
                        <li className="newcomersLink">
                            <Link to="/newcomers/">
                                <h3>Newcomers &amp; Novices</h3>
                                <p>Where / why / how to play DDR, basic arcade etiquette, and more.</p>
                            </Link>
                        </li>
                        <li className="whatChangedLink">
                            <Link to="/whatchanged/">
                                <h3>What’s Changed?</h3>
                                <p>Returning DDR veteran? Learn what’s changed since your last mix.</p>
                            </Link>
                        </li>
                        <li className="improvingLink">
                            <Link to="/improving/">
                                <h3>Improving Your Scores</h3>
                                <p>Advice for intermediate players who want to play competitively.</p>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="homePages homeReferences">
                    <ul>
                        <li className="glossaryLink">
                            <Link to="/glossary/">
                                <h3>Glossary</h3>
                                <p>A comprehensive glossary of modern DDR terminology &amp; slang.</p>
                            </Link>
                        </li>
                        <li className="songsLink">
                            <Link to="/songs/">
                                <h3>Song List</h3>
                                <p>Basic information on every song in DDR A / A20.</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Home;