// @flow
import React, { Component } from 'react';
import { Button, Divider, Grid, Header, Image, Segment } from 'semantic-ui-react';
import { I18n } from 'react-i18next';

import logo from '../../renderer/assets/images/greymasstext.png';

const { shell } = require('electron');

export default class About extends Component<Props> {
  openLink = (url) => shell.openExternal(url);

  render() {
    const {
      clearSettingsCache
    } = this.props.actions;
    return (
      <I18n ns="about">
        {
          (t) => (
            <Grid>
              <Grid.Row>
                <Grid.Column width={9}>
                  <Segment basic>
                    <Header size="large">
                      {t('application_name')}
                      <Header.Subheader>
                        {t('application_version')}
                      </Header.Subheader>
                    </Header>
                    <p>{t('about_message_1')}</p>
                    <p>{t('about_message_2')}</p>
                    <p>{t('about_more')}</p>
                    <Header>
                      {t('about_opensource_title')}
                      <Header.Subheader>
                        <a
                          onClick={() => this.openLink(t('about_opensource_link'))}
                          role="button"
                        >
                          {t('about_opensource_link')}
                        </a>

                      </Header.Subheader>
                    </Header>
                    <p>{t('about_opensource_message')}</p>
                  </Segment>
                  <Segment secondary>
                    <p>{t('about_license_type')}</p>
                    <p>{t('about_license_body')}</p>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Segment>
                    <Image src={logo} alt="Greymass" />
                    <Segment basic padded>
                      <p>{t('about_greymass_message_1')}</p>
                      <p>{t('about_greymass_message_2')}</p>
                    </Segment>
                    <Header
                      textAlign="center"
                    >
                      <Header.Subheader>
                        <a
                          onClick={() => this.openLink('https://greymass.com')}
                          role="button"
                        >
                          https://greymass.com
                        </a>
                      </Header.Subheader>
                    </Header>
                  </Segment>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <Button
                    onClick={clearSettingsCache}
                    content="DEBUG: Reset Application"
                    color="red"
                    size="tiny"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          )
        }
      </I18n>
    );
  }
}
