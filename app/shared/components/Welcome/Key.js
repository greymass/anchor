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
      <React.Fragment>
        <Header size="huge">
          <Header.Subheader>
            {t('welcome_step')} #3
          </Header.Subheader>
          {t('welcome_stage_authorize')}
        </Header>
        <Segment
          color="green"
          stacked
        >
          <Segment basic>
            <WelcomeKeyContainer
              onStageSelect={onStageSelect}
            />
          </Segment>
        </Segment>
      </React.Fragment>
    );
  }
}

export default translate('welcome')(WelcomeKey);
