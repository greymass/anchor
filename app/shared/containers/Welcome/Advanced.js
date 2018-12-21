// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import { translate } from 'react-i18next';
import { Button, Container, Form, Header, Segment } from 'semantic-ui-react';

import WelcomeImportContainer from './Import';

import * as AccountsActions from '../../actions/accounts';
import * as SettingsActions from '../../actions/settings';
import * as ValidateActions from '../../actions/validate';
import * as WalletActions from '../../actions/wallet';

class WelcomeAdvancedContainer extends Component<Props> {
  useColdWallet = (e) => {
    const {
      actions,
      onClose,
    } = this.props;
    const {
      clearValidationState,
      setWalletMode
    } = actions;
    // Immediately set the wallet into cold storage mode
    setWalletMode('cold');
    // Clear all the validation states that may have been triggered
    clearValidationState();
    // Move to account stage
    onClose();
    e.preventDefault();
    return false;
  }

  render() {
    const {
      t,
    } = this.props;
    let {
      autoFocus
    } = this.props;
    if (autoFocus === undefined) {
      autoFocus = true;
    }

    return (
      <Form>
        <Segment color="blue">
          <Header
            content={t('welcome_cold_wallet_header')}
            subheader={t('welcome_cold_wallet_subheader')}
          />
          <Button
            color="blue"
            content={t('welcome_use_coldwallet')}
            icon="snowflake"
            onClick={this.useColdWallet}
            size="small"
            style={{ marginTop: '1em' }}
          />
        </Segment>
        <Segment color="blue">
          <Header
            content={t('welcome_restore_wallet_header')}
            subheader={t('welcome_restore_wallet_subheader')}
          />
          <WelcomeImportContainer />
        </Segment>
        <Container textAlign="center">
          <Button
            content={t('cancel')}
            icon="left arrow circle"
            onClick={this.props.onClose}
            size="small"
            style={{ marginTop: '1em' }}
          />
        </Container>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    connection: state.connection,
    settings: state.settings,
    validate: state.validate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountsActions,
      ...SettingsActions,
      ...ValidateActions,
      ...WalletActions
    }, dispatch)
  };
}

export default compose(
  withRouter,
  translate('welcome'),
  connect(mapStateToProps, mapDispatchToProps)
)(WelcomeAdvancedContainer);
