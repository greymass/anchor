// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Card, Divider, Icon, Image, Message, Segment } from 'semantic-ui-react';
import compose from 'lodash/fp/compose';

import { clearValidationState } from '../../../../../shared/actions/validate';
import { initApp } from '../../../../../shared/actions/app';
import { setSetting } from '../../../../../shared/actions/settings';
import { setWalletMode } from '../../../../../shared/actions/wallet';

import WelcomeImportContainer from '../../../../../shared/containers/Welcome/Import';

import Logo from '../../../../../renderer/assets/images/anchor-white.png';
import LogoText from '../../../../../renderer/assets/images/anchor-dark-text.png';

class HomeInitializeContainer extends Component<Props> {
  initialize = (e) => {
    const {
      actions,
      history,
    } = this.props;
    actions.initApp();
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
        <Segment basic style={{ margin: 0 }}>
          <Image
            alt="Anchor Logo"
            centered
            src={Logo}
            style={{
              width: '192px',
            }}
          />
          <Image
            alt="Anchor"
            centered
            src={LogoText}
            style={{
              width: '256px',
              marginTop: '2em',
            }}
          />
        </Segment>

        <Segment basic textAlign="center" style={{ margin: 0 }}>
          <p style={{ margin: '1em' }}>
            <Button
              color="green"
              content="Setup New Wallet"
              icon="sign-in"
              onClick={this.initialize}
              size="large"
            />
          </p>
          <Card centered raised style={{ marginTop: '1em' }}>
            <Card.Content>
              <Card.Description style={{ marginBottom: '1em' }}>
                Do you already have a backup from Anchor or eos-voter?
              </Card.Description>
              <WelcomeImportContainer />
              <p style={{ marginTop: '0.5em' }}>
                <Icon name="angle double down" />
              </p>
            </Card.Content>
            <Card.Content extra>
              For Advanced Users:
            </Card.Content>
            <Card.Content>
              <Button
                color="purple"
                content={t('welcome:welcome_use_coldwallet')}
                icon="snowflake"
                onClick={this.useColdWallet}
                size="small"
              />
            </Card.Content>
          </Card>
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
      initApp,
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
