// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Button, Dropdown, Header, Icon, Input, Segment, Tab } from 'semantic-ui-react';

import GlobalButtonElevate from '../../Button/Elevate';
import GlobalFragmentWallet from '../../../../components/Global/Fragment/Wallet';
import * as WalletActions from '../../../../actions/wallet';
import * as WalletsActions from '../../../../actions/wallets';

class GlobalAccountDropdown extends Component<Props> {
  state = { open: false }
  onClose = () => {
    this.setState({ open: false });
  }
  onOpen = () => {
    this.setState({ open: true });
  }
  onToggle = () => {
    this.setState({ open: !this.state.open });
  }
  render() {
    const {
      account,
      authorization,
      chainId,
      fluid,
      mode,
      onSelect,
      pubkey,
      selection,
      style,
      t,
      wallets
    } = this.props;

    if (!wallets || wallets.length === 0) {
      return false;
    }
    const options = wallets
      .filter(w => (
        w.chainId === chainId
        && (w.account !== account || w.authorization !== authorization)
      ))
      .sort((a, b) => a.account > b.account);
    console.log(options, wallets, chainId)
    let trigger = (
      <GlobalFragmentWallet
        account={account}
        authorization={authorization}
        mode={mode}
        pubkey={pubkey}
      />
    );
    if (!account || !authorization || !pubkey) {
      trigger = (
        <Header
          content="No account selected"
          subheader="Choose an account to use"
          size="small"
          style={{ margin: 0 }}
        />
      );
    }
    return (
      <Dropdown
        fluid={fluid}
        item={!selection}
        labeled
        selection={selection}
        style={style || {}}
        trigger={trigger}
      >
        <Dropdown.Menu key="parent">
          <Dropdown.Menu key="menu" scrolling>
            {(options.length > 0)
              ? options
                .map(w => {
                  return (
                    <Dropdown.Item
                      key={`${w.account}@${w.authorization}`}
                      onClick={onSelect}
                      value={w}
                    >
                      <GlobalFragmentWallet
                        account={w.account}
                        authorization={w.authorization}
                        mode={w.mode}
                        pubkey={w.pubkey}
                      />
                    </Dropdown.Item>
                  );
              })
              : (
                <Dropdown.Item
                  content={(
                    <p>No additional accounts loaded.</p>
                  )}
                  key="empty"
                  style={{
                    lineHeight: '1.25em',
                    width: '300px',
                    maxWidth: '300px',
                    padding: '1em',
                    whiteSpace: 'normal'
                  }}
                />
              )
            }
          </Dropdown.Menu>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}


function mapStateToProps(state) {
  return {
    settings: state.settings,
    validate: state.validate,
    wallet: state.wallet,
    wallets: state.wallets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...WalletActions,
      ...WalletsActions,
    }, dispatch)
  };
}

export default compose(
  translate('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalAccountDropdown);
