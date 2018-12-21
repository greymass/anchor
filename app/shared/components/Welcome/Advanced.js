// @flow
import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import WelcomeAdvancedContainer from '../../containers/Welcome/Advanced';

class WelcomeAdvanced extends Component<Props> {
  render() {
    const {
      onClose,
      onStageSelect,
      stage,
      t
    } = this.props;
    return (
      <Segment
        size="small"
        stacked
      >
        <Header
          content={t('welcome_stage_advanced')}
        />
        <WelcomeAdvancedContainer
          editing
          onClose={onClose}
          onStageSelect={onStageSelect}
          stage={stage}
        />
      </Segment>
    );
  }
}

export default translate('welcome')(WelcomeAdvanced);
