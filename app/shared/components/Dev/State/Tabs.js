// @flow
import React, { Component } from 'react';
import { map } from 'lodash';

import {
  Dropdown,
  Header,
  Tab,
} from 'semantic-ui-react';
import ReactJson from 'react-json-view';

class DevStateTabs extends Component<Props> {
  state = {
    activeIndex: 0
  }
  onChange = (e, { value }) => this.setState({ activeIndex: value })
  render() {
    const panes = map(this.props, (state, name) => ({
      pane: (
        <Tab.Pane key={name}>
          <ReactJson
            displayDataTypes={false}
            displayObjectSize={false}
            iconStyle="square"
            name={null}
            src={this.props[name]}
            style={{ padding: '1em' }}
            theme="harmonic"
          />
        </Tab.Pane>
      )
    }));
    let index = -1;
    const options = map(this.props, (state, name) => {
      index += 1;
      return {
        text: name,
        value: index
      };
    });
    const { activeIndex } = this.state;
    return (
      <React.Fragment>
        <Dropdown
          autoFocus
          onChange={this.onChange}
          options={options}
          search
          selection
        />
        <Tab
          activeIndex={activeIndex}
          onTabChange={this.onTabChange}
          panes={panes}
          renderActiveOnly={false}
        />
      </React.Fragment>
    );
  }
}

export default DevStateTabs;
