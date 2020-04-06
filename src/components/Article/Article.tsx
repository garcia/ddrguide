import { AssertionError } from 'assert';
import React from 'react';

import { GuideMarkdown } from '../GuideMarkdown';
import './Article.scss';

import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { makeAnchor } from '../../utils/make-anchor';
import { Page404 } from '../Page404';
import { SectionOutliner } from '../SectionOutliner';

import navigatingTheDDRUI from '../../content/articles/navigating-the-ddr-ui.json';
import settingYourSpeed from '../../content/articles/setting-your-speed.json';
import whyPlayDDR from  '../../content/articles/why-play-ddr.json';
import basicGameplay from  '../../content/articles/basic-gameplay.json';
import decidingWhatToPlay from  '../../content/articles/deciding-what-to-play.json';
import homeSetupAndResources from  '../../content/articles/home-setup-and-resources.json';
import Helmet from 'react-helmet';

export interface ArticleProps {
    slug: string;
}

export interface ArticleContent {
    data: {
        title: string;
        slug: string;
        description: string;
        sections: string[];
        coming_soon?: boolean;
        date: string;
        author: {
            name: string;
            url?: string;
        }
    }
    content: string;
}

export class ArticleStore {
    
    static instance?: ArticleStore;

    allArticles: ArticleContent[] = [navigatingTheDDRUI, whyPlayDDR, basicGameplay, settingYourSpeed, decidingWhatToPlay, homeSetupAndResources];
    articleSlugs: {[key: string]: ArticleContent} = {};

    constructor() {
        if (ArticleStore.instance !== undefined) {
            throw new AssertionError();
        }
        this.allArticles.forEach(article => {
            this.articleSlugs[article.data.slug] = article;
        });
    }

    static getInstance(): ArticleStore {
        if (ArticleStore.instance === undefined) {
            ArticleStore.instance = new ArticleStore();
        }
        return ArticleStore.instance;
    }
}

export class AllArticleSummariesPage extends React.Component {

    render() {
        return (
            <main className="column articles">
                <div className="contentHeader">
                    <h1>Articles</h1>
                </div>
                <AllArticleSummaries />
            </main>
        );
    }
}

export class AllArticleSummaries extends React.Component {

    render() {
        return (
            <ul className="contentSummaryList">
                {ArticleStore.getInstance().allArticles.map(a => <ArticleSummary key={a.data.slug} {...a} />)}
            </ul>
        );
    }
}

export class ArticleSummary extends React.Component<ArticleContent> {

    render() {
        return (
            <li className="contentSummary">
                <Link to={"/article/" + this.props.data.slug} className={this.props.data.coming_soon ? "coming-soon" : ""}>
                    <img className="contentSummaryThumbnail" src={"/images/Article - Thumbnail - " + this.props.data.slug + ".jpg"} alt="" />
                    <div className="contentSummaryText">
                        <h3>{this.props.data.title}</h3>
                        <p>{this.props.data.description}</p>
                    </div>
                </Link>
            </li>
        );
    }
}

export class Article extends React.Component<ArticleProps> {
    
    article: ArticleContent | undefined;
    contentMarkdown: JSX.Element | undefined;

    constructor(props: ArticleProps) {
        super(props);
        this.article = ArticleStore.getInstance().articleSlugs[props.slug];

        if (this.article) {
            this.contentMarkdown = <GuideMarkdown source={this.article.content} section="article" />;
        }
    }

    render() {
        let output: JSX.Element;

        if (this.article) {
            let author: JSX.Element;
            if (this.article.data.author.url !== undefined) {
                author = <a target="_blank" rel="noopener noreferrer" href={this.article.data.author.url}>{this.article.data.author.name}</a>
            } else {
                author = <>{this.article.data.author.name}</>
            }

            output = (
                <>
                    <Helmet>
                        <title>{this.article.data.title}</title>
                        <meta property="og:type" content="article" />
                        <meta property="og:title" content={this.article.data.title + " | DDRGuide"} />
                        <meta property="og:description" content={this.article.data.description} />
                    </Helmet>
                    <main className="column article">
                        <article>
                            <div className="contentHeader" style={{backgroundImage: "url('/images/Article - Header - " + this.article.data.slug + ".jpg')"}}>
                                <h1>{this.article.data.title}</h1>
                                <p>{this.article.data.description}</p>
                            </div>
                            <div className="contents">
                                <p className="articleMetadata">{author} · {this.article.data.date}</p>
                                {this.contentMarkdown}
                            </div>
                        </article>
                    </main>
                    <SectionOutliner>
                        {this.article.data.sections.map(s => <li key={makeAnchor(s)}><HashLink to={"#section-" + makeAnchor(s)}>{s}</HashLink></li>)}
                    </SectionOutliner>
                </>
            );
        } else {
            output = <Page404 />
        }

        return output;
    }
}