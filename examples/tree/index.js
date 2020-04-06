import React, { PureComponent } from 'react';
import {Tree, TreeNode, SubTree, MainTreeNode} from '../../src/tree';

export default class TreeDemo extends PureComponent {
    componentDidMount() {

    }

	render() {
		return <div  style={{width: 500}}>
            <Tree mode="vertical" style={{overflowX: 'scroll', width: 1000}}>
                <TreeNode>
                    <MainTreeNode>
                        main0
                    </MainTreeNode>
                    <TreeNode>
                        <MainTreeNode status="running">
                                <p onClick={()=>console.log(1)}>one1</p>
                                <p>g1-b</p>
                                <p>g1-b</p>
                        </MainTreeNode>
                        <TreeNode>
                            <MainTreeNode>
                                <ol>
                                <li>g1-b-b1</li>
                                <li>g1-b-b1</li>
                                </ol>
                            </MainTreeNode>
                        </TreeNode>
                        <TreeNode>
                            <MainTreeNode>
                                <ol>
                                <li>g1-b-b2</li>
                                <li>g1-b-b2</li>
                                </ol>
                            </MainTreeNode>
                        </TreeNode>
                    </TreeNode>
                    <TreeNode>
                        <MainTreeNode>
                            <ol>
                                <li>g1-a</li>
                                <li>g1-a</li>
                                <li>g1-a</li>
                                <li>g1-a</li>
                                <li>g1-a</li>
                            </ol>
                        </MainTreeNode>
                        <TreeNode>
                            <MainTreeNode>
                                <ol>
                                <li>g2-a-a1</li>
                                <li>g2-a-a2</li>
                                </ol>
                            </MainTreeNode>
                        </TreeNode>
                        <TreeNode>
                            <MainTreeNode>
                                <ol>
                                <li>g2-a-a2</li>
                                <li>g2-a-a2</li>
                                </ol>
                            </MainTreeNode>
                        </TreeNode>
                    </TreeNode>
                    <TreeNode>
                        <MainTreeNode>
                            <ol>
                                <li>g1-a</li>
                                <li>g1-a</li>
                                <li>g1-a</li>
                                <li>g1-a</li>
                                <li>g1-a</li>
                            </ol>
                        </MainTreeNode>
                        <TreeNode>
                            <MainTreeNode>
                                <ol>
                                <li>g2-a-a1</li>
                                <li>g2-a-a2</li>
                                </ol>
                            </MainTreeNode>
                        </TreeNode>
                        <TreeNode>
                            <MainTreeNode>
                                <ol>
                                <li>g2-a-a2</li>
                                <li>g2-a-a2</li>
                                </ol>
                            </MainTreeNode>
                        </TreeNode>
                    </TreeNode>
                </TreeNode>
            </Tree>
		</div>
	}
}
