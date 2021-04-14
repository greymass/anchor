// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Dimmer, Header, Loader, Icon, Segment } from 'semantic-ui-react';

import WalletPanelButtonUnlock from '../../components/Wallet/Panel/Button/Unlock';

import { unlockWallet } from '../../actions/wallet';

class GlobalUnlock extends Component<Props> {
  render() {
    const {
      actions,
      buttonOnly,
      buttonStyles,
      settings,
      validate,
      wallet,
      style,
      t
    } = this.props;
    const button = (
      <WalletPanelButtonUnlock
        buttonStyles={buttonStyles}
        settings={settings}
        unlockWallet={actions.unlockWallet}
        validate={validate}
        wallet={wallet}
      />
    );
    if (buttonOnly) {
      return button;
    }
    return (
      <Dimmer.Dimmable
        as={Segment}
        blurring
        color="grey"
        dimmed={validate.WALLET_PASSWORD === 'PENDING'}
        loading={validate.WALLET_PASSWORD === 'PENDING'}
        padded
        stacked
        style={style}
        textAlign="center"
      >
        <Header
          icon
          textAlign="center"
        >
          <Icon
            circular
            inverted
            color="grey"
            name="lock"
          />
          {t('wallet_panel_locked')}
          <Header.Subheader>
            {t('wallet_panel_locked_subheader')}
          </Header.Subheader>
        </Header>
        {button}
      </Dimmer.Dimmable>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
    validate: state.validate,
    wallet: state.wallet,
    // authorization: state.connection.authorization,
    // ledger: state.ledger,
    // settings: state.settings,
    // status: HardwareLedgerActions.ledgerGetStatus(state.ledger),
    // validate: state.validate,
    // wallet: state.wallet,
    // wallets: state.wallets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      unlockWallet
      // ...SettingsActions,
    }, dispatch)
  };
}

export default compose(
  withTranslation(['wallet']),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalUnlock);
