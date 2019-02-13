// @flow
import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

class OverviewMenu extends Component<Props> {
  componentDidUpdate(prevProps, prevState) {
    Object.entries(this.props).forEach(([key, val]) =>
      prevProps[key] !== val && console.log(`OverviewMenu '${key}' changed`)
    );
  }
  render() {
    const {
      view,
      viewChange,
    } = this.props;
    return (
      <Menu secondary size="small">
        <Menu.Item
          active={view === 'systemtokens'}
          content="System Token"
          icon="cube"
          name="systemtokens"
          onClick={viewChange}
        />
        <Menu.Item
          active={view === 'balances'}
          content="Tokens"
          icon="cubes"
          name="balances"
          onClick={viewChange}
        />
        <Menu.Item
          active={view === 'resources'}
          content="Resources"
          icon="battery full"
          name="resources"
          onClick={viewChange}
        />
        <Menu.Item
          active={view === 'governance'}
          content="Governance"
          icon="gavel"
          name="governance"
          onClick={viewChange}
        />
      </Menu>
    );
  }
}

export default OverviewMenu;
