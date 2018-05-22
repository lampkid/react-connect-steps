# react-connect-steps
react-connnect-steps, connect multi divs with svg line  in a horizontal or vertical  direction

# connect multi divs
```javascript
import React, { PureComponent } from 'react';
import Connect from 'react-connect-steps';

export default class ConnectSteps extends PureComponent {

    // mode = vertical || horizontal
	render() {
		return <div style={{width: 500}}>
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
```
