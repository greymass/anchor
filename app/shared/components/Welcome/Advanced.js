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
          <Header.Subheader>
            {t('welcome_step')} #1
          </Header.Subheader>
          {t('welcome_stage_advanced')}
        </Header>
        <Segment
          color="green"
          size="small"
          stacked
        >
          <Segment basic>
            <p>{t('welcome_stage_advanced_instructions')}</p>
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
