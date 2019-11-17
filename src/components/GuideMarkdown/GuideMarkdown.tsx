import React from 'react';
import ReactMarkdown, { ReactMarkdownProps } from 'react-markdown';
import { HashLink } from 'react-router-hash-link';
import moize from 'moize';

import { makeAnchor } from '../../utils/make-anchor';
import { Link } from 'react-router-dom';

// Memoize markdown - needs some ugly type juggling to work around moize not supporting ES5-style classes
const ReactMarkdownMoized = moize.react(ReactMarkdown as any as (props: ReactMarkdownProps) => React.ReactElement);

const siteSections = {"glossary": null, "article": null, "song": null};
export type SiteSection = keyof typeof siteSections;

const MakeSiteLink: {[key in SiteSection]: ((id: string) => string)} = {
    "glossary": (id) => "/glossary/#term-" + makeAnchor(id),
    "article": (id) => "/article/" + makeAnchor(id),
    "song": (id) => "/song/" + makeAnchor(id)
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

                let anchor: string;
                if (linkTerm.startsWith("http")) {
                    anchor = linkTerm;
                } else {
                    anchor = MakeSiteLink[linkSection as SiteSection](linkTerm);
                    // Hacky fix for glossary hash links
                    if (linkSection === "glossary" && this.props.section === "glossary") {
                        anchor = anchor.substr(anchor.lastIndexOf("/")+1);
                    }
                }

                // Push the resulting link
                output.push("[" + linkDisplay + "](" + anchor + ")");
                index = linkEnd + 1;

            } else {

                // No more newlines or links to parse - push remaining text
                output.push(s.slice(index));
                index = s.length;

            }
        }

        return output.join("");
    }

    routerLinkRenderer(props: {href: string, children: JSX.Element}): JSX.Element {
        if (props.href.match(/^(https?:)?\/\//)) {
            return <a href={props.href}>{props.children}</a>;
        } else if (props.href.indexOf('#') >= 0) {
            return <HashLink to={props.href}>{props.children}</HashLink>;
        } else {
            return <Link to={props.href}>{props.children}</Link>;
        }
    }

    headingRenderer(props: {level: number, children: JSX.Element}): JSX.Element {
        function flatten(text: string, child: string | JSX.Element): string {
            return typeof child === 'string'
              ? text + child
              : React.Children.toArray(child.props.children).reduce(flatten, text);
        }

        var children = React.Children.toArray(props.children);
        var text = children.reduce(flatten, '');
        var slug = 'section-' + makeAnchor(text);
        return React.createElement('h' + props.level, {id: slug}, props.children);
    }

    render() {
        return <ReactMarkdownMoized
                source={this.markdown}
                renderers={{link: this.routerLinkRenderer, heading: this.headingRenderer}}
            />;
    }
}