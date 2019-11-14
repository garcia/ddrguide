import React from 'react';
import ReactMarkdown, { ReactMarkdownProps } from 'react-markdown';
import { HashLink } from 'react-router-hash-link';
import moize from 'moize';

import { makeTermAnchor } from '../../utils/make-term-anchor';

// Memoize markdown - needs some ugly type juggling to work around moize not supporting ES5-style classes
const ReactMarkdownMoized = moize.react(ReactMarkdown as any as (props: ReactMarkdownProps) => React.ReactElement);

export interface GuideMarkdownProps {
    source: string;
}

export class GuideMarkdown extends React.Component<GuideMarkdownProps> {
    markdown: string;

    constructor(props: GuideMarkdownProps) {
        super(props);
        this.markdown = this.sourceToMarkdown(props.source);
    }    

    sourceToMarkdown(s: string): string {
        let output: string[] = [];
        let index: number = 0;

        while (index < s.length) {
            
            // Find next link marker
            let nextLink = s.indexOf("[", index);

            if (nextLink >= 0) {
                
                // Push text fragment, then parse the link
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

                let anchor: string = linkTerm.startsWith("http") ? linkTerm : "#" + makeTermAnchor(linkTerm);

                // Push the resulting link
                output.push("[" + linkDisplay + "](" + anchor + ")");
                index = linkEnd + 1;

            } else {

                // No more newlines or links to parse - push remaining text
                output.push(s.slice(index));
                index = s.length;

            }
        }

        console.log(s);
        console.log(output.join(""));

        return output.join("");
    }

    routerLinkRenderer(props: {href: string, children: JSX.Element}): JSX.Element {
        return (
            props.href.match(/^(https?:)?\/\//)
            ? <a href={props.href}>{props.children}</a>
            : <HashLink to={props.href}>{props.children}</HashLink>
        );
    }

    render() {
        return <ReactMarkdownMoized
                source={this.markdown}
                renderers={{link: this.routerLinkRenderer}}
            />;
    }
}