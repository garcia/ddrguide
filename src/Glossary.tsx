import React from 'react';
import Term, { TermProps } from './Term';
import glossaryJson from './glossary.json';
import { AssertionError } from 'assert';
import Helmet from 'react-helmet';

import './Glossary.scss';
import { HashLink } from 'react-router-hash-link';

export class GlossaryStore {
    
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
                <div className="contentHeader">
                    <h1>Glossary</h1>
                    <p>
                        A comprehensive glossary of DanceDanceRevolution terminology.
                        Please note that these definitions are focused on <HashLink to="#term-dancedancerevolution-a">DDR A</HashLink> and <HashLink to="#term-dancedancerevolution-a20">DDR A20</HashLink>,
                        the two most recent DDR mixes at the time of writing, and
                        the primary focus of the Western competitive scene.
                    </p>
                </div>
                {termElements}
            </div>
        )
    }
}

export default Glossary;