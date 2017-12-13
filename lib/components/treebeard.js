'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _lodash = require('lodash');

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

var _decorators = require('./decorators');

var _decorators2 = _interopRequireDefault(_decorators);

var _default = require('../themes/default');

var _default2 = _interopRequireDefault(_default);

var _animations = require('../themes/animations');

var _animations2 = _interopRequireDefault(_animations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TreeBeard = function (_React$Component) {
    (0, _inherits3.default)(TreeBeard, _React$Component);

    function TreeBeard(props) {
        (0, _classCallCheck3.default)(this, TreeBeard);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TreeBeard.__proto__ || (0, _getPrototypeOf2.default)(TreeBeard)).call(this, props));

        _this.handleStart = function (node) {
            var handleStart = _this.props.handleStart;

            _this.setState({
                draggingNode: node
            });
            if (!!handleStart) {
                handleStart(node);
            }
            return false;
        };

        _this.handleStop = function (node) {
            var handleStop = _this.props.handleStop;
            var _this$state = _this.state,
                targetNode = _this$state.targetNode,
                draggingNode = _this$state.draggingNode;

            _this.setState({
                draggingNode: null,
                targetNode: null
            });

            if (!!handleStop && !!draggingNode && !!targetNode) {
                handleStop(draggingNode, targetNode);
            }
        };

        _this.onMouseOver = function (node) {
            var draggingNode = _this.state.draggingNode;


            if (!!draggingNode) {
                _this.setState({
                    targetNode: node
                });
            }
        };

        _this.onMouseOut = function (node) {
            var draggingNode = _this.state.draggingNode;

            if (!!draggingNode) {
                _this.setState({
                    targetNode: null
                });
            }
        };

        _this.state = {
            draggingNode: null,
            targetNode: null
        };
        return _this;
    }

    (0, _createClass3.default)(TreeBeard, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                animations = _props.animations,
                decorators = _props.decorators,
                propsData = _props.data,
                onToggle = _props.onToggle,
                style = _props.style,
                onContextMenu = _props.onContextMenu,
                handleDrag = _props.handleDrag,
                onSelectNode = _props.onSelectNode;
            var draggingNode = this.state.draggingNode;

            var data = propsData;

            // Support Multiple Root Nodes. Its not formally a tree, but its a use-case.
            if (!Array.isArray(data)) {
                data = [data];
            }
            return _react2.default.createElement(
                'ul',
                { className: 'treebeard', style: style.tree.base,
                    ref: function ref(_ref) {
                        return _this2.treeBaseRef = _ref;
                    } },
                data.map(function (node, index) {
                    return _react2.default.createElement(_node2.default, { animations: animations,
                        decorators: decorators,
                        key: node.id || index,
                        node: node,
                        draggingtree: !!draggingNode,
                        onToggle: onToggle,
                        onSelectNode: onSelectNode,

                        onContextMenu: onContextMenu,
                        style: style.tree.node,

                        onMouseOver: _this2.onMouseOver,
                        onMouseOut: _this2.onMouseOut,
                        handleStart: _this2.handleStart,
                        handleDrag: handleDrag,
                        handleStop: _this2.handleStop
                    });
                })
            );
        }
    }]);
    return TreeBeard;
}(_react2.default.Component);

TreeBeard.propTypes = {
    style: _propTypes2.default.object,
    data: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]).isRequired,
    animations: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.bool]),
    onToggle: _propTypes2.default.func,
    onSelectNode: _propTypes2.default.func,
    handleStart: _propTypes2.default.func,
    handleDrag: _propTypes2.default.func,
    handleStop: _propTypes2.default.func,
    decorators: _propTypes2.default.object,

    onContextMenu: _propTypes2.default.func
};

TreeBeard.defaultProps = {
    style: _default2.default,
    animations: _animations2.default,
    decorators: _decorators2.default
};

exports.default = TreeBeard;
