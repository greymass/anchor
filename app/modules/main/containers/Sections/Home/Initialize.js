// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Image, Segment } from 'semantic-ui-react';
import compose from 'lodash/fp/compose';

import { setSetting } from '../../../../../shared/actions/settings';
import { clearValidationState } from '../../../../../shared/actions/validate';
import { setWalletMode } from '../../../../../shared/actions/wallet';

import WelcomeImportContainer from '../../../../../shared/containers/Welcome/Import';

import anchorLogo from '../../../../../renderer/assets/images/anchor-logo.svg';
import anchorText from '../../../../../renderer/assets/images/anchor-text.svg';

class HomeInitializeContainer extends Component<Props> {
  initialize = (e) => {
    const {
      actions,
      history,
    } = this.props;
    actions.setSetting('walletInit', true);
    e.preventDefault();
    history.push('/home/blockchains');
    return false;
  }
  useColdWallet = (e) => {
    const {
      actions,
      history,
    } = this.props;
    // Immediately set the wallet into cold storage mode
    actions.setWalletMode('cold');
    // Clear all the validation states that may have been triggered
    actions.clearValidationState();
    // Initialize the wallet
    actions.setSetting('walletInit', true);
    e.preventDefault();
    history.push('/home/blockchains');
    return false;
  }

  render() {
    const {
      t,
    } = this.props;
    return (
      <React.Fragment>
        <Segment basic style={{ marginTop: 0 }}>
          <Image
            alt="Anchor Logo"
            centered
            src={anchorLogo}
            style={{
              width: '256px',
            }}
          />
          <Image
            alt="Anchor"
            centered
            src={anchorText}
            style={{
              width: '256px',
              marginTop: '1em',
            }}
          />
        </Segment>
        <Segment basic textAlign="center">
          <p>Welcome to Anchor!</p>
          <p>
            <Button
              color="green"
              content="Setup Blockchain(s)"
              icon="sign-in"
              onClick={this.initialize}
              size="large"
            />
          </p>
          <p>
            Have a backup file from either Anchor or eos-voter?
          </p>
          <p>
            <WelcomeImportContainer />
          </p>
          <p>For Advanced Users:</p>
          <p>
            <Button
              basic
              color="blue"
              content={t('welcome:welcome_use_coldwallet')}
              icon="snowflake"
              onClick={this.useColdWallet}
              size="small"
            />
          </p>
        </Segment>
      </React.Fragment>
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
      clearValidationState,
      setSetting,
      setWalletMode,
    }, dispatch)
  };
}

export default compose(
  withRouter,
  translate('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(HomeInitializeContainer);
