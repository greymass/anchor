// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Button, Segment } from 'semantic-ui-react';
import compose from 'lodash/fp/compose';
import ReactJson from 'react-json-view';

import About from '../components/About';
import ColdWallet from '../components/ColdWallet/Wallet';
import GlobalAccountSelect from './Global/Account/Select';
import TabMenu from '../components/TabMenu';
import Tools from './Tools';
import ModalConstitution from '../components/Global/Modal/Constitution';

import * as AccountsActions from '../actions/accounts';
import * as SettingsActions from '../actions/settings';
import * as TransactionActions from '../actions/transaction';
import * as ValidateActions from '../actions/validate';
import * as WalletActions from '../actions/wallet';
import * as AppActions from '../actions/app';

type Props = {
  actions: {},
  history: {},
  keys: {},
  settings: {},
  wallet: {}
};

class ColdWalletContainer extends Component<Props> {
  props: Props;
  state = {
    activeItem: 'wallet'
  };
  componentDidMount = () => {
    const {
      actions,
      keys,
      wallet
    } = this.props;
    if (!wallet.data && !keys.key) {
      const {
        history
      } = this.props;
      history.push('/');
    }

    const {
      initApp
    } = actions;

    initApp();
  };

  continueSetup = () => {
    const {
      actions,
      history
    } = this.props;
    const {
      clearAccountCache,
      clearValidationState,
      setSetting,
      setWalletMode
    } = actions;
    clearAccountCache();
    clearValidationState();
    setSetting('skipImport', false);
    setWalletMode('hot');
    history.push('/');
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const {
      actions,
      keys,
      settings,
      t,
      validate,
      wallet
    } = this.props;
    const {
      activeItem
    } = this.state;
    let activeTab = <ColdWallet {...this.props} />;

    switch (activeItem) {
      case 'about': {
        activeTab = <About {...this.props} />;
        break;
      }
      case 'tools': {
        activeTab = <Tools settings={settings} />;
        break;
      }
      default: {
        break;
      }
    }
    return (
      <React.Fragment>
        <TabMenu
          actions={actions}
          activeItem={activeItem}
          handleItemClick={this.handleItemClick}
          locked={(!keys.key)}
          settings={settings}
          validate={validate}
          wallet={wallet}
        />
        <Segment
          attached="bottom"
          basic
          style={{ borderBottom: 'none' }}
        >
          {(wallet.data || keys.key)
            ? activeTab
            : (
              <GlobalAccountSelect />
            )
          }
        </Segment>
        {(settings.chainId === 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906')
          ? (
            <ModalConstitution
              actions={actions}
              isUser={(keys.account)}
              settings={settings}
            />
          )
          : false
        }
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    keys: state.keys,
    settings: state.settings,
    system: state.system,
    transaction: state.transaction,
    validate: state.validate,
    wallet: state.wallet
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountsActions,
      ...AppActions,
      ...SettingsActions,
      ...TransactionActions,
      ...ValidateActions,
      ...WalletActions,
    }, dispatch)
  };
}

export default compose(
  withRouter,
  withTranslation('coldwallet'),
  connect(mapStateToProps, mapDispatchToProps)
)(ColdWalletContainer);
