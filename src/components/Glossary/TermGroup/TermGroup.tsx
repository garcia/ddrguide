import React from 'react';
import moize from 'moize';

import './TermGroup.scss';

export const TermGroup: React.FunctionComponent<{groupName: string}> = moize.react(props =>
    <div className="termGroup">
        <h2>{props.groupName}</h2>
        {props.children}
    </div>);