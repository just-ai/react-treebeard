import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {isArray} from 'lodash';

import defaultAnimations from '../../themes/animations';
import {randomString} from '../../util';
import {Ul} from '../common';
import NodeHeader from '../NodeHeader';
import Drawer from './Drawer';
import Loading from './Loading';

const Li = styled('li', {
    shouldForwardProp: prop => ['className', 'children', 'ref'].indexOf(prop) !== -1
})(({style}) => style);

class TreeNode extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            dragging: false,
            target: false,
        };

        this.onClick = this.onClick.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);
    }

    onClick() {
        const {node, onToggle} = this.props;
        const {toggled} = node;
        if (onToggle) {
            onToggle(node, !toggled);
        }
    }

    handleStart(_, data) {
        const {node, handleStart} = this.props;
        this.setState({ dragging: true });
        if (handleStart) {
            handleStart(node, data);
            return true;
        }
    }

    handleDrag(_, data) {
        const {node, handleDrag} = this.props;
        if (handleDrag) {
            handleDrag(node, data);
            return true;
        }
    }

    handleStop(_, data) {
        const {node, handleStop} = this.props;
        this.setState({ dragging: false });
        if (handleStop) {
            handleStop(node, data);
            return true;
        }
    }

    onMouseOver(e) {
        e.stopPropagation();
        if (!this.props.draggingtree) return;

        const {node, onMouseOver} = this.props;
        this.setState({ target: true });
        if (onMouseOver) {
            onMouseOver(node);
        }
    }

    onMouseOut(e) {
        e.stopPropagation();
        this.setState({
            target: false
        });
        if (!this.props.draggingtree) return;

        const {node, onMouseOut} = this.props;
        if (onMouseOut) {
            onMouseOut(node);
        }
    }

    onContextMenu(e, node) {
        const {onContextMenu} = this.props;
        if (onContextMenu) {
            e.preventDefault();
            e.stopPropagation();
            onContextMenu(e, node);
        }
        return false;
    }

    animations() {
        const {animations, node} = this.props;
        if (!animations) {
            return {
                toggle: defaultAnimations.toggle(this.props, 0)
            };
        }
        const animation = Object.assign({}, animations, node.animations);
        return {
            toggle: animation.toggle(this.props),
            drawer: animation.drawer(this.props)
        };
    }

    decorators() {
        const {decorators, node} = this.props;
        let nodeDecorators = node.decorators || {};

        return Object.assign({}, decorators, nodeDecorators);
    }

    renderChildren(decorators) {
        const {animations, decorators: propDecorators, node, style, onToggle, draggingtree,
            handleStart, handleDrag, handleStop,
            onMouseOver, onMouseOut, onContextMenu} = this.props;
        const {dragging} = this.state;

        if (node.loading) {
            return (
                <Loading {...{decorators, style}}/>
            );
        }

        let children = node.children;
        if (!isArray(children)) {
            children = children ? [children] : [];
        }

        return (
            <Ul style={style.subtree}>
                {children.map(child => (
                    <TreeNode
                        {...{onToggle, animations, style,
                            handleStart, handleDrag, handleStop,
                            onMouseOver, onMouseOut, onContextMenu}}
                        highlighted={dragging}
                        draggingtree={draggingtree}
                        decorators={propDecorators}
                        key={child.id || randomString()}
                        node={child}
                    />
                ))}
            </Ul>
        );
    }

    render() {
        const {node, style, highlighted, draggingtree} = this.props;
        const {dragging, target} = this.state;
        const decorators = this.decorators();
        const animations = this.animations();
        const {...restAnimationInfo} = animations.drawer;
        return (
            <Li style={style.base}>
                <NodeHeader
                    {...{decorators, animations, node, style}}
                    onClick={this.onClick}
                    handleStart={this.handleStart}
                    handleDrag={this.handleDrag}
                    handleStop={this.handleStop}
                    onMouseOver={this.onMouseOver}
                    onMouseOut={this.onMouseOut}
                    onContextMenu={this.onContextMenu}
                    highlighted={highlighted || dragging}
                    targeted={target}
                />
                <Drawer restAnimationInfo={{...restAnimationInfo}}>
                    {node.toggled ? this.renderChildren(decorators, animations, draggingtree) : null}
                </Drawer>
            </Li>
        );
    }
}

TreeNode.propTypes = {
    onToggle: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
    onContextMenu: PropTypes.func,
    handleStart: PropTypes.func,
    handleDrag: PropTypes.func,
    handleStop: PropTypes.func,
    draggingtree: PropTypes.bool,
    highlighted: PropTypes.bool,
    style: PropTypes.object.isRequired,
    node: PropTypes.object.isRequired,
    decorators: PropTypes.object.isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]).isRequired
};

export default TreeNode;
