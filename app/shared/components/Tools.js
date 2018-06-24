// @flow
import React, { Component } from 'react';
import { Header, Icon, Segment } from 'semantic-ui-react';
import { translate } from 'react-i18next';

class Tools extends Component<Props> {
  render() {
    const { t } = this.props;
    return (
      <Segment attached="top" textAlign="center">
        <Header icon size="large">
          <Icon
            name="cog"
          />
          {t('tools_title')}
          <Header.Subheader
            content={t('tools_description')}
          />
        </Header>
      </Segment>
    );
  }
}

export default translate('tools')(Tools);
