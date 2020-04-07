// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';
import { forEach, map, uniq } from 'lodash';
import Blockies from 'react-blockies';

import * as AccountsActions from '../../../shared/actions/accounts';
import * as AppActions from '../../../shared/actions/app';
import * as BlockExplorersActions from '../../../shared/actions/blockexplorers';
import * as ChainActions from '../../../shared/actions/chain';
import * as DelphiOracleActions from '../../../shared/actions/blockchains/eos/delphioracle';
import * as GlobalsActions from '../../../shared/actions/globals';
import * as NavigationActions from '../actions/navigation';
import * as SyncActions from '../../../shared/actions/sync';
import * as WalletActions from '../../../shared/actions/wallet';

import isUnlocked from '../../../shared/utils/Anchor/Unlocked';
import GlobalAccountDropdown from '../../../shared/containers/Global/Account/Dropdown';
import GlobalAppDisconnected from '../../../shared/containers/Global/App/Disconnected';
import GlobalBlockchainDropdown from '../../../shared/containers/Global/Blockchain/Dropdown';
import GlobalFuelDropdown from '../../../shared/containers/Global/Fuel/Dropdown';
import GlobalHardwareLedgerStatus from '../../../shared/containers/Global/Hardware/Ledger/Status';
import WalletLockState from '../../../shared/components/Wallet/LockState';
import WalletMode from '../../../shared/components/Wallet/Mode';

class MenuContainer extends Component<Props> {
  componentDidMount() {
    const {
      actions,
      history,
      settings
    } = this.props;

    const {
      getBlockExplorers,
      getCurrencyStats,
      initApp
    } = actions;

    initApp();
    getBlockExplorers();

    // switch (settings.walletMode) {
    //   case 'cold': {
    //     history.push('/coldwallet');
    //     break;
    //   }
    //   default: {
    //     if (!settings.walletInit && !settings.skipImport && !settings.walletTemp) {
    //       history.push('/');
    //     } else {
    //       // getCurrencyStats();
    //
    //       // forEach(settings.customTokens, (token) => {
    //       //   const [chainId, contract, symbol] = token.split(':');
    //       //   if (chainId === settings.chainId) {
    //       //     getCurrencyStats(contract, symbol.toUpperCase());
    //       //   }
    //       // });
    //     }
    //   }
    // }
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    const {
      actions,
      settings,
      validate,
    } = this.props;
    const {
      sync,
      getConstants,
      getGlobals,
      getPriceFeed,
      getRamStats,
    } = actions;
    if (settings.walletMode !== 'cold' && validate.NODE === 'SUCCESS') {
      sync();
      getConstants();
      getGlobals();
      getPriceFeed();
      getRamStats();
    }
  }
  render() {
    const {
      settings,
      actions,
      pubkeys,
      validate,
      wallet,
      unlocked,
    } = this.props;
    const locked = !unlocked;
    return (
      <Menu
        className="nav-topbar"
        attached
        style={{
          border: 'none',
          borderBottom: '1px solid #d4d4d5',
          margin: 0,
          minHeight: '4.428em',
        }}
      >
        <GlobalBlockchainDropdown
          onNavigationChange={this.props.actions.changeModule}
          style={{
            // marginLeft: '107px',
            // paddingLeft: '1.5rem'
          }}
        />
        <GlobalAccountDropdown
          onNavigationChange={this.props.actions.changeModule}
          style={{
            minWidth: '10em'
          }}
        />
        <GlobalAppDisconnected
          trigger={(
            <Menu.Item
              as="a"
              content={<Icon circular color="red" inverted name="warning" />}
            />
          )}
        />
        <Menu.Menu position="right">
          <WalletMode
            settings={settings}
          />
          <GlobalFuelDropdown />
          <WalletLockState
            actions={actions}
            key="lockstate"
            locked={locked}
            pubkeys={pubkeys}
            validate={validate}
            wallet={wallet}
          />
          <GlobalHardwareLedgerStatus />
          <Menu.Item
            as="a"
            active={module === 'settings'}
            onClick={() => this.props.actions.changeModule('settings')}
            name="settings"
            color="pink"
          >
            <Icon name="settings" />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  return {
    actions: state.actions,
    navigation: state.navigation,
    prompt: state.prompt,
    pubkeys: {
      available: state.storage.keys,
      unlocked: map(state.auths.keystore, 'pubkey')
    },
    settings: state.settings,
    system: state.system,
    validate: state.validate,
    wallet: state.wallet,
    wallets: state.wallets,
    unlocked: isUnlocked(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountsActions,
      ...AppActions,
      ...BlockExplorersActions,
      ...ChainActions,
      ...DelphiOracleActions,
      ...GlobalsActions,
      ...NavigationActions,
      ...SyncActions,
      ...WalletActions,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuContainer));
