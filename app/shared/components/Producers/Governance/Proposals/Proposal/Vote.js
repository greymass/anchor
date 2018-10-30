// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Segment } from 'semantic-ui-react';

import GlobalTransactionModal from '../../../../Global/Transaction/Modal';

class GovernanceProposalsProposalVote extends Component<Props> {
  render() {
    const {
      actionName,
      actions,
      blockExplorers,
      button,
      confirm,
      isExpired,
      open,
      proposal,
      pubkey,
      settings,
      system,
      t,
      vote
    } = this.props;
    return (
      <GlobalTransactionModal
        actionName={actionName}
        actions={actions}
        blockExplorers={blockExplorers}
        button={button}
        content={(
          <Segment basic clearing>
            {(isExpired === true) ? 
            <p>
            You can no longer vote <strong>{vote}</strong> on worker proposal <strong>{proposal.title} (# {proposal.id})</strong> because it is now expired.
            </p>
            : 
            <p>
            Please confirm your vote of <strong>{vote}</strong> on worker proposal <strong>{proposal.title} (# {proposal.id})</strong>. 
            {confirm}
            </p> 
            }
          </Segment>
        )}
        icon="share square"
        open={open}
        pubkey={pubkey}
        settings={settings}
        system={system}
        title="Submit Vote for Proposal"
      />
    );
  }
}

export default translate('tools')(GovernanceProposalsProposalVote);
