import React from 'react';
import ReactMarkdown, { ReactMarkdownProps } from 'react-markdown';
import { HashLink } from 'react-router-hash-link';
import moize from 'moize';

import './Term.scss';

// Memoize markdown - needs some ugly type juggling to work around moize not supporting ES5-style classes
const ReactMarkdownMoized = moize.react(ReactMarkdown as any as (props: ReactMarkdownProps) => React.ReactElement);

export interface TermProps {
    term: string;
    acronym?: string;
    aka?: string[];
    definition: string;
    trivia?: string;
    help?: string;
    concept: string;
    sourceIndex: number;
}

function routerLinkRenderer(props: {href: string, children: JSX.Element}): JSX.Element {
    return (
      props.href.match(/^(https?:)?\/\//)
        ? <a href={props.href}>{props.children}</a>
        : <HashLink to={props.href}>{props.children}</HashLink>
    );
  }      

function makeTermAnchor(s: string): string {
    return "term-" + s.toLowerCase().replace(" ", "-");
}

function formatText(text: string): JSX.Element {
    return <ReactMarkdownMoized
            source={text}
            renderers={{link: routerLinkRenderer}}
        />;
}

function Term(props: TermProps) {
    let anchor: string = makeTermAnchor(props.term);
    let title: JSX.Element;
    let aka: JSX.Element | undefined;
    let definition: JSX.Element = <div className="definition">{formatText(props.definition)}</div>;
    let trivia: JSX.Element | undefined;

    if (props.acronym !== undefined) {
        title = <h3>{props.term} ({props.acronym})</h3>
    } else {
        title = <h3>{props.term}</h3>
    }

    if (props.aka !== undefined) {
        aka = <div className="aka"><p>Also known as: {props.aka.join(", ")}</p></div>;
    }

    if (props.trivia !== undefined) {
        trivia = (
            <div className="trivia">
                <h4>Trivia</h4>
                {formatText(props.trivia)}
            </div>
        );
    }
    
    return (
        <div id={anchor} className="Term">
            {title}
            {aka}
            {definition}
            {trivia}
        </div>
    );
}

export default moize.react(Term);