import React, { PureComponent } from 'react';
import Connect from '../../src';

export default class ConnectSteps extends PureComponent {
    componentDidMount() {

    }

	render() {
		return <div  style={{width: 500}}>
            <Connect mode="vertical">
                <div>
                    <ol>
                        <li>one</li>
                        <li>one</li>
                        <li>one</li>
                        <li>one</li>
                        <li>one</li>
                    </ol>
                </div>
                <div>two
<ol>
                        <li>one</li>
                        <li>one</li>
                        <li>one</li>
                        <li>one</li>
                        <li>one</li>
                    </ol>
                </div>
                <div>three</div>
                <div>four</div>
            </Connect>
		</div>
	}
}
