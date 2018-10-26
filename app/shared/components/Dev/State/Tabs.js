// @flow
import React, { Component } from 'react';
import { map } from 'lodash';

import {
  Dropdown,
  Header,
  Segment,
  Tab,
} from 'semantic-ui-react';
import ReactJson from 'react-json-view';

class DevStateTabs extends Component<Props> {
  panes: []
  constructor(props) {
    super(props);
    let index = -1;
    this.options = map(this.props, (state, name) => {
      index += 1;
      return {
        text: name,
        value: index
      };
    });
    this.panes = map(this.props, (state, name) => ({
      pane: (
        <Tab.Pane basic key={name}>
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
  }
  onChange = (e, { value }) => {
    const { actions } = this.props;
    actions.setSetting('devTestDefaultState', value);
  }
  render() {
    const { settings } = this.props;
    const { options, panes } = this;
    return (
      <React.Fragment>
        <Header
          attached="top"
          content="Application State"
          inverted
        />
        <Segment attached="bottom">
          <Dropdown
            autoFocus
            defaultValue={settings.devTestDefaultState}
            onChange={this.onChange}
            options={options}
            search
            selection
          />
          <Tab
            activeIndex={settings.devTestDefaultState}
            defaultActiveIndex={settings.devTestDefaultState}
            onTabChange={this.onTabChange}
            panes={panes}
            renderActiveOnly={false}
          />
        </Segment>
      </React.Fragment>
    );
  }
}

export default DevStateTabs;
