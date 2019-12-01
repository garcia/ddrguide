import React, { ChangeEvent } from 'react';
import Autosuggest, { SuggestionsFetchRequestedParams, SuggestionSelectedEventData } from 'react-autosuggest';
import { TermProps } from '../Term';
import { GlossaryStore } from '../Glossary';
import Autosuggest_theme from './Autosuggest.module.scss';
import { makeAnchor } from '../../../utils/make-anchor';
import { HashRedirect } from '../../HashRedirect/HashRedirect';

interface SearchBarProps {
}

interface SearchBarState {
    value: string;
    suggestions: SuggestionProps[];
    redirect: JSX.Element | undefined;
}

interface SuggestionProps {
    termProps: TermProps;
    matchedTerm: string;
    boldRegion: [number, number];
}

class Suggestion extends React.Component<SuggestionProps> {

    static getSuggestions(input: string): SuggestionProps[] {
        const glossaryStore: GlossaryStore = GlossaryStore.getInstance();

        if (input.length === 0) {
            return [];
        }
        input = input.toLowerCase();

        let suggestions: SuggestionProps[] = [];
        let suggested: {[key: string]: boolean | undefined} = {};
        
        for (let termProps of glossaryStore.allTerms) {
            if (suggested[termProps.term] === undefined && termProps.term.toLowerCase().startsWith(input)) {
                suggestions.push({
                    termProps: termProps,
                    matchedTerm: termProps.term,
                    boldRegion: [0, input.length]
                });
                suggested[termProps.term] = true;
            }
        }

        for (let termProps of glossaryStore.allTerms) {
            if (suggested[termProps.term] === undefined && termProps.acronym !== undefined) {
                if (termProps.acronym.toLowerCase().startsWith(input)) {
                    suggestions.push({
                        termProps: termProps,
                        matchedTerm: termProps.acronym,
                        boldRegion: [0, input.length]
                    });
                    suggested[termProps.term] = true;
                }
            }
            if (suggested[termProps.term] === undefined && termProps.aka !== undefined) {
                for (let aka of termProps.aka) {
                    if (aka.toLowerCase().startsWith(input)) {
                        suggestions.push({
                            termProps: termProps,
                            matchedTerm: aka,
                            boldRegion: [0, input.length]
                        });
                        suggested[termProps.term] = true;
                        break;
                    }
                }
            }
        }

        return suggestions;
    }

    render() {
        let displayText: string;
        if (this.props.matchedTerm === this.props.termProps.term) {
            displayText = this.props.matchedTerm;
        } else {
            displayText = this.props.matchedTerm + ' (' + this.props.termProps.term + ')';
        }
        var [boldL, boldR] = this.props.boldRegion;
        return (
            <>
                {displayText.slice(0, boldL)}
                <b>{displayText.slice(boldL, boldR)}</b>
                {displayText.slice(boldR)}
            </>
        );
    }
}

export class SearchBar extends React.Component<SearchBarProps> {
    
    glossaryStore: GlossaryStore = GlossaryStore.getInstance();
    state: SearchBarState;
    
    constructor(props: SearchBarProps) {
        super(props);
        
        this.state = {
            value: '',
            suggestions: [],
            redirect: undefined,
        };

        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSuggestionsFetchRequested(value: SuggestionsFetchRequestedParams): void {
        this.setState({
            suggestions: Suggestion.getSuggestions(value.value)
        });
    }

    onSuggestionsClearRequested(): void {
        this.setState({
            suggestions: []
        });
    }

    onSuggestionSelected(event: React.FormEvent<any>, data: SuggestionSelectedEventData<SuggestionProps>): void {
        let redirect: JSX.Element = <HashRedirect to={"#term-" + makeAnchor(data.suggestionValue)}></HashRedirect>;
        this.setState({
            redirect: redirect
        });
    }
    
    onChange(event: ChangeEvent<HTMLInputElement>, params: Autosuggest.ChangeEvent): void {
        this.setState({
            value: params.newValue
        });
    };

    render() {
        const inputProps = {
            placeholder: 'Search',
            value: this.state.value,
            onChange: this.onChange
        };

        return (
            <>
            <Autosuggest
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                onSuggestionSelected={this.onSuggestionSelected}
                getSuggestionValue={(props) => props.termProps.term}
                renderSuggestion={(props) => <Suggestion {...props} />}
                inputProps={inputProps}
                theme={Autosuggest_theme}
            />
            {this.state.redirect}
            </>
        );
    }
}