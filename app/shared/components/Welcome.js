// @flow
import React, { Component } from 'react';
import { Button, Container, Grid, Image, Header } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import eos from '../../renderer/assets/images/eos.png';

import WelcomeAccount from './Welcome/Account';
import WelcomeBreadcrumb from './Welcome/Breadcrumb';
import WelcomeConnection from './Welcome/Connection';
import WelcomePath from './Welcome/Path';
import WelcomeKey from './Welcome/Key';
import WelcomeWallet from './Welcome/Wallet';

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
      i18n,
      keys,
      settings,
      t,
      validate
    } = this.props;
    const {
      stageSelect
    } = this.state;
    let stage = 0;
    if (
      (validate.NODE === 'SUCCESS' && validate.ACCOUNT === 'SUCCESS' && validate.KEY === 'SUCCESS')
      || (settings.walletMode === 'cold' && settings.account && keys.key)
    ) {
      stage = 4;
    } else if (
      (validate.NODE === 'SUCCESS' && validate.ACCOUNT === 'SUCCESS')
      || (settings.walletMode === 'cold' && settings.account)
    ) {
      stage = 3;
    } else if (validate.NODE === 'SUCCESS' || settings.walletMode === 'cold') {
      stage = 2;
    }
    if (stageSelect !== false) {
      stage = stageSelect;
    }
    let stageElement = <WelcomeConnection onStageSelect={this.onStageSelect} stage={stage} />;
    if (stage >= 1) {
      // stageElement = <WelcomePath onStageSelect={this.onStageSelect} stage={stage} />;;
      if (stage >= 2 && (settings.walletMode === 'cold' || validate.NODE === 'SUCCESS')) {
        stageElement = <WelcomeAccount onStageSelect={this.onStageSelect} stage={stage} />;
        if (stage >= 3 && (settings.walletMode === 'cold' || validate.ACCOUNT === 'SUCCESS')) {
          stageElement = <WelcomeKey onStageSelect={this.onStageSelect} stage={stage} />;
          if (stage === 4 && (settings.walletMode === 'cold' || validate.KEY === 'SUCCESS')) {
            stageElement = <WelcomeWallet onStageSelect={this.onStageSelect} stage={stage} />;
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
            {(stage >= 0)
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
                (stage === 1 || (stage === 2 && validate.ACCOUNT !== 'SUCCESS'))
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
