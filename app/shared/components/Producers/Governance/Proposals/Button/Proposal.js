// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalTransactionModal from '../../../../Global/Transaction/Modal';
import GovernanceProposalsFormProposal from '../Form/Proposal';

class GovernanceProposalsButtonProposal extends Component<Props> {
  render() {
    const {
      accounts,
      actions,
      blockExplorers,
      onClose,
      settings,
      system,
      t,
      tables,
      validate,
      wallet
    } = this.props;

    return (
      <GlobalTransactionModal
        actionName="CREATEPROPOSAL"
        actions={actions}
        blockExplorers={blockExplorers}
        button={{
          color: 'blue',
          content: 'Submit New Proposal',
          icon: "circle plus",
          floated: 'right',
          size: 'small'
        }}
        content={(
          <GovernanceProposalsFormProposal
            accounts={accounts}
            actions={actions}
            key="ProposalForm"
            settings={settings}
            system={system}
            tables={tables}
            validate={validate}
            wallet={wallet}
          />
        )}
        icon="inbox"
        onClose={onClose}
        settings={settings}
        system={system}
        title="Submit New Worker Proposal"
        />
    );
  }
}

export default translate('producers')(GovernanceProposalsButtonProposal);
