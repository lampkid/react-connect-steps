import React from 'react';

function Line({
    style, 
    coordinate={ x1: 50, y1: 0, x2: 50, y2: 50}
    }) {

    const { x1, y1, x2, y2 } = coordinate;

    return (
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" style={{...style}}>
            <defs> 
              <marker id="markerArrow" markerWidth="11" markerHeight="11" refX={2} refY={6} orient="auto"> 
                <path d="M2,2 L2,11 L10,6 L2,2" style={{"fill": "#8C9EFF"}} /> 
              </marker> 
            </defs>
            <line {...coordinate} style={{"stroke": "#8C9EFF", "markerEnd": "url(#markerArrow)"}}></line>
        </svg>
    );
}

function Border({children, style}) {
    return <div style={{border: '2px solid #8C9EFF', ...style}}>{children}</div>
}

export default class Connect extends React.PureComponent {
    state = {width: [], height: [], top: [], left: []}

    borders = [];

    updated = false;

    componentDidMount() {
        this.updatePlacement(); 
        
    }

    updatePlacement() {
        const width = [], height = [], top = [], left = [];
        this.borders.forEach( (borderElem, index) => {
            width[index] = borderElem && borderElem.offsetWidth || 0;
            height[index] = borderElem && borderElem.offsetHeight || 0;
            top[index] = borderElem && borderElem.offsetTop || 0;
            left[index] = borderElem && borderElem.offsetLeft || 0;
        });
        this.setState({width, height, top, left}, () => {
            if (!this.updated) {
                this.updated = true;
                // need to render again when all the component rendered
                this.updatePlacement();
            }

        });
    }
    

    render() {
        const children = this.props.children || [];
        let {width, height, mode='vertical', arrowLenth=50} = this.props;
        const length = children.length;
        return (
            <div style={{width: '100%', position: 'relative'}}>
            {
                React.Children.map(children, (child, index) => {
                    let style = {display: 'inline-block'}, lineStyle;
                    let coordinate;
                    if (mode === 'vertical') {
                        height = '100%';
                        const halfWidth = this.state.width[index] / 2.0 || 0;
                        const halfHeight = this.state.height[index] / 2.0 || 0;
                        const x1 = this.state.left[index] + halfWidth;
                        const x2 = this.state.left[index + 1] + this.state.width[index + 1] / 2.0;;
                        
                        coordinate = {
                            x1: x1 || 0,
                            y1:0,
                            x2: x2 || 0,
                            y2: arrowLenth
                        }

                        const revisionMargin = 0;

                        style = {...style, position: 'absolute', left: '50%', marginLeft: -halfWidth, marginTop: revisionMargin}; // center
                        lineStyle = {height: arrowLenth + 8, marginTop: (this.state.height[index] || 0) + revisionMargin};
                    }

                    else {
                        const halfHeight = this.state.height[index] / 2.0 || 0;
                        const y1 = this.state.top[index] + halfHeight;
                        const y2 = this.state.top[index + 1] + this.state.height[index + 1] / 2.0;
                        coordinate = {
                            x1: 0,
                            y1: y1 || 0,
                            x2: arrowLenth,
                            y2: y2 || 0
                        }

                        style = {...style, position: 'absolute', top: '50%', marginTop: -halfHeight } // center

                        lineStyle = {width: arrowLenth + 8, marginLeft: this.state.width[index]};
                    }

                    const step = <div ref={(elem) =>{this.borders[index] = elem; } } style={{...style, border: '2px solid #8C9EFF'}}>{child}</div>;
                    
                    return [mode === 'vertical' ? <div>{step}</div> : step, index !== length -1 ? <Line style={lineStyle} coordinate={coordinate} /> : null]
                })
            }
            </div>
        );
    }
}
