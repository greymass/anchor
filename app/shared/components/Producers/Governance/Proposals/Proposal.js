// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { find } from 'lodash';
import Moment from 'react-moment';
const { shell } = require('electron');
import { Button, Header, Message, Segment } from 'semantic-ui-react';

import GovernanceProposalsProposalVote from './Proposal/Vote';

class GovernanceProposalsProposal extends Component<Props> {
  approve = (proposal_id) => {
    const { actions, settings } = this.props;
    const voter = settings.account;
    const vote = 1;
    actions.registerVoter(voter).then( (tx) => {
      actions.voteProposal(voter, proposal_id, vote);
    });
  }
  abstain = (proposal_id) => {
    const { actions, settings } = this.props;
    const voter = settings.account;
    const vote = 2;

    actions.registerVoter(voter).then( (tx) => {
      actions.voteProposal(voter, proposal_id, vote);
    });
  }
  oppose = (proposal_id) => {
    const { actions, settings } = this.props;
    const voter = settings.account;
    const vote = 0;

    actions.registerVoter(voter).then( (tx) => {
      actions.voteProposal(voter, proposal_id, vote);
    });
  }
  claim = (proposal_id) => {
    const { actions } = this.props;
    actions.claimProposal(proposal_id);
  }
  openLink = (link) => shell.openExternal(link);
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
      id,
      title,
      ipfs_location,
      text_hash,
      cycles,
      amount,
      send_to,
      fee,
      proposer,
      yes_count,
      no_count,
      last_cycle_check,
      last_cycle_status,
      created,
      outstanding
    } = proposal;
    let proposalFee = fee;
    if (proposalFee && proposalFee > 0) proposalFee = proposalFee / 10000; // convert to precision
    const expires = (created + cycles * 2500000) * 1000; // milliseconds per cycle (5M blocks or 2.5M seconds per cycle)
    const vote = find(votes, ['vote_key', id]);
    const voted = !!(vote);
    const against = (voted) ? (vote.direction=='0') : false;
    const approved = (voted) ? (vote.direction=='1') : false;
    const abstained = (voted) ? (vote.direction=='2') : false;
    const isExpired = expires < Date.now();
    const isVotePending = !!(system.GOVERNANCE_VOTE_PROPOSAL === 'PENDING' || system.GOVERNANCE_UNVOTE_PROPOSAL === 'PENDING')
    const isSupporting = (voted && approved);
    const isAbstaining = (voted && abstained);
    const isAgainst = (voted && against);
    return (
      <React.Fragment>
        <Header
          as={Segment}
          attached="top"
          color="black"
          block
          size="huge"
        >
          {title} (#{id})
          <Header.Subheader>
            <p floated="left">Proposed By <strong>{proposer}</strong></p>
            {
            (outstanding > 0) ?
            <Button
              color='green'
              content="Claim Funds"
              floated="right"
              icon="dollar"
              onClick={() => this.claim(id)}
              primary
              style={{ marginTop: -50 }}
            />
            : ''}
          </Header.Subheader>
        </Header>
        <Segment attached>
          {(isSupporting)
            ? (
              <Message
                color="green"
                header="You have voted YES on this worker proposal."
                icon="checkmark"
              />
            )
            : false
          }
          {(isAbstaining)
            ? (
              <Message
                color="yellow"
                header="You have voted to ABSTAIN on this worker proposal."
                icon="minus"
              />
            )
            : false
          }
          {(isAgainst)
            ? (
              <Message
                color="red"
                header="You have voted NO on this worker proposal."
                icon="x"
              />
            )
            : false
          }
          <React.Fragment><p><strong>Expires:</strong> <Moment>{expires}</Moment></p></React.Fragment>
          <React.Fragment><p><strong>Amount Requested:</strong> {amount} {settings.blockchain.tokenSymbol}</p></React.Fragment>
          <React.Fragment><p><strong>Requesting Account:</strong> {send_to}</p></React.Fragment>
          {
            (proposer !== settings.account) ?
              <div>
                <React.Fragment><p><strong>Worker Proposal Fee:</strong> {proposalFee + ' ' + settings.blockchain.tokenSymbol}</p></React.Fragment>
                <React.Fragment><p><strong>Yes Votes:</strong> {yes_count}</p></React.Fragment>
                <React.Fragment><p><strong>No Votes:</strong> {no_count}</p></React.Fragment>
              </div>
              : ''
          }
          <React.Fragment>
            {text_hash}
            {
              (ipfs_location) ? 
              <p>For more information on this proposal, please visit this IPFS url: 
                <a
                  onClick={() => this.openLink(ipfs_location)}
                  role="link"
                  style={{ cursor: 'pointer', fontSize:'10pt' }}
                  tabIndex={0}
                > {ipfs_location}</a>
              </p>
              : ''
            }
          </React.Fragment>
          <React.Fragment><p>Please use the buttons below to specify your vote for this proposal.</p></React.Fragment>
          <GovernanceProposalsProposalVote
            actionName="GOVERNANCE_VOTE_PROPOSAL"
            actions={actions}
            blockExplorers={blockExplorers}
            button={{
              color: 'grey',
              content: t('Yes'),
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
                style={{ marginTop: 10 }}
                onClick={() => this.approve(id)}
                primary
              />
            )}
            isExpired={isExpired}
            proposal={proposal}
            settings={settings}
            system={system}
            vote="Yes"
          />
          <GovernanceProposalsProposalVote
            actionName="GOVERNANCE_VOTE_PROPOSAL"
            actions={actions}
            blockExplorers={blockExplorers}
            button={{
              color: 'grey',
              content: t('No'),
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
                style={{ marginTop: 10 }}
                onClick={() => this.oppose(id)}
                primary
              />
            )}
            isExpired={isExpired}
            proposal={proposal}
            settings={settings}
            system={system}
            vote="No"
          />
          <GovernanceProposalsProposalVote
            actionName="GOVERNANCE_VOTE_PROPOSAL"
            actions={actions}
            blockExplorers={blockExplorers}
            button={{
              color: 'grey',
              content: t('Abstain'),
              disabled: isAbstaining,
              icon: 'minus'
            }}
            confirm={(
              <Button
                color={(isAbstaining) ? 'blue' : 'grey'}
                content={t('confirm')}
                disabled={isAbstaining}
                floated="right"
                icon="checkmark"
                loading={isVotePending}
                style={{ marginTop: 10 }}
                onClick={() => this.abstain(id)}
                primary
              />
            )}
            isExpired={isExpired}
            proposal={proposal}
            settings={settings}
            system={system}
            vote="Abstain"
          />
        </Segment>
      </React.Fragment>
    );
  }
}

export default translate('tools')(GovernanceProposalsProposal);
