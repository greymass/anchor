// @flow
import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import WelcomePathContainer from '../../containers/Welcome/Path';

class WelcomePath extends Component<Props> {
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
        <p>{t('welcome_instructions_7')}</p>
        <WelcomePathContainer
          onStageSelect={onStageSelect}
          stage={stage}
        />
      </Segment>
    );
  }
}

export default translate('welcome')(WelcomePath);
