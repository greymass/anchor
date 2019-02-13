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
      <React.Fragment>
        <Header size="huge">
          <Header.Subheader>
            {t('welcome_step')} #1
          </Header.Subheader>
          {(settings.walletMode === 'cold')
            ? t('welcome_stage_blockchain')
            : t('welcome_stage_connection')
          }
        </Header>
        <Segment
          color="green"
          size="small"
          stacked
        >
          <Segment basic>
            <Header>
              {(settings.walletMode === 'cold')
                ? t('welcome_instructions_one_cold')
                : t('welcome_instructions_one')
              }
            </Header>
            <WelcomeConnectionContainer
              editing
              onStageSelect={onStageSelect}
              stage={stage}
            />
          </Segment>
        </Segment>
      </React.Fragment>
    );
  }
}

export default translate('welcome')(WelcomeConnection);
