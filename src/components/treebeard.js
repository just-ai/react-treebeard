'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';

import TreeNode from './node';
import defaultDecorators from './decorators';
import defaultTheme from '../themes/default';
import defaultAnimations from '../themes/animations';

class TreeBeard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            draggingNode: null,
            targetNode: null
        }
    }

    handleStart = (node) => {
        const {handleStart} = this.props;
        this.setState({
            draggingNode: node
        });
        if (!!handleStart) {
            handleStart(node);
        }
        return false;
    };

    handleStop = (node) => {
        const {handleStop} = this.props;
        const {targetNode, draggingNode} = this.state;
        this.setState({
            draggingNode: null,
            targetNode: null
        });

        if (!!handleStop && !!draggingNode && !!targetNode) {
            handleStop(draggingNode, targetNode);
        }
    };

    onMouseOver = (node) => {
        const {draggingNode} = this.state;

        if (!!draggingNode) {
            this.setState({
                targetNode: node
            });
        }
    };

    onMouseOut = (node) => {
        const {draggingNode} = this.state;
        if (!!draggingNode) {
            this.setState({
                targetNode: null
            });
        }
    };

    render() {
        const {animations, decorators, data: propsData, onToggle, style, onContextMenu, handleDrag, onSelectNode} = this.props;
        const {draggingNode} = this.state;
        let data = propsData;

        // Support Multiple Root Nodes. Its not formally a tree, but its a use-case.
        if (!Array.isArray(data)) {
            data = [data];
        }
        return (
            <ul className="treebeard" style={style.tree.base}
                ref={ref => this.treeBaseRef = ref}>
                {data.map((node, index) =>
                    <TreeNode animations={animations}
                              decorators={decorators}
                              key={node.id || index}
                              node={node}
                              draggingtree={!!draggingNode}
                              onToggle={onToggle}
                              onSelectNode={onSelectNode}

                              onContextMenu={onContextMenu}
                              style={style.tree.node}

                              onMouseOver={this.onMouseOver}
                              onMouseOut={this.onMouseOut}
                              handleStart={this.handleStart}
                              handleDrag={handleDrag}
                              handleStop={this.handleStop}
                    />
                )}
            </ul>
        );
    }
}

TreeBeard.propTypes = {
    style: PropTypes.object,
    data: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]).isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]),
    onToggle: PropTypes.func,
    onSelectNode: PropTypes.func,
    handleStart: PropTypes.func,
    handleDrag: PropTypes.func,
    handleStop: PropTypes.func,
    decorators: PropTypes.object,

    onContextMenu: PropTypes.func
};

TreeBeard.defaultProps = {
    style: defaultTheme,
    animations: defaultAnimations,
    decorators: defaultDecorators
};

export default TreeBeard;
