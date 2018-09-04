// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Header, Segment } from 'semantic-ui-react';

export default class ProducersWelcome extends Component<Props> {
  render() {
    return (
      <I18n ns="producers">
        {
          (t) => (
            <Segment secondary color="grey">
              <Header>
                {t('producer_welcome_header')}
                <Header.Subheader>
                  {t('producer_welcome_subheader')}
                </Header.Subheader>
              </Header>
              <p>{t('producer_welcome_p1')}</p>
              <p>{t('producer_welcome_p2')}</p>
              <p>{t('producer_welcome_p3')}</p>
            </Segment>
          )
        }
      </I18n>
    );
  }
}
