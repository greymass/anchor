// @flow
import React, { Component } from 'react';
import { Button, Container, Dropdown, Grid, Image, Header } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import eos from '../../renderer/assets/images/eos.png';

import WelcomeAccount from './Welcome/Account';
import WelcomeBreadcrumb from './Welcome/Breadcrumb';
import WelcomeConnection from './Welcome/Connection';
import WelcomeKey from './Welcome/Key';
import WelcomeWallet from './Welcome/Wallet';

const { shell } = require('electron');

const languages = [
  { key: 'cn', value: 'zh-CN', flag: 'cn', text: '中文' },
  { key: 'en', value: 'en-US', flag: 'us', text: 'English' },
  { key: 'fr', value: 'fr-FR', flag: 'fr', text: 'Français' },
  { key: 'it', value: 'it-IT', flag: 'it', text: 'Italiano' },
  { key: 'ja', value: 'ja-FP', flag: 'jp', text: '日本語' },
  { key: 'kr', value: 'ko-KR', flag: 'kr', text: '한글' },
  { key: 'ru', value: 'ru-RU', flag: 'ru', text: 'Русский' }
];

class Welcome extends Component<Props> {
  state = {
    stageSelect: false
  };

  openLink = (url) => shell.openExternal(url);

  onChange = (e, { value }) => {
    const { actions, i18n } = this.props;
    i18n.changeLanguage(value);
    actions.setSetting('lang', value);
  }

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
      stage = 3;
    } else if (
      (validate.NODE === 'SUCCESS' && validate.ACCOUNT === 'SUCCESS')
      || (settings.walletMode === 'cold' && settings.account)
    ) {
      stage = 2;
    } else if (validate.NODE === 'SUCCESS' || settings.walletMode === 'cold') {
      stage = 1;
    }
    if (stageSelect !== false) {
      stage = stageSelect;
    }
    let stageElement = <WelcomeConnection onStageSelect={this.onStageSelect} stage={stage} />;
    if (stage >= 1 && (settings.walletMode === 'cold' || validate.NODE === 'SUCCESS')) {
      stageElement = <WelcomeAccount onStageSelect={this.onStageSelect} stage={stage} />;
      if (stage >= 2 && (settings.walletMode === 'cold' || validate.ACCOUNT === 'SUCCESS')) {
        stageElement = <WelcomeKey onStageSelect={this.onStageSelect} stage={stage} />;
        if (stage === 3  && (settings.walletMode === 'cold' || validate.KEY === 'SUCCESS')) {
          stageElement = <WelcomeWallet onStageSelect={this.onStageSelect} stage={stage} />;
        }
      }
    }
    return (
      <div className="welcome">
        <style>
          {`
            body > div,
            body > div > div,
            body > div > div > div.welcome {
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
            <Container textAlign="center">
              <WelcomeBreadcrumb
                onStageSelect={this.onStageSelect}
                stage={stage}
                walletMode={settings.walletMode}
              />
            </Container>
            {stageElement}
            <Container textAlign="center">
              <Dropdown
                defaultValue={settings.lang}
                selection
                size="small"
                onChange={this.onChange}
                options={languages}
              />
              {(stage > 0 && settings.walletMode !== 'cold')
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
