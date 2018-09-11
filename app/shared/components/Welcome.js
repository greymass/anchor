// @flow
import React, { Component } from 'react';
import { Button, Container, Grid, Image, Header } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import eos from '../../renderer/assets/images/sqrl.png';

import WelcomeAccount from './Welcome/Account';
import WelcomeBreadcrumb from './Welcome/Breadcrumb';
import WelcomeConnection from './Welcome/Connection';
import WelcomePath from './Welcome/Path';
import WelcomeKey from './Welcome/Key';
import WelcomeWallet from './Welcome/Wallet';

import * as types from '../../shared/actions/types';

import GlobalSettingsLanguage from './Global/Settings/Language';

const { shell } = require('electron');

class Welcome extends Component<Props> {
  state = {
    stageSelect: false
  };

  openLink = (url) => shell.openExternal(url);

  onStageSelect = (stage) => {
    this.setState({ stageSelect: stage });
  }

  skipImport = () => {
    const {
      actions,
      history,
      settings
    } = this.props;
    const {
      setSetting
    } = actions;
    setSetting('account', '');
    setSetting('skipImport', true);
    actions.lockWallet();
    actions.clearValidationState();
    actions.validateNode(settings.node);
    history.push('/voter');
  }

  render() {
    const {
      actions,
      connection,
      i18n,
      keys,
      settings,
      t,
      validate
    } = this.props;
    const {
      stageSelect
    } = this.state;
    let stage = types.SETUP_STAGE_CONNECTION;
    if (
      (validate.NODE === 'SUCCESS' && validate.ACCOUNT === 'SUCCESS' && validate.KEY === 'SUCCESS')
      || (settings.walletMode === 'cold' && settings.account && keys.key)
    ) {
      stage = types.SETUP_STAGE_WALLET_CONFIG;
    } else if (
      (validate.NODE === 'SUCCESS' && validate.ACCOUNT === 'SUCCESS')
      || (settings.walletMode === 'cold' && settings.account)
    ) {
      stage = types.SETUP_STAGE_KEY_CONFIG;
    } else if (validate.NODE === 'SUCCESS' || settings.walletMode === 'cold') {
      stage = types.SETUP_STAGE_ACCOUNT_OPTIONS;
    }
    if (stageSelect !== false) {
      stage = stageSelect;
    }
    let stageElement = <WelcomeConnection onStageSelect={this.onStageSelect} />;
    if (stage >= types.SETUP_STAGE_ACCOUNT_OPTIONS) {
      stageElement = <WelcomePath onStageSelect={this.onStageSelect} connection={connection} />;
      if (stage >= types.SETUP_STAGE_ACCOUNT_LOOKUP && (settings.walletMode === 'cold' || validate.NODE === 'SUCCESS')) {
        stageElement = <WelcomeAccount onStageSelect={this.onStageSelect} />;
        if (stage >= types.SETUP_STAGE_KEY_CONFIG && (settings.walletMode === 'cold' || validate.ACCOUNT === 'SUCCESS')) {
          stageElement = <WelcomeKey onStageSelect={this.onStageSelect} />;
          if (stage === types.SETUP_STAGE_WALLET_CONFIG && (settings.walletMode === 'cold' || validate.KEY === 'SUCCESS')) {
            stageElement = <WelcomeWallet onStageSelect={this.onStageSelect} connection={connection} />;
          }
        }
      }
    }
    return (
      <div className="welcome">
        <style>
          {`
            body > div#root,
            body > div#root > div,
            body > div#root > div > div.welcome {
              height: 100%;
            }
          `}
        </style>
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
        >
          <Grid.Column
            style={{ maxWidth: 450 }}
            textAlign="left"
            verticalAlign="middle"
          >
            <Header
              color="teal"
              textAlign="center"
            >
              <Image src={eos} />
              <Header.Content>
                {t('application_name')}
                <Header.Subheader>
                  {t('application_version')}
                </Header.Subheader>
              </Header.Content>
            </Header>
            {(stage >= types.SETUP_STAGE_CONNECTION)
              ? (
                <Container textAlign="center">
                  <WelcomeBreadcrumb
                    onStageSelect={this.onStageSelect}
                    stage={stage}
                    walletMode={settings.walletMode}
                  />
                </Container>
              )
              : false
            }
            {stageElement}
            <Container textAlign="center">
              <GlobalSettingsLanguage
                actions={actions}
                setLanguage={settings.lang}
                i18n={i18n}
                settings
                selection
              />
              {(
                (stage === types.SETUP_STAGE_ACCOUNT_OPTIONS
                  || (stage === types.SETUP_STAGE_ACCOUNT_LOOKUP && validate.ACCOUNT !== 'SUCCESS'))
                && !settings.walletInit
                && settings.walletMode !== 'cold'
              )
                ? (
                  <p>
                    <Button
                      content={t('welcome:welcome_lookup_account_skip')}
                      icon="x"
                      onClick={this.skipImport}
                      size="small"
                      style={{ marginTop: '1em' }}
                    />
                  </p>
                )
                : false
              }
            </Container>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default translate('welcome')(Welcome);
