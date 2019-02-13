// @flow
import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import WelcomeAccountContainer from '../../containers/Welcome/Account';

class WelcomeAccount extends Component<Props> {
  render() {
    const {
      hardwareLedgerImport,
      onStageSelect,
      stage,
      t
    } = this.props;
    return (
      <React.Fragment>
        <Header size="huge">
          <Header.Subheader>
            {t('welcome_step')} #2
          </Header.Subheader>
          {t('welcome_stage_account')}
        </Header>
        <Segment
          color="green"
          size="small"
          stacked
        >
          <Segment basic>
            <WelcomeAccountContainer
              hardwareLedgerImport={hardwareLedgerImport}
              onStageSelect={onStageSelect}
              stage={stage}
            />
          </Segment>
        </Segment>
      </React.Fragment>
    );
  }
}

export default translate('welcome')(WelcomeAccount);
