// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Divider, Dropdown, Header, Input, Segment } from 'semantic-ui-react';

import GlobalButtonAccountImport from '../Button/Account/Import';

class GlobalSidebarAccount extends Component<Props> {
  render() {
    const {
      wallet
    } = this.props;
    const tagOptions = [
      {
        text: 'accountname',
        value: 'accountname',
        label: { color: 'black', empty: true, circular: true },
      },
    ];
    return (
      <Button.Group
        basic
        fluid
      >
        <Dropdown
          button
          className="icon"
          icon="users"
          labeled
          text={wallet.account}
        >
          <Dropdown.Menu>
            <Input
              icon="search"
              iconPosition="left"
              className="search"
            />
            <Dropdown.Menu scrolling>
              {tagOptions.map(option => <Dropdown.Item key={option.value} {...option} />)}
            </Dropdown.Menu>
          </Dropdown.Menu>
        </Dropdown>
        <GlobalButtonAccountImport
        />
      </Button.Group>
    );
  }
}

export default translate('sidebar')(GlobalSidebarAccount);
