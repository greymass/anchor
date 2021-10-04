// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Accordion, Button, Card, Divider, Icon, Image, Message, Segment } from 'semantic-ui-react';
import compose from 'lodash/fp/compose';

import { clearValidationState } from '../../../../../shared/actions/validate';
import { initApp } from '../../../../../shared/actions/app';
import { setSetting } from '../../../../../shared/actions/settings';
import { setWalletMode } from '../../../../../shared/actions/wallet';

import WelcomeImportContainer from '../../../../../shared/containers/Welcome/Import';
import GlobalModalAccountImportCert from '../../../../../shared/containers/Global/Account/Import/Cert';
import LogoText from '../../../../../renderer/assets/images/anchor-text-blue.svg';

class HomeInitializeContainer extends Component<Props> {
  state = {
    advancedOptions: true
  }
  toggleAdvanced = () => this.setState({ advancedOptions: !this.state.advancedOptions })
  initialize = (e) => {
    const {
      actions,
      history,
    } = this.props;
    actions.initApp();
    actions.setSetting('walletInit', true);
    e.preventDefault();
    history.push('/home/password');
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
      settings,
      t,
    } = this.props;
    const {
      advancedOptions
    } = this.state;
    return (
      <React.Fragment>
        <Segment
          basic
          style={{ margin: 0 }}
          textAlign="center"
        >
          <Image
            alt="Anchor"
            centered
            src={LogoText}
            style={{
              margin: '2em auto 1em',
              width: '192px',
            }}
          />
          <p>{t('main_sections_home_initialize_paragraph_one')}</p>
        </Segment>
        <Segment basic textAlign="center" style={{ margin: 0 }}>
          <p style={{ margin: '1em auto 3em' }}>
            <Button
              content={t('main_sections_home_initialize_button_one')}
              onClick={this.initialize}
              size="huge"
              style={{
                color: '#fff',
                backgroundColor: '#3650A2'
              }}
            />
          </p>
          <Card centered raised style={{ marginTop: '1em' }}>
            <Card.Content>
              <Card.Description style={{ marginBottom: '1em' }}>
                {t('main_sections_home_initialize_card_description_one')}
              </Card.Description>
              <WelcomeImportContainer />
              <Card.Description style={{ margin: '1em' }}>
                Do you have an owner key certificate?
              </Card.Description>
              <GlobalModalAccountImportCert
                trigger={(
                  <Button
                    content="Recover Account"
                    icon="qrcode"
                    primary
                  />
                )}
              />
            </Card.Content>
            {(settings.advancedOptions)
              ? (
                <Card.Content>
                  <Accordion>
                    <Accordion.Title
                      active={advancedOptions}
                      index={1}
                      onClick={this.toggleAdvanced}
                    >
                      <Icon name="dropdown" />
                      {t('main_sections_home_initialize_card_content_one')}
                    </Accordion.Title>
                    <Accordion.Content active={advancedOptions}>
                      <Button
                        basic
                        content={t('welcome:welcome_use_coldwallet')}
                        icon="snowflake"
                        onClick={this.useColdWallet}
                        size="small"
                      />
                    </Accordion.Content>
                  </Accordion>
                </Card.Content>
              )
              : false
            }
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
  withTranslation('main'),
  connect(mapStateToProps, mapDispatchToProps)
)(HomeInitializeContainer);
