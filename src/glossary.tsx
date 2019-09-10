import React from 'react';
import Term, { TermProps } from './term';
import glossaryJson from './glossary.json';
import { AssertionError } from 'assert';
import Helmet from 'react-helmet';

class GlossaryStore {
    
    static instance?: GlossaryStore;

    allTerms: TermProps[] = [];
    termLookup: {[key: string]: TermProps} = {};

    constructor() {
        if (GlossaryStore.instance !== undefined) {
            throw new AssertionError();
        }
        glossaryJson.forEach(entry => {
            this.termLookup[entry.term] = entry;
            this.allTerms.push(entry);
        })
    }

    static getInstance(): GlossaryStore {
        if (GlossaryStore.instance === undefined) {
            GlossaryStore.instance = new GlossaryStore();
        }
        return GlossaryStore.instance;
    }
}

class Glossary extends React.Component {
    store: GlossaryStore = GlossaryStore.getInstance();

    render() {
        let sortedTerms: TermProps[] = this.store.allTerms.slice();
        sortedTerms.sort((a, b) => a.term.localeCompare(b.term));
        let termElements: JSX.Element[] = sortedTerms.map(t => <Term {...t} />);
        return (
            <div className="glossary">
                <Helmet>
                    <title>Glossary</title>
                </Helmet>
                {termElements}
            </div>
        )
    }
}

export default Glossary;