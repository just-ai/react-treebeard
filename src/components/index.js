import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {castArray} from 'lodash';

import defaultTheme from '../themes/default';
import defaultAnimations from '../themes/animations';
import {randomString} from '../util';
import {Ul} from './common';
import defaultDecorators from './Decorators';
import TreeNode from './TreeNode';

const TreeBeard = ({
    animations, decorators, data, onToggle, style,
    handleStart: propHandleStart, handleDrag, handleStop: propHandleStop,
    onContextMenu
}) => {
    const [draggingNode, setDraggingNode] = useState(null);
    const [targetNode, setTargetNode] = useState(null);

    const handleStart = (node) => {
        setDraggingNode(node);
        if (propHandleStart) {
            propHandleStart(node);
        }
    };

    const handleStop = (node) => {
        if (draggingNode && targetNode && propHandleStop) {
            propHandleStop(node);
        }
        setDraggingNode(null);
        setTargetNode(null);
    };

    const onMouseOver = (node) => {
        if (draggingNode) {
            setTargetNode(node);
        }
    };

    const onMouseOut = () => {
        if (draggingNode) {
            setTargetNode(null);
        }
    };

    return (
        <Ul className='treebeard' style={{...defaultTheme.tree.base, ...style.tree.base}}>
            {castArray(data).map(node => (
                <TreeNode
                    {...{decorators, node, onToggle, animations,
                        handleStart, handleDrag, handleStop,
                        onMouseOver, onMouseOut, onContextMenu}}
                    key={node.id || randomString()}
                    draggingtree={Boolean(draggingNode)}
                    style={{...defaultTheme.tree.node, ...style.tree.node}}
                />
            ))}
        </Ul>
    );
};

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
    handleStart: PropTypes.func,
    handleDrag: PropTypes.func,
    handleStop: PropTypes.func,
    onContextMenu: PropTypes.func,
    decorators: PropTypes.object
};

TreeBeard.defaultProps = {
    style: defaultTheme,
    animations: defaultAnimations,
    decorators: defaultDecorators,
};

export default TreeBeard;
