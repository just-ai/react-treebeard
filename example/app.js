import React, {Fragment, PureComponent} from 'react';
import ReactDOM from 'react-dom';

import {Treebeard, decorators} from '../src';
import {Div} from '../src/components/common';
import data from './data';
import styles from './styles';
import * as filters from './filter';
import Header from './Header';
import NodeViewer from './NodeViewer';

class DemoTree extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {data};
        this.onToggle = this.onToggle.bind(this);
    }

    onToggle(node, toggled) {
        const {cursor, data} = this.state;

        if (cursor) {
            cursor.active = false;
        }

        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }

        this.setState(() => ({cursor: node, data: Object.assign({}, data)}));
    }

    onFilterMouseUp({target: {value}}) {
        const filter = value.trim();
        if (!filter) {
            return this.setState(() => ({data}));
        }
        let filtered = filters.filterTree(data, filter);
        filtered = filters.expandFilteredNodes(filtered, filter);
        this.setState(() => ({data: filtered}));
    }

    render() {
        const {data, cursor} = this.state;
        return (
            <Fragment>
                <Div style={styles.searchBox}>
                    <Div className="input-group">
                        <span className="input-group-addon">
                            <i className="fa fa-search"/>
                        </span>
                        <input
                            className="form-control"
                            onKeyUp={this.onFilterMouseUp.bind(this)}
                            placeholder="Search the tree..."
                            type="text"
                        />
                    </Div>
                </Div>
                <Div style={styles.component}>
                    <Treebeard
                        data={data}
                        decorators={{...decorators, Header}}
                        /*eslint-disable-next-line no-console */
                        handleStart={(...args) => console.log('start', ...args)}
                        /*eslint-disable-next-line no-console */
                        handleDrag={(...args) => console.log('drag', ...args)}
                        /*eslint-disable-next-line no-console */
                        handleStop={(...args) => console.log('stop', ...args)}
                        /*eslint-disable-next-line no-console */
                        onContextMenu={(...args) => console.log('context-menu', ...args)}
                        onToggle={this.onToggle}
                    />
                </Div>
                <Div style={styles.component}>
                    <NodeViewer node={cursor}/>
                </Div>
            </Fragment>
        );
    }
}

const content = document.getElementById('content');
ReactDOM.render(<DemoTree/>, content);
