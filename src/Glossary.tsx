import React from 'react';
import Helmet from 'react-helmet';
import { AssertionError } from 'assert';

import Term, { TermProps } from './Term';
import glossaryJson from './glossary.json';
import './Glossary.scss';
import SearchBar from './SearchBar';
import SortSelect, { SortValue } from './SortSelect';

interface GlossaryProps {

}

interface GlossaryState {
    sort: SortValue;
    terms: TermProps[];
}

export class GlossaryStore {
    
    static instance?: GlossaryStore;

    allTerms: TermProps[] = [];
    termLookup: {[key: string]: TermProps} = {};

    constructor() {
        if (GlossaryStore.instance !== undefined) {
            throw new AssertionError();
        }
        let tmpConceptIndex = 0;
        glossaryJson.forEach(entry => {
            let temp: TermProps = {concept: tmpConceptIndex.toString().padStart(3, "0"), ...entry};
            this.termLookup[entry.term] = temp;
            this.allTerms.push(temp);
            tmpConceptIndex++;
        })
    }

    static getInstance(): GlossaryStore {
        if (GlossaryStore.instance === undefined) {
            GlossaryStore.instance = new GlossaryStore();
        }
        return GlossaryStore.instance;
    }
}

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
            terms: sortedTerms
        };
        
        this.onSortUpdate = this.onSortUpdate.bind(this);
    }

    onSortUpdate(sort: SortValue) {
        this.setState((state: GlossaryState, props: GlossaryProps) => {
            this.sortTerms(state.terms, sort);
            return {
                sort: sort,
                terms: state.terms
            };
        });
    }

    sortTerms(terms: TermProps[], sort: SortValue): void {
        let sorters: {[key in SortValue]: ((a: TermProps, b: TermProps) => number)} = {
            "alphabetical": ((a, b) => a.term.localeCompare(b.term)),
            "by-concept": ((a, b) => a.concept.localeCompare(b.concept))
        };

        terms.sort(sorters[sort]);
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
                    {this.state.terms.map(t => <Term key={t.term} {...t} />)}
                </div>
            </div>
        );
    }
}

export default Glossary;