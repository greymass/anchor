// @flow
import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import WelcomeConnectionContainer from '../../containers/Welcome/Connection';

class WelcomeConnection extends Component<Props> {
  render() {
    const {
      onStageSelect,
      stage,
      t
    } = this.props;
    return (
      <Segment
        size="small"
        stacked
      >
        <Header>
          {t('welcome_stage')} #1: {t('welcome_stage_connection')}
        </Header>
        <p>{t('welcome_instructions_1')}</p>
        <WelcomeConnectionContainer
          editing
          onStageSelect={onStageSelect}
          stage={stage}
        />
      </Segment>
    );
  }
}

export default translate('welcome')(WelcomeConnection);
