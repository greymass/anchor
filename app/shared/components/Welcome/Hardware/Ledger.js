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
      <Segment
        size="small"
        stacked
      >
        <Header>
          {t('welcome_stage')} #2: {t('welcome_stage_account_ledger')}
        </Header>
        <p>{t('welcome_instructions_8')}</p>
        <WelcomeHardwareLedgerContainer
          onClose={onClose}
          onComplete={onComplete}
          onStageSelect={onStageSelect}
        />
      </Segment>
    );
  }
}

export default translate('welcome')(WelcomeHardwareLedger);
