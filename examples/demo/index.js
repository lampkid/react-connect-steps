import React, { PureComponent } from 'react';
import Connect from 'react-connect-steps';

export default class ConnectSteps extends PureComponent {

	render() {
		return <div style={{width: 500}}>
            <Connect mode="horizontal">
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
