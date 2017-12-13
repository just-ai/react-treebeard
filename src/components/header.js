'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import shallowEqual from 'shallowequal';
import deepEqual from 'deep-equal';

class NodeHeader extends React.Component {
    shouldComponentUpdate(nextProps) {
        const props = this.props;
        const nextPropKeys = Object.keys(nextProps);

        for (let i = 0; i < nextPropKeys.length; i++) {
            const key = nextPropKeys[i];
            if (key === 'animations') {
                continue;
            }

            const isEqual = shallowEqual(props[key], nextProps[key]);
            if (!isEqual) {
                return true;
            }
        }

        return !deepEqual(props.animations, nextProps.animations, {strict: true});
    }

    render() {
        const {
            animations, decorators, node, onClick, style, onContextMenu,
            handleStart, handleDrag, handleStop, onMouseOver, onMouseOut, highlighted, targeted
        } = this.props;
        const {active, children} = node;
        const terminal = !children;
        const container = [
            style.link,
            active ? style.activeLink : null,
            highlighted ? style.highlightedLink : null, ,
            targeted ? style.targetedLink : null];
        const headerStyles = Object.assign({container}, style);

        return (
            <decorators.Container animations={animations}
                                  decorators={decorators}
                                  onContextMenu={onContextMenu}
                                  node={node}
                                  onClick={onClick}
                                  highlighted={highlighted}
                                  handleStart={handleStart}
                                  handleDrag={handleDrag}
                                  handleStop={handleStop}
                                  onMouseOver={onMouseOver}
                                  onMouseOut={onMouseOut}
                                  style={headerStyles}
                                  terminal={terminal}/>
        );
    }
}

NodeHeader.propTypes = {
    style: PropTypes.object.isRequired,
    decorators: PropTypes.object.isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]).isRequired,
    node: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    onContextMenu: PropTypes.func
};

export default NodeHeader;
