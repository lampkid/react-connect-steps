import React from 'react';
import ReactDOM from 'react-dom';
import Vertical from './vertical';
import Horizontal from './horizontal';
const Main = () => {
    return (
        <div>
            <Vertical />
            <Horizontal />
        </div>
    );
}

ReactDOM.render(<Main />, document.getElementById('main'));
