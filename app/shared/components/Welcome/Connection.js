// @flow
import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import WelcomeConnectionContainer from '../../containers/Welcome/Connection';

class WelcomeConnection extends Component<Props> {
  render() {
    const {
      onStageSelect,
      settings,
      stage,
      t
    } = this.props;
    return (
      <Segment
        size="small"
        stacked
      >
        <Header>
          {t('welcome_stage')} #1: {' '}
          {(settings.walletMode === 'cold')
            ? t('welcome_stage_blockchain')
            : t('welcome_stage_connection')
          }
        </Header>
        <p>
          {(settings.walletMode === 'cold')
            ? t('welcome_instructions_one_cold')
            : t('welcome_instructions_one')
          }
        </p>
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
