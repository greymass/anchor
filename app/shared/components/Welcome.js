// @flow
import React, { Component } from 'react';
import { Dropdown, Grid, Image, Header, Message, Segment } from 'semantic-ui-react';
import { I18n, translate } from 'react-i18next';
import FormConnectionContainer from '../containers/Form/Connection';
import eos from '../../renderer/assets/images/eos.png';

const { shell } = require('electron');

const languages = [
  { key: 'en', value: 'en', flag: 'us', text: 'English' },
  { key: 'fr', value: 'fr', flag: 'fr', text: 'Français' },
  { key: 'ja', value: 'ja', flag: 'jp', text: '日本語' },
  { key: 'kr', value: 'kr', flag: 'kr', text: '한글' }
];

class Welcome extends Component<Props> {
  openLink = (url) => shell.openExternal(url);

  onChange = (e, { value }) => {
    const { actions, i18n } = this.props;
    i18n.changeLanguage(value);
    actions.setSetting('lang', value);
  }

  render() {
    const { settings } = this.props;
    return (
      <I18n ns="welcome">
        {
          (t) => (
            <div className="login-form">
              {/*
                Heads up! The styles below are necessary for the correct render of this example.
                You can do same with CSS, the main idea is that all the elements up to the `Grid`
                below must have a height of 100%.
              */}
              <style>
                {`
                  body > div,
                  body > div > div,
                  body > div > div > div.login-form {
                    height: 100%;
                  }
                `}
              </style>
              <Grid
                textAlign="center"
                style={{ height: '100%' }}
                verticalAlign="middle"
              >
                <Grid.Column style={{ maxWidth: 450 }}>
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
                  <Segment
                    size="small"
                    stacked
                  >
                    <p>{t('welcome_instructions_1')}</p>
                    <FormConnectionContainer />
                    <p>{t('welcome_instructions_2')}</p>
                  </Segment>
                  <Message info>
                    {t('welcome_more_servers_1')}
                    <p>
                      <a
                        onClick={() => this.openLink(`https://github.com/greymass/eos-voter/blob/master/nodes.md`)}
                        role="link"
                      >
                        {t('welcome_more_servers_2')}
                      </a>
                    </p>
                  </Message>
                  <Dropdown
                    defaultValue={settings.lang}
                    selection
                    size="small"
                    onChange={this.onChange}
                    options={languages}
                  />
                </Grid.Column>
              </Grid>
            </div>
          )
        }
      </I18n>
    );
  }
}

export default translate('welcome')(Welcome);
