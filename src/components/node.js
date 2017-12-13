'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { VelocityTransitionGroup } from 'velocity-react';

import NodeHeader from './header';

class TreeNode extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dragging: false,
            target: false,
            timeout: null
        }
    }

    onClick = (e) => {
        const {timeout} = this.state;

        if (!timeout) {
            this.setState({
                timeout: setTimeout(() => {
                    this.handleClick(e);
                    this.setState({
                        timeout: null
                    });
                }, 350)
            });
        } else {
            clearTimeout(timeout);
            this.setState({
                timeout: null
            });
            this.handleDoubleClick(e);
        }
    }

    handleClick = (e) => {
        const {node, onToggle} = this.props;
        const {toggled} = node;

        if (onToggle) {
            onToggle(node, !toggled, e);
        }
    }

    handleDoubleClick = (e) => {
        const {node, onSelectNode} = this.props;
        if (onSelectNode) {
            onSelectNode(node, e);
        }
    }

    handleStart = (e, data) => {
        const {node, handleStart} = this.props;
        this.setState({
            dragging: true
        });
        handleStart(node, data);
    }

    handleDrag = (e, data) => {
        //const {handleDrag} = this.props;
    }

    handleStop = (e, data) => {
        const {node, handleStop} = this.props;
        this.setState({
            dragging: false
        });
        handleStop(node, data);
    }

    onMouseOver = (e) => {
        e.stopPropagation();
        const {node, draggingtree, onMouseOver} = this.props;
        if (draggingtree) {
            onMouseOver(node);
            this.setState({
                target: true
            });
        }
    }

    onMouseOut = (e) => {
        e.stopPropagation();
        const {node, draggingtree, onMouseOut} = this.props;
        if (draggingtree) {
            onMouseOut(node);
        }
        this.setState({
            target: false
        });
    }

    animations() {
        const {animations, node} = this.props;

        if (animations === false) {
            return false;
        }

        const anim = Object.assign({}, animations, node.animations);
        return {
            toggle: anim.toggle(this.props),
            drawer: anim.drawer(this.props)
        };
    }

    decorators() {
        // Merge Any Node Based Decorators Into The Pack
        const {decorators, node} = this.props;
        let nodeDecorators = node.decorators || {};

        return Object.assign({}, decorators, nodeDecorators);
    }

    onContextMenu = (e, node) => {
        const {onContextMenu} = this.props;
        if (!!onContextMenu) {
            e.preventDefault();
            e.stopPropagation();
            onContextMenu(e, node);
        }
        return false;
    };

    render() {
        const {style} = this.props;
        const decorators = this.decorators();
        const animations = this.animations();

        return (
            <li ref={ref => this.topLevelRef = ref}
                style={style.base}>
                {this.renderHeader(decorators, animations)}

                {this.renderDrawer(decorators, animations)}
            </li>
        );
    }

    renderDrawer(decorators, animations) {
        const {node: {toggled}} = this.props;

        if (!animations && !toggled) {
            return null;
        } else if (!animations && toggled) {
            return this.renderChildren(decorators, animations);
        }

        const {animation, duration, ...restAnimationInfo} = animations.drawer;
        return (
            <VelocityTransitionGroup {...restAnimationInfo}
                                     ref={ref => this.velocityRef = ref}>
                {toggled ? this.renderChildren(decorators, animations) : null}
            </VelocityTransitionGroup>
        );
    }

    renderHeader(decorators, animations) {
        const {node, style} = this.props;
        const {dragging, target} = this.state;

        return (
            <NodeHeader animations={animations}
                        decorators={decorators}
                        onContextMenu={this.onContextMenu}
                        node={Object.assign({}, node)}
                        onClick={this.onClick}
                        onMouseOver={this.onMouseOver}
                        onMouseOut={this.onMouseOut}
                        handleStart={this.handleStart}
                        handleDrag={this.handleDrag}
                        handleStop={this.handleStop}
                        highlighted={dragging}
                        targeted={target}
                        style={style}/>
        );
    }

    renderChildren(decorators) {
        const {animations, decorators: propDecorators, node, style, draggingtree} = this.props;
        const {dragging} = this.state;

        if (node.loading) {
            return this.renderLoading(decorators);
        }

        let children = node.children;
        if (!Array.isArray(children)) {
            children = children ? [children] : [];
        }

        return (
            <ul style={style.subtree}
                ref={ref => this.subtreeRef = ref}>
                {children.map((child, index) => <TreeNode {...this._eventBubbles()}
                                                          animations={animations}
                                                          highlighted={dragging}
                                                          draggingtree={draggingtree}
                                                          decorators={propDecorators}
                                                          key={child.id || index}
                                                          node={child}
                                                          style={style}/>
                )}
            </ul>
        );
    }

    renderLoading(decorators) {
        const {style} = this.props;

        return (
            <ul style={style.subtree}>
                <li>
                    <decorators.Loading style={style.loading}/>
                </li>
            </ul>
        );
    }

    _eventBubbles() {
        const {onToggle, onSelectNode, onContextMenu, handleStart, handleDrag, handleStop, onMouseOver, onMouseOut} = this.props;

        return {
            onToggle,
            onSelectNode,
            onContextMenu,
            onMouseOver,
            onMouseOut,
            handleStart,
            handleDrag,
            handleStop
        };
    }
}

TreeNode.propTypes = {
    style: PropTypes.object.isRequired,
    node: PropTypes.object.isRequired,
    decorators: PropTypes.object.isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]).isRequired,
    onToggle: PropTypes.func,
    onSelectNode: PropTypes.func,
    onContextMenu: PropTypes.func
};

export default TreeNode;
