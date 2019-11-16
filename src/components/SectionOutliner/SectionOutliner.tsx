import React from "react";

export class SectionOutliner extends React.Component {
    render() {
        return (
            <aside className="column outline">
                <h4>Sections</h4>
                <ul>
                    {this.props.children}
                </ul>
            </aside>
        );
    }
}