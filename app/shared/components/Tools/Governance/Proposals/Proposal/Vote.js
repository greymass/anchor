// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Segment, Message } from 'semantic-ui-react';

import GlobalTransactionModal from '../../../../Global/Transaction/Modal';
import GlobalWalletUnlocked from '../../../../../containers/Global/Wallet/Unlocked';

class ToolsGovernanceProposalsProposalVote extends Component<Props> {
  render() {
    const {
      actionName,
      actions,
      blockExplorers,
      button,
      confirm,
      content,
      expires_at,
      open,
      proposal_name,
      pubkey,
      settings,
      system,
      t,
      validate,
      vote_value,
      wallet
    } = this.props;
    return (
      <GlobalTransactionModal
        actionName={actionName}
        actions={actions}
        blockExplorers={blockExplorers}
        button={button}
        content={(
          <GlobalWalletUnlocked>
            <Segment basic clearing>
              <p>
                {content}
              </p>

              {(actionName === 'GOVERNANCE_VOTE_PROPOSAL') ? (
                <Message warning>
                  <Message.Header>{t('tools_governance_proposal_ricardian_contract_header')}</Message.Header>
                  <ul>
                    <li>{t('tools_governance_proposal_vote_ricardian_contract_one', { voter: settings.account, proposal_name, vote_value })}</li>
                    <li>{t('tools_governance_proposal_vote_ricardian_contract_two', { voter: settings.account, proposal_name, vote_value })}</li>
                    <li>{t('tools_governance_proposal_vote_ricardian_contract_three', { voter: settings.account, proposal_name, vote_value })}</li>
                    <li>{t('tools_governance_proposal_vote_ricardian_contract_four', { voter: settings.account, proposal_name, vote_value })}</li>
                    <li>{t('tools_governance_proposal_vote_ricardian_contract_five', { voter: settings.account, proposal_name, vote_value })}</li>
                    <li>{t('tools_governance_proposal_vote_ricardian_contract_six', { voter: settings.account, proposal_name, vote_value })}</li>
                    <li>{t('tools_governance_proposal_vote_ricardian_contract_seven', { voter: settings.account, proposal_name, vote_value })}</li>
                  </ul>
                </Message>
              ) : (
                <Message warning>
                  <Message.Header>{t('tools_governance_proposal_ricardian_contract_header')}</Message.Header>
                  <ul>
                    <li>{t('tools_governance_proposal_unvote_ricardian_contract_one', { voter: settings.account, proposal_name, vote_value })}</li>
                    <li>
                      {
                        t(
                          'tools_governance_proposal_unvote_ricardian_contract_two',
                          {
                            voter: settings.account,
                            proposal_name,
                            vote_value,
                            expires_at: expires_at ?
                              new Date(expires_at).toUTCString() :
                              t('tools_governance_proposal_vote_ricardian_contract_date_unavailable'),
                          }
                        )
                      }
                    </li>
                    <li>{t('tools_governance_proposal_unvote_ricardian_contract_three', { voter: settings.account, proposal_name, vote_value })}</li>
                  </ul>
                </Message>
              )}
              {confirm}
            </Segment>
          </GlobalWalletUnlocked>
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
