import React from "react";
import Helmet from "react-helmet";
import './Contributors.scss';

export class Contributors extends React.Component {
    render() {
        return (
            <main className="column">
                <Helmet>
                    <title>Contributors</title>
                    <meta property="og:title" content="Contributors | DDRGuide" />
                    <meta property="og:description" content="A comprehensive glossary of modern DanceDanceRevolution terminology." />
                </Helmet>
                <div className="contentHeader">
                    <h1>Contributors</h1>
                    <p>The players behind DDRGuide!</p>
                </div>
                <ul className="contributorSections">
                    <li className="contributorSection">
                        <div className="contributorSectionHeader">
                            <h2>DDRGuide Staff</h2>
                            <img src="/images/ddrguide.svg" alt="DDRGuide Logo" />
                        </div>
                        <div className="contributorSectionContent">
                            <p>DDRGuide.com was founded and coded by <a href="https://garcia.sh/">Ash Garcia</a>, a software developer &amp; dance game player from Arizona.</p>
                        </div>
                    </li>
                    <li className="contributorSection">
                        <div className="contributorSectionHeader">
                            <h2>Beta Testers</h2>
                            <p>These players provided valuable feedback on the site's content prior to release.</p>
                        </div>
                        <ul className="contributorSectionContent">
                            <li>Max (<a href="https://twitter.com/eranostaImix">@eranostaImix</a>)</li>
                            <li>Dimo (<a href="https://twitter.com/bromid">@bromid</a>)</li>
                        </ul>
                    </li>
                    <li className="contributorSection">
                        <div className="contributorSectionHeader">
                            <h2>Photographers</h2>
                            <p>Talented photographers from the community graciously supplied their tournament photos for use across the site.</p>
                        </div>
                        <ul className="contributorSectionContent">
                            <li>Steve (<a href="https://twitter.com/StevesUsername">@StevesUsername</a>)</li>
                            <li>David (<a href="https://twitter.com/mutesauce">@mutesauce</a>)</li>
                        </ul>
                    </li>
                    <li className="contributorSection">
                        <div className="contributorSectionHeader">
                            <h2>The Rest</h2>
                        </div>
                        <ul className="contributorSectionContent">
                            <li>Massive thanks to all <a href="https://remywiki.com/">RemyWiki</a> contributors for their hard work documenting every DDR mix in incredible detail.</li>
                            <li>Thanks to the entire DDR community for their support and enthusiasm for this project.</li>
                        </ul>
                    </li>
                </ul>
            </main>
        );
    }
}