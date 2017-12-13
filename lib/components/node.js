'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _velocityReact = require('velocity-react');

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TreeNode = function (_React$Component) {
    (0, _inherits3.default)(TreeNode, _React$Component);

    function TreeNode(props) {
        (0, _classCallCheck3.default)(this, TreeNode);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TreeNode.__proto__ || (0, _getPrototypeOf2.default)(TreeNode)).call(this, props));

        _this.onClick = function (e) {
            var timeout = _this.state.timeout;


            if (!timeout) {
                _this.setState({
                    timeout: setTimeout(function () {
                        _this.handleClick(e);
                        _this.setState({
                            timeout: null
                        });
                    }, 350)
                });
            } else {
                clearTimeout(timeout);
                _this.setState({
                    timeout: null
                });
                _this.handleDoubleClick(e);
            }
        };

        _this.handleClick = function (e) {
            var _this$props = _this.props,
                node = _this$props.node,
                onToggle = _this$props.onToggle;
            var toggled = node.toggled;


            if (onToggle) {
                onToggle(node, !toggled, e);
            }
        };

        _this.handleDoubleClick = function (e) {
            var _this$props2 = _this.props,
                node = _this$props2.node,
                onSelectNode = _this$props2.onSelectNode;

            if (onSelectNode) {
                onSelectNode(node, e);
            }
        };

        _this.handleStart = function (e, data) {
            var _this$props3 = _this.props,
                node = _this$props3.node,
                handleStart = _this$props3.handleStart;

            _this.setState({
                dragging: true
            });
            handleStart(node, data);
        };

        _this.handleDrag = function (e, data) {
            //const {handleDrag} = this.props;
        };

        _this.handleStop = function (e, data) {
            var _this$props4 = _this.props,
                node = _this$props4.node,
                handleStop = _this$props4.handleStop;

            _this.setState({
                dragging: false
            });
            handleStop(node, data);
        };

        _this.onMouseOver = function (e) {
            e.stopPropagation();
            var _this$props5 = _this.props,
                node = _this$props5.node,
                draggingtree = _this$props5.draggingtree,
                onMouseOver = _this$props5.onMouseOver;

            if (draggingtree) {
                onMouseOver(node);
                _this.setState({
                    target: true
                });
            }
        };

        _this.onMouseOut = function (e) {
            e.stopPropagation();
            var _this$props6 = _this.props,
                node = _this$props6.node,
                draggingtree = _this$props6.draggingtree,
                onMouseOut = _this$props6.onMouseOut;

            if (draggingtree) {
                onMouseOut(node);
            }
            _this.setState({
                target: false
            });
        };

        _this.onContextMenu = function (e, node) {
            var onContextMenu = _this.props.onContextMenu;

            if (!!onContextMenu) {
                e.preventDefault();
                e.stopPropagation();
                onContextMenu(e, node);
            }
            return false;
        };

        _this.state = {
            dragging: false,
            target: false,
            timeout: null
        };
        return _this;
    }

    (0, _createClass3.default)(TreeNode, [{
        key: 'animations',
        value: function animations() {
            var _props = this.props,
                animations = _props.animations,
                node = _props.node;


            if (animations === false) {
                return false;
            }

            var anim = (0, _assign2.default)({}, animations, node.animations);
            return {
                toggle: anim.toggle(this.props),
                drawer: anim.drawer(this.props)
            };
        }
    }, {
        key: 'decorators',
        value: function decorators() {
            // Merge Any Node Based Decorators Into The Pack
            var _props2 = this.props,
                decorators = _props2.decorators,
                node = _props2.node;

            var nodeDecorators = node.decorators || {};

            return (0, _assign2.default)({}, decorators, nodeDecorators);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var style = this.props.style;

            var decorators = this.decorators();
            var animations = this.animations();

            return _react2.default.createElement(
                'li',
                { ref: function ref(_ref) {
                        return _this2.topLevelRef = _ref;
                    },
                    style: style.base },
                this.renderHeader(decorators, animations),
                this.renderDrawer(decorators, animations)
            );
        }
    }, {
        key: 'renderDrawer',
        value: function renderDrawer(decorators, animations) {
            var _this3 = this;

            var toggled = this.props.node.toggled;


            if (!animations && !toggled) {
                return null;
            } else if (!animations && toggled) {
                return this.renderChildren(decorators, animations);
            }

            var _animations$drawer = animations.drawer,
                animation = _animations$drawer.animation,
                duration = _animations$drawer.duration,
                restAnimationInfo = (0, _objectWithoutProperties3.default)(_animations$drawer, ['animation', 'duration']);

            return _react2.default.createElement(
                _velocityReact.VelocityTransitionGroup,
                (0, _extends3.default)({}, restAnimationInfo, {
                    ref: function ref(_ref2) {
                        return _this3.velocityRef = _ref2;
                    } }),
                toggled ? this.renderChildren(decorators, animations) : null
            );
        }
    }, {
        key: 'renderHeader',
        value: function renderHeader(decorators, animations) {
            var _props3 = this.props,
                node = _props3.node,
                style = _props3.style;
            var _state = this.state,
                dragging = _state.dragging,
                target = _state.target;


            return _react2.default.createElement(_header2.default, { animations: animations,
                decorators: decorators,
                onContextMenu: this.onContextMenu,
                node: (0, _assign2.default)({}, node),
                onClick: this.onClick,
                onMouseOver: this.onMouseOver,
                onMouseOut: this.onMouseOut,
                handleStart: this.handleStart,
                handleDrag: this.handleDrag,
                handleStop: this.handleStop,
                highlighted: dragging,
                targeted: target,
                style: style });
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren(decorators) {
            var _this4 = this;

            var _props4 = this.props,
                animations = _props4.animations,
                propDecorators = _props4.decorators,
                node = _props4.node,
                style = _props4.style,
                draggingtree = _props4.draggingtree;
            var dragging = this.state.dragging;


            if (node.loading) {
                return this.renderLoading(decorators);
            }

            var children = node.children;
            if (!Array.isArray(children)) {
                children = children ? [children] : [];
            }

            return _react2.default.createElement(
                'ul',
                { style: style.subtree,
                    ref: function ref(_ref3) {
                        return _this4.subtreeRef = _ref3;
                    } },
                children.map(function (child, index) {
                    return _react2.default.createElement(TreeNode, (0, _extends3.default)({}, _this4._eventBubbles(), {
                        animations: animations,
                        highlighted: dragging,
                        draggingtree: draggingtree,
                        decorators: propDecorators,
                        key: child.id || index,
                        node: child,
                        style: style }));
                })
            );
        }
    }, {
        key: 'renderLoading',
        value: function renderLoading(decorators) {
            var style = this.props.style;


            return _react2.default.createElement(
                'ul',
                { style: style.subtree },
                _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(decorators.Loading, { style: style.loading })
                )
            );
        }
    }, {
        key: '_eventBubbles',
        value: function _eventBubbles() {
            var _props5 = this.props,
                onToggle = _props5.onToggle,
                onSelectNode = _props5.onSelectNode,
                onContextMenu = _props5.onContextMenu,
                handleStart = _props5.handleStart,
                handleDrag = _props5.handleDrag,
                handleStop = _props5.handleStop,
                onMouseOver = _props5.onMouseOver,
                onMouseOut = _props5.onMouseOut;


            return {
                onToggle: onToggle,
                onSelectNode: onSelectNode,
                onContextMenu: onContextMenu,
                onMouseOver: onMouseOver,
                onMouseOut: onMouseOut,
                handleStart: handleStart,
                handleDrag: handleDrag,
                handleStop: handleStop
            };
        }
    }]);
    return TreeNode;
}(_react2.default.Component);

TreeNode.propTypes = {
    style: _propTypes2.default.object.isRequired,
    node: _propTypes2.default.object.isRequired,
    decorators: _propTypes2.default.object.isRequired,
    animations: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.bool]).isRequired,
    onToggle: _propTypes2.default.func,
    onSelectNode: _propTypes2.default.func,
    onContextMenu: _propTypes2.default.func
};

exports.default = TreeNode;
