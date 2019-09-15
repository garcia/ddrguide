import React from 'react';
import ReactMarkdown from 'react-markdown';
import { HashLink } from 'react-router-hash-link';

import './Term.scss';

export interface TermProps {
    term: string;
    acronym?: string;
    aka?: string[];
    definition: string;
    trivia?: string;
    help?: string;
    concept: string;
}

class Term extends React.Component<TermProps> {

    static routerLinkRenderer(props: {href: string, children: JSX.Element}): JSX.Element {
        return (
          props.href.match(/^(https?:)?\/\//)
            ? <a href={props.href}>{props.children}</a>
            : <HashLink to={props.href}>{props.children}</HashLink>
        );
      }      

    makeTermAnchor(s: string): string {
        return "term-" + s.toLowerCase().replace(" ", "-");
    }

    formatText(s: string): JSX.Element {
        // Pre-format for Markdown
        let output: string[] = [];
        let index: number = 0;

        while (index < s.length) {
            
            // Find next occurrence of either a newline or a link marker
            let nextNewline = s.indexOf("\n", index);
            let nextLink = s.indexOf("[", index);

            if (nextNewline >= 0 && (nextLink < 0 || nextNewline < nextLink)) {
                
                // Newline is next - push text fragment, then two newlines to start a new Markdown paragraph
                output.push(s.slice(index, nextNewline));
                output.push("\n");
                index = nextNewline + 1;

            } else if (nextLink >= 0 && (nextNewline < 0 || nextLink < nextNewline)) {
                
                // Link marker is next - push text fragment, then parse the link
                output.push(s.slice(index, nextLink));

                // Find next closing bracket
                let linkEnd: number = s.indexOf("]", nextLink);
                if (linkEnd < 0) {
                    console.error("Missing closing bracket for link at index " + index + " in string: " + s);
                    break;
                }

                // Check for dividing "|" - if present, the left part is the text to display and the right part is the term to link
                let linkData: string = s.slice(nextLink+1, linkEnd);
                let linkDivider: number = linkData.indexOf("|");
                let linkDisplay: string;
                let linkTerm: string;
                if (linkDivider >= 0) {
                    linkDisplay = linkData.slice(0, linkDivider);
                    linkTerm = linkData.slice(linkDivider+1);
                } else {
                    linkDisplay = linkTerm = linkData;
                }

                let anchor: string = linkTerm.startsWith("http") ? linkTerm : "#" + this.makeTermAnchor(linkTerm);

                // Push the resulting link
                output.push("[" + linkDisplay + "](" + anchor + ")");
                index = linkEnd + 1;

            } else {

                // No more newlines or links to parse - push remaining text
                output.push(s.slice(index));
                index = s.length;

            }
        }

        return <ReactMarkdown
                source={output.join("")}
                renderers={{link: Term.routerLinkRenderer}}
            />;
    }

    render() {
        let anchor: string = this.makeTermAnchor(this.props.term);
        let title: JSX.Element;
        let aka: JSX.Element | undefined;
        let definition: JSX.Element = <div className="definition">{this.formatText(this.props.definition)}</div>;
        let trivia: JSX.Element | undefined;

        if (this.props.acronym !== undefined) {
            title = <h2>{this.props.term} ({this.props.acronym})</h2>
        } else {
            title = <h2>{this.props.term}</h2>
        }

        if (this.props.aka !== undefined) {
            aka = <div className="aka"><p>Also known as: {this.props.aka.join(", ")}</p></div>;
        }

        if (this.props.trivia !== undefined) {
            trivia = (
                <div className="trivia">
                    <h3>Trivia</h3>
                    {this.formatText(this.props.trivia)}
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
}

export default Term;