// @flow
import React, { Component } from 'react';
import { Divider, Grid, Header, Image, Segment } from 'semantic-ui-react';
import { I18n } from 'react-i18next';

import logo from '../../renderer/assets/images/greymass-vertical.svg';
import anchorLogo from '../../renderer/assets/images/anchor-logo.svg';
import anchorText from '../../renderer/assets/images/anchor-text.svg';
import GlobalButtonResetContainer from '../containers/Global/Button/Reset';

const { shell } = require('electron');

export default class About extends Component<Props> {
  openLink = (url) => shell.openExternal(url);

  render() {
    return (
      <I18n ns="about">
        {
          (t) => (
            <Grid>
              <Grid.Row>
                <Grid.Column width={10}>
                  <Segment size="large">
                    <Image alt="Anchor Logo" centered src={anchorLogo} size="small" />
                    <Image alt="Anchor" centered src={anchorText} size="small" style={{ marginTop: '1em' }} />
                    <Header image size="large" textAlign="center">
                      <Header.Subheader>
                        {t('application_name')} {t('application_version')}
                      </Header.Subheader>
                    </Header>
                    <p>{t('about_message_1')}</p>
                    <p>{t('about_message_2')}</p>
                    <Header>
                      {t('about_opensource_title')}
                    </Header>
                    <p>
                      {t('about_opensource_message')}
                      {' '}
                      <a
                        onClick={() => this.openLink(t('about_opensource_link'))}
                        role="button"
                      >
                        {t('about_opensource_link')}
                      </a>.
                    </p>
                  </Segment>
                  <Segment secondary>
                    <p>{t('about_license_type')}</p>
                    <p>{t('about_license_body_1')}</p>
                    <p>{t('about_license_body_2')}</p>
                    <p>{t('about_license_body_3')}</p>
                    <p>{t('about_license_body_4')}</p>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Segment basic size="large">
                    <Image alt="Greymass" centered src={logo} size="small" />
                    <Divider />
                    <p>{t('about_greymass_message_1')}</p>
                    <p>
                      {t('about_greymass_message_2')}:
                    </p>
                    <p>
                      <a
                        onClick={() => this.openLink('https://greymass.com')}
                        role='button'
                        style={{ cursor: 'pointer' }}
                      >
                        https://greymass.com
                      </a>
                    </p>
                  </Segment>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <GlobalButtonResetContainer />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          )
        }
      </I18n>
    );
  }
}
