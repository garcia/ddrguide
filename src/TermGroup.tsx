import React from 'react';
import moize from 'moize';

import './TermGroup.scss';

const TermGroup: React.FunctionComponent<{groupName: string}> = props =>
    <div className="termGroup">
        <h2>{props.groupName}</h2>
        {props.children}
    </div>;


export default moize.react(TermGroup);