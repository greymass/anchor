// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Button, Dropdown, Header, Icon, Input, Segment, Tab } from 'semantic-ui-react';

import * as WalletsActions from '../../../actions/wallets';

class GlobalAccountDropdown extends Component<Props> {
  state = { open: false }
  onClose = (e, data) => {
    console.log(e, data)
    this.setState({ open: false });
  }
  onOpen = () => {
    this.setState({ open: true });
  }
  onToggle = () => {
    this.setState({ open: !this.state.open });
  }
  onSearchChange = (e, { searchQuery }) => {
    // console.log(searchQuery);
  }
  swapAccount = (account) =>  {
    const { actions } = this.props;
    actions.useWallet(account);
  }
  render() {
    const {
      settings,
      wallet,
      wallets
    } = this.props;
    const {
      open
    } = this.state;
    if (!wallets || wallets.length === 0) {
      return false;
    }
    const accounts = wallets.map(wallet => wallet.account).sort();
    const tagOptions = wallets
      .filter(w => w.account !== settings.account)
      .sort((a, b) => a.account > b.account)
      .map((w) => {
        let icon = {
          color: 'green',
          name: 'id card'
        };
        switch (w.mode) {
          case 'cold': {
            icon = {
              color: 'blue',
              name: 'snowflake'
            };
            break;
          }
          case 'watch': {
            icon = {
              color: 'orange',
              name: 'eye'
            };
            break;
          }
          default: {
            // no default
          }
        }
        return {
          icon,
          onClick: () => this.swapAccount(w.account),
          text: w.account,
          value: w.account,
        };
      });
    let icon = {
      color: 'green',
      name: 'id card'
    };
    switch (wallet.mode) {
      case 'cold': {
        icon = {
          color: 'blue',
          name: 'snowflake'
        };
        break;
      }
      case 'watch': {
        icon = {
          color: 'orange',
          name: 'eye'
        };
        break;
      }
      default: {
        // no default
      }
    }
    return (
      <Dropdown
        item
        labeled
        trigger={(
          <span>
            <Icon color={icon.color} name={icon.name} /> {wallet.account}
          </span>
        )}
      >
        <Dropdown.Menu>
          <Dropdown.Menu scrolling>
            {tagOptions.map(option => <Dropdown.Item key={option.value} {...option} />)}
          </Dropdown.Menu>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}


function mapStateToProps(state) {
  return {
    settings: state.settings,
    wallet: state.wallet,
    wallets: state.wallets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...WalletsActions,
    }, dispatch)
  };
}

export default compose(
  translate('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalAccountDropdown);
