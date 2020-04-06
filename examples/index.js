import React from 'react';
import ReactDOM from 'react-dom';
import Vertical from './vertical';
import Horizontal from './horizontal';
import Demo from './demo';
import TreeDemo from './tree';
const Main = () => {
    return (
        <div>
            <TreeDemo />
            <Vertical />
            <Horizontal />

            <Demo />
        </div>
    );
}

ReactDOM.render(<Main />, document.getElementById('main'));
