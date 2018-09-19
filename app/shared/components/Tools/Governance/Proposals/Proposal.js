// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Header, Segment } from 'semantic-ui-react';

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
      proposal,
      votes
    } = this.props;
    const {
      json,
      proposal_name,
      title
    } = proposal;
    const vote = _.find(votes, ['proposal_name', proposal_name]);
    const voted = !!(vote);
    const approved = (voted) ? !!(vote.vote) : false;
    const status = (voted) ? ((approved) ? 'tools_proposals_vote_status_approved' : 'tools_proposals_vote_status_opposed') : 'tools_proposals_vote_status_novote';
    return (
      <React.Fragment>
        <Header
          attached="top"
          block
          size="huge"
        >
          <Header.Subheader>
            {proposal_name} - {json.type}
          </Header.Subheader>
          {title}
        </Header>
        <Segment attached>

          <br />approved: {(approved) ? 'true' : 'false'}
          <br />voted: {(voted) ? 'true' : 'false'}
          <p>Read more about this proposal:</p>
          <p>
            Your current vote: {status}

          </p>
          <p>Modify your vote for this proposal:</p>
          <Button
            color="green"
            content={'Yes'}
            disabled={(voted && approved)}
            icon="checkmark"
            onClick={() => this.approve(proposal_name)}
          />
          <Button
            color="orange"
            content={'No'}
            disabled={(voted  && !approved)}
            icon="x"
            onClick={() => this.oppose(proposal_name)}
          />
          <Button
            color="grey"
            content={'Unvote'}
            disabled={(!voted)}
            icon="trash"
            onClick={() => this.unvote(proposal_name)}
          />
        </Segment>
      </React.Fragment>
    );
  }
}

export default translate('tools')(ToolsGovernanceProposalsProposal);
