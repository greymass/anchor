// @flow
import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import WelcomeKeyContainer from '../../containers/Welcome/Key';

class WelcomeKey extends Component<Props> {
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
          {t('welcome_stage')} #3: {t('welcome_stage_authorize')}
        </Header>
        <WelcomeKeyContainer
          onStageSelect={onStageSelect}
        />
      </Segment>
    );
  }
}

export default translate('welcome')(WelcomeKey);
