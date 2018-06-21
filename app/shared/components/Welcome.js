// @flow
import React, { Component } from 'react';
import { Breadcrumb, Button, Container, Dropdown, Grid, Image, Header } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import eos from '../../renderer/assets/images/eos.png';

import WelcomeAccount from './Welcome/Account';
import WelcomeConnection from './Welcome/Connection';
import WelcomeKey from './Welcome/Key';
import WelcomeWallet from './Welcome/Wallet';

const { shell } = require('electron');

const languages = [
  { key: 'cn', value: 'zh-CN', flag: 'cn', text: '中文' },
  { key: 'en', value: 'en-US', flag: 'us', text: 'English' },
  { key: 'ru', value: 'ru-RU', flag: 'ru', text: 'Русский' },
  { key: 'fr', value: 'fr-FR', flag: 'fr', text: 'Français' },
  { key: 'it', value: 'it-IT', flag: 'it', text: 'Italiano' },
  { key: 'ja', value: 'ja-FP', flag: 'jp', text: '日本語' },
  { key: 'kr', value: 'ko-KR', flag: 'kr', text: '한글' }
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

  onStageSelect = (stage) => this.setState({ stageSelect: stage });

  skipImport = () => {
    const {
      actions,
      history
    } = this.props;
    const {
      setSetting
    } = actions;
    setSetting('skipImport', true);
    history.push('/voter');
  }

  render() {
    const {
      settings,
      t,
      validate
    } = this.props;
    const {
      stageSelect
    } = this.state;
    let stage = 0;
    if (validate.NODE === 'SUCCESS' && validate.ACCOUNT === 'SUCCESS' && validate.KEY === 'SUCCESS') {
      stage = 3;
    } else if (validate.NODE === 'SUCCESS' && validate.ACCOUNT === 'SUCCESS') {
      stage = 2;
    } else if (validate.NODE === 'SUCCESS') {
      stage = 1;
    }
    if (stageSelect !== false) {
      stage = stageSelect;
    }
    let stageElement = <WelcomeConnection onStageSelect={this.onStageSelect} />;
    if (validate.NODE === 'SUCCESS' && stage >= 1) {
      stageElement = <WelcomeAccount onStageSelect={this.onStageSelect} />;
      if (validate.ACCOUNT === 'SUCCESS' && stage >= 2) {
        stageElement = <WelcomeKey onStageSelect={this.onStageSelect} />;
        if (validate.KEY === 'SUCCESS' && stage === 3) {
          stageElement = <WelcomeWallet />;
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
              <Breadcrumb size="large">
                <Breadcrumb.Section
                  active={(stage === 0)}
                  onClick={(stage > 0) ? () => this.onStageSelect(0) : null}
                >
                  {t('welcome_stage_connection')}
                </Breadcrumb.Section>
                <Breadcrumb.Divider icon="right angle" />
                <Breadcrumb.Section
                  active={(stage === 1)}
                  onClick={(stage > 1) ? () => this.onStageSelect(1) : null}
                >
                  {t('welcome_stage_account')}
                </Breadcrumb.Section>
                <Breadcrumb.Divider icon="right angle" />
                <Breadcrumb.Section
                  active={(stage === 2)}
                  onClick={(stage > 2) ? () => this.onStageSelect(2) : null}
                >
                  {t('welcome_stage_authorize')}
                </Breadcrumb.Section>
                <Breadcrumb.Divider icon="right angle" />
                <Breadcrumb.Section
                  active={(stage === 3)}
                >
                  {t('welcome_stage_wallet')}
                </Breadcrumb.Section>
              </Breadcrumb>
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
              {(stage > 0)
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
