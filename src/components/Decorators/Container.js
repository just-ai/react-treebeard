import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {VelocityComponent} from 'velocity-react';
import {DraggableCore} from 'react-draggable';

class Container extends PureComponent {
    renderToggle() {
        const {animations} = this.props;

        if (!animations) {
            return this.renderToggleDecorator();
        }

        return (
            <VelocityComponent
                animation={animations.toggle.animation}
                duration={animations.toggle.duration}
            >
                {this.renderToggleDecorator()}
            </VelocityComponent>
        );
    }

    renderToggleDecorator() {
        const {style, decorators} = this.props;
        return <decorators.Toggle style={style.toggle}/>;
    }

    render() {
        const {style, decorators, terminal, onClick, node,
            // handleStart, handleDrag, handleStop,
            onMouseOver, onMouseOut, onContextMenu,
            highlighted} = this.props;
        
        return (
            <DraggableCore
                axis='none'
                handle='.draggable'
                bounds='.treebeard'
                position={{x: 0, y: 0}}
                // onStart={handleStart}
                // onDrag={handleDrag}
                // onStop={handleStop}
            >
                <div
                    className={highlighted ? 'highlighted draggable' : 'draggable'}
                    onClick={onClick}
                    onMouseOver={onMouseOver}
                    onMouseOut={onMouseOut}
                    onContextMenu={onContextMenu}
                    style={node.active ? {...style.container} : {...style.link}}
                >
                    {!terminal ? this.renderToggle() : null}
                    <decorators.Header node={node} style={style.header}/>
                </div>
            </DraggableCore>
        );
    }
}

Container.propTypes = {
    style: PropTypes.object.isRequired,
    decorators: PropTypes.object.isRequired,
    terminal: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
    onContextMenu: PropTypes.func,
    handleStart: PropTypes.func,
    handleDrag: PropTypes.func,
    handleStop: PropTypes.func,
    highlighted: PropTypes.bool,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]).isRequired,
    node: PropTypes.object.isRequired
};

export default Container;
