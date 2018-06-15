// @flow
import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import WelcomeAccountContainer from '../../containers/Welcome/Account';

class WelcomeAccount extends Component<Props> {
  render() {
    const {
      onStageSelect,
      t
    } = this.props;
    return (
      <Segment
        size="small"
        stacked
      >
        <Header>
          {t('welcome_stage')} #2: {t('welcome_stage_account')}
        </Header>
        <WelcomeAccountContainer
          onStageSelect={onStageSelect}
        />
      </Segment>
    );
  }
}

export default translate('welcome')(WelcomeAccount);
