// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Segment } from 'semantic-ui-react';

import GlobalTransactionModal from '../../../../Global/Transaction/Modal';

class ToolsGovernanceProposalsProposalVote extends Component<Props> {
  render() {
    const {
      actionName,
      actions,
      blockExplorers,
      button,
      confirm,
      content,
      open,
      pubkey,
      settings,
      system,
      t,
    } = this.props;
    return (
      <GlobalTransactionModal
        actionName={actionName}
        actions={actions}
        blockExplorers={blockExplorers}
        button={button}
        content={(
          <Segment basic clearing>
            <p>
              {content}
            </p>
            {confirm}
          </Segment>
        )}
        icon="share square"
        open={open}
        pubkey={pubkey}
        settings={settings}
        system={system}
        title={t('tools_governance_proposal_confirm')}
      />
    );
  }
}

export default translate('tools')(ToolsGovernanceProposalsProposalVote);
