import React from 'react';
import { Link } from 'react-router-dom';

import './Article.scss';

export interface ArticleProps {
    title: string;
    description: string;
    slug: string;
    contents: string;
}

export class Article extends React.Component<ArticleProps> {
    render() {
        return (
            <article>
                <div className="title">
                    <h1>{this.props.title}</h1>
                    <p>{this.props.description}</p>
                </div>
                <div className="contents">
                    {this.props.contents}
                </div>
            </article>
        );
    }
}