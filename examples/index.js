import React from 'react';
import ReactDOM from 'react-dom';
import Vertical from './vertical';
import Horizontal from './horizontal';
import Demo from './demo';
const Main = () => {
    return (
        <div>
            <Vertical />
            <Horizontal />

            <Demo />
        </div>
    );
}

ReactDOM.render(<Main />, document.getElementById('main'));
