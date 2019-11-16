import React from 'react';
import moize from 'moize';

import './TermGroup.scss';
import { makeAnchor } from '../../../utils/make-anchor';

export const TermGroup: React.FunctionComponent<{groupName: string}> = moize.react(props =>
    <div id={"group-" + makeAnchor(props.groupName)} className="termGroup">
        <h2>{props.groupName}</h2>
        {props.children}
    </div>
);