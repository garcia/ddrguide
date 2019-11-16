import React from 'react';

import './SortSelect.scss';

export type SortValue = "by-concept" | "alphabetical";

interface SortState {
    value: SortValue;
}

interface SortProps {
    onSortUpdate: (sort: SortValue) => void;
}

export class SortSelect extends React.Component<SortProps, SortState> {
    state: SortState;

    constructor(props: SortProps) {
        super(props);
        this.state = {
            value: "by-concept"
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        let sort = event.target.value as SortValue;
        this.setState({
            value: sort
        });
        this.props.onSortUpdate(sort);
    }

    render() {
        return (
            <select className="sortSelect" value={this.state.value} onChange={this.handleChange}>
                <option value="by-concept">Sort by concept</option>
                <option value="alphabetical">Sort A-Z</option>
            </select>
        )
    }

}