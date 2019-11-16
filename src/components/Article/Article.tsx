import { AssertionError } from 'assert';
import React from 'react';

import { GuideMarkdown } from '../GuideMarkdown';
import './Article.scss';

import navigatingTheDDRUI from '../../content/articles/navigating-the-ddr-ui.json';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { makeAnchor } from '../../utils/make-anchor';

export interface ArticleProps {
    slug: string;
}

export interface ArticleContent {
    data: {
        title: string;
        slug: string;
        description: string;
        sections: string[];
    }
    content: string;
}

export class ArticleStore {
    
    static instance?: ArticleStore;

    allArticles: ArticleContent[] = [navigatingTheDDRUI];
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
            <li>
                <Link to={"/article/" + this.props.data.slug}>
                    <h3>{this.props.data.title}</h3>
                    <p>{this.props.data.description}</p>
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
        console.log(props);

        if (this.article) {
            this.contentMarkdown = <GuideMarkdown source={this.article.content} section="article" />;
        }
    }

    render() {
        let titleHeader: JSX.Element | undefined;
        let description: JSX.Element | undefined;
        let sections: JSX.Element | undefined;

        if (this.article) {
            titleHeader = <h1>{this.article.data.title}</h1>;
            description = <p>{this.article.data.description}</p>;
            sections = (
                <ul>
                    <li>
                        {this.article.data.sections.map(s => <li key={makeAnchor(s)}><HashLink to={"#section-" + makeAnchor(s)}>{s}</HashLink></li>)}
                    </li>
                </ul>
            );
        }

        return (
            <>
                <main className="column article">
                    <article>
                        <div className="title">
                            {titleHeader}
                            {description}
                        </div>
                        <div className="contents">
                            {this.contentMarkdown}
                        </div>
                    </article>
                </main>
                <aside className="column outline">
                    {sections}
                </aside>
            </>
        );
    }
}