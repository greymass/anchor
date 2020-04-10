// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Header, Segment } from 'semantic-ui-react';

class ProducersWelcome extends Component<Props> {
  render() {
    const { t } = this.props;
    return (
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
    );
  }
}

export default withTranslation('producers')(ProducersWelcome);
