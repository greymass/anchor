// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Card, Divider, Icon, Image, Message, Segment } from 'semantic-ui-react';
import compose from 'lodash/fp/compose';

import * as AccountsActions from '../../../../../shared/actions/accounts';
import * as SettingsActions from '../../../../../shared/actions/settings';
import * as WalletActions from '../../../../../shared/actions/wallet';
import * as WalletsActions from '../../../../../shared/actions/wallets';

import WalletPanelFormHash from '../../../../../shared/components/Wallet/Panel/Form/Hash';
import GlobalModalAccountImportPassword from '../../../../../shared/containers/Global/Account/Import/Password';

import WelcomeImportContainer from '../../../../../shared/containers/Welcome/Import';

import LogoText from '../../../../../renderer/assets/images/anchor-text-blue.svg';

class HomePasswordContainer extends Component<Props> {
  onComplete = () => {
    const {
      history,
    } = this.props;
    history.push('/home/blockchain');
  }
  render() {
    const {
      actions,
      t,
    } = this.props;
    return (
      <GlobalModalAccountImportPassword
        onComplete={this.onComplete}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...WalletActions
    }, dispatch)
  };
}

export default compose(
  withRouter,
  withTranslation('main'),
  connect(mapStateToProps, mapDispatchToProps)
)(HomePasswordContainer);
