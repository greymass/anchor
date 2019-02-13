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
      <React.Fragment>
        <Header size="huge">
          {t('welcome_stage_advanced')}
        </Header>
        <Segment
          color="green"
          size="small"
          stacked
        >
          <Segment basic>
            <Header>{t('welcome_stage_advanced_instructions')}</Header>
            <WelcomeAdvancedContainer
              editing
              onClose={onClose}
              onStageSelect={onStageSelect}
              stage={stage}
            />
          </Segment>
        </Segment>
      </React.Fragment>
    );
  }
}

export default translate('welcome')(WelcomeAdvanced);
