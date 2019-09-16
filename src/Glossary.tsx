import React from 'react';
import Helmet from 'react-helmet';
import { AssertionError } from 'assert';

import Term, { TermProps } from './Term';
import TermGroup from './TermGroup';
import glossaryJson from './glossary.json';
import './Glossary.scss';
import SearchBar from './SearchBar';
import SortSelect, { SortValue } from './SortSelect';

interface GlossaryProps {

}

interface GlossaryState {
    sort: SortValue;
    terms: TermProps[];
    groupedTerms: {[key: string]: TermProps[]};
}

export class GlossaryStore {
    
    static instance?: GlossaryStore;

    allTerms: TermProps[] = [];
    termLookup: {[key: string]: TermProps} = {};

    constructor() {
        if (GlossaryStore.instance !== undefined) {
            throw new AssertionError();
        }
        let sourceIndex: number = 0;
        glossaryJson.forEach(entry => {
            let props: TermProps = {sourceIndex, ...entry};
            this.termLookup[entry.term] = props;
            this.allTerms.push(props);
            sourceIndex++;
        });
    }

    static getInstance(): GlossaryStore {
        if (GlossaryStore.instance === undefined) {
            GlossaryStore.instance = new GlossaryStore();
        }
        return GlossaryStore.instance;
    }
}

const GlossarySort: {[key in SortValue]: {compare: (a: TermProps, b: TermProps) => number, sectionName: (t: TermProps) => string } } = {
    "alphabetical": {
        compare: (a, b) => a.term.localeCompare(b.term),
        sectionName: (a) => a.term.charAt(0).toUpperCase(),
    },
    "by-concept": {
        compare: (a, b) => a.concept.localeCompare(b.concept) || (a.sourceIndex - b.sourceIndex),
        sectionName: (a) => a.concept
    }
};

class Glossary extends React.Component<GlossaryProps> {
    store: GlossaryStore = GlossaryStore.getInstance();
    state: GlossaryState;

    constructor(props: GlossaryProps) {
        super(props);
        
        let initialSort: SortValue = "alphabetical";
        let sortedTerms: TermProps[] = this.store.allTerms.slice();
        this.sortTerms(sortedTerms, initialSort);
        this.state = {
            sort: initialSort,
            terms: sortedTerms,
            groupedTerms: this.groupTerms(initialSort, sortedTerms)
        };
        
        this.onSortUpdate = this.onSortUpdate.bind(this);
    }

    onSortUpdate(sort: SortValue) {
        this.setState((state: GlossaryState, props: GlossaryProps) => {
            this.sortTerms(state.terms, sort);
            return {
                sort: sort,
                terms: state.terms,
                groupedTerms: this.groupTerms(sort, state.terms)
            };
        });
    }

    sortTerms(terms: TermProps[], sort: SortValue): void {
        terms.sort(GlossarySort[sort].compare);
    }

    groupTerms(sort: SortValue, sortedTerms: TermProps[]): { [key: string]: TermProps[]; } {
        let groups: { [key: string]: TermProps[]; } = {};
        let currentSectionName: string = GlossarySort[sort].sectionName(sortedTerms[0]);
        let currentGroup: TermProps[] = [];
        for (let term of sortedTerms) {
            let sectionName: string = GlossarySort[sort].sectionName(term);
            if (sectionName !== currentSectionName) {
                groups[currentSectionName] = currentGroup;
                currentGroup = [];
                currentSectionName = sectionName;
            }
            currentGroup.push(term);
        }
        groups[currentSectionName] = currentGroup;
        return groups;
    }

    render() {
        return (
            <div className="glossary">
                <Helmet>
                    <title>Glossary</title>
                    <meta property="og:title" content="Glossary | DDRGuide" />
                    <meta property="og:description" content="A comprehensive glossary of DanceDanceRevolution terminology." />
                </Helmet>
                <div className="contentHeader">
                    <h1>Glossary</h1>
                </div>
                <div className="sortAndFilter">
                    <h2>Filter:</h2>
                    <div><SortSelect onSortUpdate={this.onSortUpdate} /></div>
                    <div><SearchBar /></div>
                </div>
                <div className="terms">
                    {Object.keys(this.state.groupedTerms).map(group =>
                        <TermGroup key={group} groupName={group}>
                            {this.state.groupedTerms[group].map(t => <Term key={t.term} {...t} />)}
                        </TermGroup>
                    )}
                </div>
            </div>
        );
    }
}

export default Glossary;