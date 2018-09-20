// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { find } from 'lodash';

import { Button, Header, Message, Segment } from 'semantic-ui-react';

import ToolsGovernanceProposalsProposalVote from './Proposal/Vote';

class ToolsGovernanceProposalsProposal extends Component<Props> {
  approve = (proposal) => {
    const { actions, settings } = this.props;
    const { scope } = this.props;
    const voter = settings.account;
    const vote = 1;
    const json = JSON.stringify({});
    actions.voteProposal(scope, voter, proposal, vote, json);
  }
  oppose = (proposal) => {
    const { actions, settings } = this.props;
    const { scope } = this.props;
    const voter = settings.account;
    const vote = 0;
    const json = JSON.stringify({});
    actions.voteProposal(scope, voter, proposal, vote, json);
  }
  unvote = (proposal) => {
    const { actions, settings } = this.props;
    const { scope } = this.props;
    const voter = settings.account;
    actions.unvoteProposal(scope, voter, proposal);
  }
  render() {
    const {
      actions,
      blockExplorers,
      settings,
      proposal,
      system,
      t,
      votes
    } = this.props;
    const {
      json,
      proposal_name,
      title
    } = proposal;
    const vote = find(votes, ['proposal_name', proposal_name]);
    const voted = !!(vote);
    const approved = (voted) ? !!(vote.vote) : false;
    const status = (voted) ? ((approved) ? 'tools_proposals_vote_status_approved' : 'tools_proposals_vote_status_opposed') : 'tools_proposals_vote_status_novote';
    const isVotePending = !!(system.GOVERNANCE_VOTE_PROPOSAL === 'PENDING' || system.GOVERNANCE_UNVOTE_PROPOSAL === 'PENDING')
    const isSupporting = (voted && approved);
    const isAgainst = (voted && !approved);
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
            ID: {proposal_name}
          </Header.Subheader>
        </Header>
        <Segment attached>
          {(isSupporting)
            ? (
              <Message
                color="green"
                header="This account has approved this proposal."
                content="The stake weighted value of this account has been recorded as approving this proposal."
                icon="checkmark"
              />
            )
            : false
          }
          {(isAgainst)
            ? (
              <Message
                color="red"
                header="This account has opposed this proposal."
                content="The stake weighted value of this account has been recorded as opposing this proposal."
                icon="x"
              />
            )
            : false
          }
          <p>
            For more information on this proposal, please visit (not available yet)
          </p>
          <p>
            If you would like to modify your vote, use the buttons below.
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
                color={(isSupporting) ? 'green' : 'grey'}
                content={t('confirm')}
                floated="right"
                icon="checkmark"
                loading={isVotePending}
                onClick={() => this.approve(proposal_name)}
              />
            )}
            settings={settings}
            system={system}
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
                color={(isAgainst) ? 'orange' : 'grey'}
                content={t('confirm')}
                disabled={isAgainst}
                floated="right"
                icon="checkmark"
                loading={isVotePending}
                onClick={() => this.oppose(proposal_name)}
              />
            )}
            settings={settings}
            system={system}
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
                color="grey"
                content={t('confirm')}
                disabled={(!voted)}
                floated="right"
                icon="checkmark"
                loading={isVotePending}
                onClick={() => this.unvote(proposal_name)}
              />
            )}
            settings={settings}
            system={system}
          />
        </Segment>
      </React.Fragment>
    );
  }
}

export default translate('tools')(ToolsGovernanceProposalsProposal);
