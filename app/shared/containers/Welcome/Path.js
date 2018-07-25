// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import { translate } from 'react-i18next';
import { Button, Container, Divider, Header, Segment } from 'semantic-ui-react';

import * as AccountsActions from '../../actions/accounts';
import * as SettingsActions from '../../actions/settings';
import * as ValidateActions from '../../actions/validate';
import * as WalletActions from '../../actions/wallet';
import * as WalletsActions from '../../actions/wallets';

import WalletPanelButtonAccountRequest from '../../components/Wallet/Panel/Button/Account/Request';

class WelcomePathContainer extends Component<Props> {
  render() {
    const {
      actions,
      history,
      onStageSelect,
      system,
      t
    } = this.props;
    return (
      <React.Fragment>
        <Segment color="blue" secondary stacked>
          <Header>
            {t('welcome_path_have_account_header')}
            <Header.Subheader>
              {t('welcome_path_have_account_subheader')}
            </Header.Subheader>
          </Header>
          <Container textAlign="center">
            <Button
              content={t('welcome_path_have_account_button')}
              color="blue"
              onClick={() => onStageSelect(2)}
            />
          </Container>
          <Divider />
          <Header>
            {t('welcome_path_generate_keys_header')}
            <Header.Subheader>
              {t('welcome_path_generate_keys_subheader')}
            </Header.Subheader>
          </Header>
          <Container textAlign="center">
            <WalletPanelButtonAccountRequest
              actions={actions}
              history={history}
              system={system}
            />
          </Container>
        </Segment>
        <Button
          content={t('back')}
          icon="arrow left"
          onClick={() => onStageSelect(0)}
          size="small"
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
    system: state.system,
    validate: state.validate,
    wallet: state.wallet,
    wallets: state.wallets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountsActions,
      ...SettingsActions,
      ...ValidateActions,
      ...WalletActions,
      ...WalletsActions
    }, dispatch)
  };
}

export default compose(
  withRouter,
  translate('welcome'),
  connect(mapStateToProps, mapDispatchToProps)
)(WelcomePathContainer);
