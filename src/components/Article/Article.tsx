import { AssertionError } from 'assert';
import React from 'react';

import { GuideMarkdown } from '../GuideMarkdown';
import './Article.scss';

import navigatingTheDDRUI from '../../content/articles/navigating-the-ddr-ui.json';

export interface ArticleProps {
    slug: string;
}

export interface ArticleContent {
    data: {
        title: string;
        slug: string;
        description: string;
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

export class Article extends React.Component<ArticleProps> {
    
    article: ArticleContent | undefined;
    contentMarkdown: JSX.Element | undefined;

    constructor(props: ArticleProps) {
        super(props);
        this.article = ArticleStore.getInstance().articleSlugs[props.slug];
        console.log(props);

        if (this.article) {
            this.contentMarkdown = <GuideMarkdown source={this.article.content} />;
        }
    }

    render() {
        let titleHeader: JSX.Element | undefined;
        let description: JSX.Element | undefined;

        if (this.article) {
            titleHeader = <h1>{this.article.data.title}</h1>;
            description = <p>{this.article.data.description}</p>;
        }

        return (
            <article>
                <div className="title">
                    {titleHeader}
                    {description}
                </div>
                <div className="contents">
                    {this.contentMarkdown}
                </div>
            </article>
        );
    }
}