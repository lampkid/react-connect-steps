import React from 'react';

import "./index.less";

export function on(el, eventName, callback, opts) {
    opts = opts || false;
    if (el.addEventListener) {
        el.addEventListener(eventName, callback, opts);
    } else if (el.attachEvent) {
        el.attachEvent(`on${eventName}`, (e) => {
            callback.call(el, e || window.event);
        });
    }
}

export function off(el, eventName, callback, opts) {
    opts = opts || false;
    if (el.removeEventListener) {
        el.removeEventListener(eventName, callback, opts);
    } else if (el.detachEvent) {
        el.detachEvent(`on${eventName}`, callback);
    }
}


export default class Tree extends React.Component {

    state = {
        axis: {}
    }

    mainTreeNodeElems = {};
    parentOfMainTreeNodeElems = {};

    classifyTreeNodes(treeNode) {
        let mainTreeNode, childTreeNodes = [];
        React.Children.map(treeNode.props.children, (child, index) => {
            if (child.type === MainTreeNode) {
                mainTreeNode = child;
            }
            else {
                
                childTreeNodes.push(child);
            }
        })
        return {mainTreeNode, childTreeNodes};
    }

    getMainTreeNodeHierarchy(treeNode, hierarchy=[], grade=0) {
        const { mainTreeNode, childTreeNodes } = this.classifyTreeNodes(treeNode);
        hierarchy.push({mainTreeNode, grade});
        childTreeNodes.map((childTreeNode) => {
            this.getMainTreeNodeHierarchy(childTreeNode, hierarchy, grade + 1);
        });
    }

    gradeHierarchy(hierarchy) {
        let hierarchyGraded = [];
        hierarchy.forEach((mainTreeNodeObj) => {
            const {mainTreeNode, grade} = mainTreeNodeObj;
            if (!hierarchyGraded[grade]) {
                hierarchyGraded[grade] = [];
            }
            hierarchyGraded[grade].push(mainTreeNode);
        });
        return hierarchyGraded;
    }

    componentDidMount() {
        
        const axis = {};

        Object.keys(this.mainTreeNodeElems).forEach( (key) => {
            const { elem, childLength } = this.mainTreeNodeElems[key] || {};
            axis[key] = {};
            axis[key].parent = { x: elem.offsetLeft + elem.offsetWidth/2.0, y: elem.offsetTop };
            for (let i = 0; i < childLength; i++) {
                if (!axis[key].children) {
                    axis[key].children = [];
                }
                const childKey = key + i;
                const { elem: childElem } = this.mainTreeNodeElems[childKey] || {};
                console.log(key+i);

                const { elem: elemPostionRelatived } = this.parentOfMainTreeNodeElems[`parent${childKey}`]; 
                
                axis[key].children[i] = { x: elemPostionRelatived.offsetLeft + childElem.offsetLeft + childElem.offsetWidth/2.0, y: childElem.offsetTop};
            }

        });

        console.log('axis:', axis);

        this.setState({axis});

    }

    saveMainTreeNodeRef(elem, grade, preIndex, childLength) {
        this.mainTreeNodeElems['mainTreeNode' + preIndex] ={ 
            grade,
            elem,
            childLength
        }
    }

    saveParentOfMainTreeNodeRef(elem, grade, preIndex) {
        this.parentOfMainTreeNodeElems['parentmainTreeNode' + preIndex] = {
            grade,
            elem
        };
    }

    renderTreeNode(treeNode, grade=0, preIndex=0) {
        const {mainTreeNode, childTreeNodes} = this.classifyTreeNodes(treeNode);
        const status = mainTreeNode.props.status;
        const borderWidth = status === 'running' ? 0 : 2;
        return (
            <div style={{display: 'inline-block', position: 'relative' }} 
                 ref={(elem) => this.saveParentOfMainTreeNodeRef(elem, grade, preIndex)}>

                <div className="react-tree-main-treeNode-wrapper" style={{display: 'flex', justifyContent: 'center'}}>
                    <div ref={(elem) => this.saveMainTreeNodeRef(elem, grade, preIndex, childTreeNodes.length)} style={{ border: `${borderWidth}px solid #8C9EFF`, display: 'inline-block', position: 'relative'}}>
                        { status === 'running' ? <Rect style={{position:'absolute', top: 0, left: 0, fill: 'transparent', zIndex:-1}}/>: null}
                        {mainTreeNode}
                    </div>
                </div>
                <div>
                    <Curve axis={this.state.axis['mainTreeNode' + preIndex]} />
                    <div  style={{display: 'flex'}}>
                        {
                            React.Children.map(childTreeNodes, (childTreeNode, index) => {
                                return this.renderTreeNode(childTreeNode, grade + 1, `${preIndex}${index}`);
                            })
                        }
                    </div>
                </div>
            </div>
        );
        
    }

    render() {
        let parentNode, mainTreeNode;
        const { children } = this.props;

        const treeNode = React.Children.only(children);
        
        let hierarchy = [];

        this.getMainTreeNodeHierarchy(treeNode, hierarchy);

        const hierarchyGraded = this.gradeHierarchy(hierarchy);




        let style, x1 = 0, y1 = 0, x2 = 200, y2=300;
        
        return (
            <div className="react-tree" ref={(elem) => this.rootElem = elem} style={{position: 'relative', ...this.props.style}}>
            {this.renderTreeNode(treeNode)} 
            </div>
        );
    }
}

function Rect({style}) {
    return (
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" style={{height: '100%', width: '100%', ...style }}>
           <rect className="node-border" height="100%" width="100%"></rect> 
        </svg>
    );
}

function Curve({
    style, 
    height=40,
    axis={parent: {}, children: []}
    }) {


    const {parent: {x: parentX}, children=[]} = axis;

    return (
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" style={{height, width: '100%', ...style }}>
            <defs> 
              <marker id="markerArrow" markerWidth="11" markerHeight="11" refX={2} refY={6} orient="auto"> 
                <path d="M2,2 L2,11 L10,6 L2,2" style={{"fill": "#8C9EFF"}} /> 
              </marker> 
            </defs>
            {
                children.map( (childAxis, index) => {
                    const { x: childX, y } = childAxis;
                    const delta = height / 2.0;
                    return <path key={index} className="treeNode-joint-path" d={`M ${parentX},${y} L ${parentX} ${y+delta}, L ${childX} ${y+delta}  L ${childX} ${y + height - 7}`} style={{stroke: "#8C9EFF", fill: 'transparent', strokeLinejoin: 'round', strokeLinecap: 'round', strokeWidth: 1, markerEnd: 'url(#markerArrow)'}} />
                })
            }
        </svg>
    );
}

class TreeNode extends React.Component {
    render() {
        return (
            <div className="react-tree-tree-node">
            </div>
        );
    }
}

class MainTreeNode extends TreeNode {
    render() {
        return (
            <div className="react-tree-main-tree-node">
                {this.props.children}
            </div>
        )
    }
}

class SubTree extends React.Component {
    render() {
        return (
            <div className="react-tree-subtree">
                subTree
            </div>
        );
    }
}

export {Tree, SubTree, TreeNode, MainTreeNode};
