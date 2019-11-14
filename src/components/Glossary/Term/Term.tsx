import React from 'react';

import { GuideMarkdown } from '../../GuideMarkdown';
import { makeTermAnchor } from '../../../utils/make-term-anchor';
import './Term.scss';

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

export function Term(props: TermProps) {
    let anchor: string = makeTermAnchor(props.term);
    let title: JSX.Element;
    let aka: JSX.Element | undefined;
    let definition: JSX.Element = <div className="definition"><GuideMarkdown source={props.definition} /></div>;
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
                <GuideMarkdown source={props.trivia} />
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