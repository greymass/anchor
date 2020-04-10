// @flow
import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import WelcomeHardwareLedgerContainer from '../../../containers/Welcome/Hardware/Ledger';

class WelcomeHardwareLedger extends Component<Props> {
  render() {
    const {
      onClose,
      onComplete,
      onStageSelect,
      t
    } = this.props;
    return (
      <React.Fragment>
        <Header size="huge">
          <Header.Subheader>
            {t('welcome_step')} #2
          </Header.Subheader>
          {t('welcome_stage_account_ledger')}
        </Header>
        <Segment
          padded
          size="small"
          stacked
        >
          <p>{t('welcome_instructions_8')}</p>
          <WelcomeHardwareLedgerContainer
            onClose={onClose}
            onComplete={onComplete}
            onStageSelect={onStageSelect}
          />
        </Segment>
      </React.Fragment>
    );
  }
}

export default translate('welcome')(WelcomeHardwareLedger);
