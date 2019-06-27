import React, {Component} from 'react';
import PropTypes from 'prop-types';
import shallowEqual from 'shallowequal';
import deepEqual from 'deep-equal';

class NodeHeader extends Component {
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
        const {animations, decorators, node, onClick, style,
            handleStart, handleDrag, handleStop,
            onMouseOver, onMouseOut, onContextMenu,
            highlighted, targeted} = this.props;
        const {active, children} = node;
        const terminal = !children;
        let container = {...style.link};
        if (active) container = {...container, ...style.activeLink};
        if (highlighted) container = {...container, ...style.highlightedLink};
        if (targeted) container = {...container, ...style.targetedLink};
        const styles = Object.assign(style, {container});
        return (
            <decorators.Container
                {...{animations, decorators, node, onClick, terminal,
                    handleStart, handleDrag, handleStop,
                    onMouseOver, onMouseOut, onContextMenu,
                    highlighted}}
                style={styles}
            />
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
    highlighted: PropTypes.bool,
    targeted: PropTypes.bool,
    onClick: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
    onContextMenu: PropTypes.func,
    handleStart: PropTypes.func,
    handleDrag: PropTypes.func,
    handleStop: PropTypes.func,
};

export default NodeHeader;
