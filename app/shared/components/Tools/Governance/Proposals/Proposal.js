// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { find } from 'lodash';

import TimeAgo from 'react-timeago';
import { Button, Header, Message, Segment } from 'semantic-ui-react';

import GlobalModalDangerLink from '../../../Global/Modal/DangerLink';
import ToolsGovernanceProposalsProposalVote from './Proposal/Vote';

class ToolsGovernanceProposalsProposal extends Component<Props> {
  approve = (proposal) => {
    const { actions, settings } = this.props;
    const { scope } = this.props;
    const voter = settings.account;
    const vote = 1;
    const json = JSON.stringify({});
    actions.voteProposal(scope, voter, proposal, vote, json);
  };
  oppose = (proposal) => {
    const { actions, settings } = this.props;
    const { scope } = this.props;
    const voter = settings.account;
    const vote = 0;
    const json = JSON.stringify({});
    actions.voteProposal(scope, voter, proposal, vote, json);
  };
  unvote = (proposal) => {
    const { actions, settings } = this.props;
    const { scope } = this.props;
    const voter = settings.account;
    actions.unvoteProposal(scope, voter, proposal);
  };
  render() {
    const {
      actions,
      blockExplorers,
      isLocked,
      voteDisabled,
      settings,
      proposal,
      system,
      t,
      votes,
      validate,
      wallet
    } = this.props;
    const {
      expires_at,
      proposal_name,
      title
    } = proposal;
    const vote = find(votes, ['proposal_name', proposal_name]);
    const voted = !!(vote);
    const approved = (voted) ? !!(vote.vote) : false;
    const isVotePending = !!(system.GOVERNANCE_VOTE_PROPOSAL === 'PENDING' || system.GOVERNANCE_UNVOTE_PROPOSAL === 'PENDING')
    const isSupporting = (voted && approved);
    const isAgainst = (voted && !approved);
    const isExpired = (new Date().getTime() > Date.parse(expires_at));
    if (isExpired) {
      return false;
    }
    console.log({voteDisabled})
    return (
      <React.Fragment>
        <Header
          as={Segment}
          attached="top"
          color="black"
          block
          size="huge"
        >
          {title}
          <Header.Subheader>
            {t('tools_proposals_id')}: {proposal_name} / {t('tools_proposals_expires')} : <TimeAgo date={`${expires_at}z`} />
          </Header.Subheader>
        </Header>
        <Segment attached>
          {(isSupporting)
            ? (
              <Message
                color="green"
                header={t('tools_proposal_approved_message_header')}
                content={t('tools_proposal_approved_message_content')}
                icon="checkmark"
              />
            )
            : false
          }
          {(isAgainst)
            ? (
              <Message
                color="red"
                header={t('tools_proposal_rejected_message_header')}
                content={t('tools_proposal_rejected_message_content')}
                icon="x"
              />
            )
            : false
          }
          <p>
            {t('tools_proposal_view_on_block_explorer')}
          </p>
          <p>
            <GlobalModalDangerLink
              content={`https://bloks.io/vote/referendums/${proposal_name}`}
              link={`https://bloks.io/vote/referendums/${proposal_name}`}
              settings={settings}
            />
          </p>
          <p>
            {t('tools_proposal_modify_vote')}
          </p>
          <ToolsGovernanceProposalsProposalVote
            actionName="GOVERNANCE_VOTE_PROPOSAL"
            actions={actions}
            blockExplorers={blockExplorers}
            button={{
              color: 'grey',
              content: t('yes'),
              disabled: isSupporting,
              icon: 'checkmark'
            }}
            confirm={(
              <Button
                color="blue"
                content={t('confirm')}
                disabled={isSupporting}
                floated="right"
                icon="checkmark"
                loading={isVotePending}
                onClick={() => this.approve(proposal_name)}
              />
            )}
            content={t('tools_governance_proposal_confirm_vote_yes')}
            isLocked={isLocked}
            settings={settings}
            system={system}
            validate={validate}
            wallet={wallet}
          />
          <ToolsGovernanceProposalsProposalVote
            actionName="GOVERNANCE_VOTE_PROPOSAL"
            actions={actions}
            blockExplorers={blockExplorers}
            button={{
              color: 'grey',
              content: t('no'),
              disabled: isAgainst,
              icon: 'x'
            }}
            confirm={(
              <Button
                color="blue"
                content={t('confirm')}
                disabled={isAgainst}
                floated="right"
                icon="checkmark"
                loading={isVotePending}
                onClick={() => this.oppose(proposal_name)}
              />
            )}
            content={t('tools_governance_proposal_confirm_vote_no')}
            isLocked={isLocked}
            settings={settings}
            system={system}
            validate={validate}
            wallet={wallet}
          />
          <ToolsGovernanceProposalsProposalVote
            actionName="GOVERNANCE_UNVOTE_PROPOSAL"
            actions={actions}
            blockExplorers={blockExplorers}
            button={{
              color: 'grey',
              content: t('unvote'),
              disabled: !voted,
              icon: 'trash'
            }}
            confirm={(
              <Button
                color="blue"
                content={t('confirm')}
                disabled={!voted}
                floated="right"
                icon="checkmark"
                loading={isVotePending}
                onClick={() => this.unvote(proposal_name)}
              />
            )}
            content={t('tools_governance_proposal_confirm_unvote')}
            isLocked={isLocked}
            settings={settings}
            system={system}
            validate={validate}
            wallet={wallet}
          />
        </Segment>
      </React.Fragment>
    );
  }
}

export default translate('tools')(ToolsGovernanceProposalsProposal);
