import React from 'react';
import moize from 'moize';

import { GuideMarkdown } from '../../GuideMarkdown';
import { makeAnchor } from '../../../utils/make-anchor';
import './Term.scss';

export interface TermProps {
    term: string;
    acronym?: string;
    aka?: string[];
    definition: string;
    trivia?: string;
    help?: string;
    concept: string;
    image?: {
        filename: string;
        altText: string;
    };
    sourceIndex: number;
}

export const Term: React.FunctionComponent<TermProps> = moize.react(props => {
    let anchor: string = "term-" + makeAnchor(props.term);
    let title: JSX.Element;
    let aka: JSX.Element | undefined;
    let definition: JSX.Element = <div className="definition"><GuideMarkdown source={props.definition} section="glossary" /></div>;
    let trivia: JSX.Element | undefined;
    let image: JSX.Element | undefined;

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
            <blockquote className="trivia">
                <h4>Trivia</h4>
                <GuideMarkdown source={props.trivia} section="glossary" />
            </blockquote>
        );
    }

    if (props.image !== undefined) {
        let src: string = "/images/" + props.image.filename;
        image = (
            <a className="termImage" target="_blank" href={src}>
                <img src={src} alt={props.image.altText} title={props.image.altText} />
                <span>Click to open in new tab</span>
            </a>
        );
    }
    
    return (
        <div id={anchor} className="Term">
            <div className="termTitle">
                {title}
                {aka}
            </div>
            <div className="termDefinitionAndImage">
                {definition}
                {image}
            </div>
            {trivia}
        </div>
    );
});