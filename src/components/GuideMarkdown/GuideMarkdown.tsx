import React from 'react';
import ReactMarkdown, { ReactMarkdownProps } from 'react-markdown';
import { HashLink } from 'react-router-hash-link';
import moize from 'moize';

import { makeAnchor } from '../../utils/make-anchor';
import { Link } from 'react-router-dom';

// Memoize markdown - needs some ugly type juggling to work around moize not supporting ES5-style classes
const ReactMarkdownMoized = moize.react(ReactMarkdown as any as (props: ReactMarkdownProps) => React.ReactElement);

const siteSections = {"glossary": null, "article": null};
export type SiteSection = keyof typeof siteSections;

const MakeSiteLink: {[key in SiteSection]: ((id: string) => string)} = {
    "glossary": (id) => "/glossary/#term-" + makeAnchor(id),
    "article": (id) => "/article/" + makeAnchor(id)
};

const BaseSiteLink: {[key in SiteSection]: string} = {
    "glossary": "/glossary/",
    "article": "/article/"
};

export interface GuideMarkdownProps {
    source: string;
    section: SiteSection;
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

                let linkData: string = s.slice(nextLink+1, linkEnd);
                
                // Check for dividing ":" - if present, the left part is the site section
                let sectionDivider: number = linkData.indexOf(":");
                let linkSection: string;
                if (sectionDivider >= 0) {
                    linkSection = linkData.slice(0, sectionDivider);
                    if (siteSections.hasOwnProperty(linkSection)) {
                        linkData = linkData.slice(sectionDivider+1);
                    } else {
                        linkSection = this.props.section;
                    }
                } else {
                    linkSection = this.props.section;
                }
                
                // Check for dividing "|" - if present, the left part is the text to display and the right part is the term to link
                let linkDivider: number = linkData.indexOf("|");
                let linkDisplay: string;
                let linkTerm: string;
                if (linkDivider >= 0) {
                    linkDisplay = linkData.slice(0, linkDivider);
                    linkTerm = linkData.slice(linkDivider+1);
                } else {
                    linkDisplay = linkTerm = linkData;
                }

                let anchor: string = linkTerm.startsWith("http") ? linkTerm : MakeSiteLink[linkSection as SiteSection](linkTerm);

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
        if (props.href.match(/^(https?:)?\/\//)) {
            return <a href={props.href}>{props.children}</a>;
        } else if (props.href.match(/^#/)) {
            return <HashLink to={props.href}>{props.children}</HashLink>;
        } else {
            return <HashLink to={props.href}>{props.children}</HashLink>;
        }
    }

    render() {
        return <ReactMarkdownMoized
                source={this.markdown}
                renderers={{link: this.routerLinkRenderer}}
            />;
    }
}