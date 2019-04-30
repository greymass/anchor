// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { find } from 'lodash';

import {
  Container,
  Dropdown,
  Grid,
  Header,
  Input,
  Loader,
  Message,
  Segment,
  Select,
  Visibility
} from 'semantic-ui-react';

import GlobalModalDangerLink from '../../Global/Modal/DangerLink';
import ProposalsTable from './Table';

class ToolsGovernanceProposals extends Component<Props> {
  state = {
    amount: 10,
    scope: 'eosio.forum',
    queryString: '',
  };
  componentDidMount() {
    const { actions } = this.props;
    this.sync();
    actions.getAbi('eosio.forum');
  }
  componentWillReceiveProps(prevProps) {
    const { settings } = this.props;
    const { settings: prevSettings } = prevProps;
    if (settings.account !== prevSettings.account || settings.chainId !== prevSettings.chainId) {
      this.sync();
    }
  }
  onChange = (e, { name, selection, value }) => {
    this.setState({ [name]: value }, () => {
      // If this is the dropdown, fire the submit
      if (selection) {
        this.sync();
      }
    });
  };
  sync = () => {
    const { actions } = this.props;
    const { scope } = this.state;
    actions.getProposals(scope);
  };
  loadMore = () => {
    this.setState({ amount: this.state.amount + 10 });
  };
  render() {
    const {
      actions,
      blockExplorers,
      contracts,
      keys,
      proposals,
      settings,
      system,
      t,
      validate,
      wallet
    } = this.props;
    const {
      amount,
      filterByVote,
      filterByStatus,
      queryString,
      scope
    } = this.state;
    const {
      list,
      votes
    } = proposals;
    const isLocked = (!['ledger', 'watch'].includes(settings.walletMode) && (keys && !keys.key));
    let recentOptions = [];
    if (settings && settings.recentProposalsScopes) {
      recentOptions = settings.recentProposalsScopes.map((recentProposalsScope) => ({
        text: recentProposalsScope,
        value: recentProposalsScope,
      }));
    }
    const currentTime = new Date();
    const validList = list.filter((proposal) => !!proposal.valid)
      .map((proposal) => {
        const vote = find(votes, { proposal_name: proposal.proposal_name });
        const proposalAttributes = proposal;

        proposalAttributes.voted = !!vote;
        proposalAttributes.accepted = vote && vote.vote === 1;
        proposalAttributes.rejected = vote && vote.vote === 0;

        proposalAttributes.expired = !!(new Date(proposal.expires_at) < currentTime);
        proposalAttributes.active = !!(new Date(proposal.expires_at) >= currentTime);

        return proposalAttributes;
      });
    const filteredList =
      validList.filter((proposal) => (queryString.length === 0 ||
          (proposal.proposal_name &&
            proposal.proposal_name.toLowerCase().includes(queryString.toLowerCase())) ||
          (proposal.title && proposal.title.toLowerCase().includes(queryString.toLowerCase()))));
    const sortedList = filteredList.filter((proposal) => {
      switch (filterByVote) {
        case 'accepted':
          return proposal.accepted;
        case 'rejected':
          return proposal.rejected;
        case 'unvoted':
          return !proposal.voted;
        case 'all':
        default:
          return true;
      }
    }).filter((proposal) => {
      switch (filterByStatus) {
        case 'expired':
          return proposal.expired;
        case 'active':
        default:
          return proposal.active;
      }
    });
    const filterByVoteOptions = [
      {
        key: 'all',
        text: t('tools_proposals_voted_filter_all'),
        value: 'all',
      },
      {
        key: 'accepted',
        text: t('tools_proposals_voted_filter_accepted'),
        value: 'accepted',
      },
      {
        key: 'rejected',
        text: t('tools_proposals_voted_filter_rejected'),
        value: 'rejected',
      },
      {
        key: 'unvoted',
        text: t('tools_proposals_voted_filter_unvoted'),
        value: 'unvoted',
      }
    ];

    const filterByStatusOptions = [
      {
        key: 'active',
        text: t('tools_proposals_status_filter_active'),
        value: 'active',
      },
      {
        key: 'expired',
        text: t('tools_proposals_status_filter_expired'),
        value: 'expired',
      }
    ];
    return (
      <Segment color="purple" piled style={{ marginTop: 0 }}>
        <Header>
          {t('tools_proposals_header')}
          <Header.Subheader>
            {t('tools_proposals_subheader')}
          </Header.Subheader>
        </Header>
        <Container style={{ display: 'none' }}>
          {(sortedList && sortedList.length)
            ? (
              <Message>
                {t('tools_proposals_container_message')}
                {''}
                {scope}
              </Message>
            )
            : (
              <Message>
                {t('tools_proposals_container_message_none', { scope })}
              </Message>
            )
          }
          <Dropdown
            additionLabel=""
            allowAdditions
            defaultValue={this.state.scope}
            fluid
            label={t('tools_proposals_scope_label')}
            name="scope"
            placeholder={t('tools_proposals_scope_placeholder')}
            onChange={this.onChange}
            options={recentOptions}
            search
            selection
            selectOnBlur={false}
            selectOnNavigation={false}
          />
        </Container>
        <Grid>
          <Grid.Column width={10}>
            <Select
              defaultValue="all"
              name="filterByVote"
              onChange={(e, { value }) => this.setState({ filterByVote: value })}
              options={filterByVoteOptions}
              selection
              style={{ marginLeft: '10px' }}
            />
            <Select
              defaultValue="active"
              name="filterByStatus"
              onChange={(e, { value }) => this.setState({ filterByStatus: value })}
              options={filterByStatusOptions}
              selection
              style={{ marginLeft: '10px' }}
            />
          </Grid.Column>
          <Grid.Column width={6} key="ProducersVotingPreview" textAlign="right">
            <Input
              placeholder={t('tools_proposals_search_placeholder')}
              onChange={(e) => this.setState({ queryString: e.target.value })}
            />
          </Grid.Column>
        </Grid>
        {(sortedList.length > 0) ? (
          <Visibility
            continuous
            key="ProxiesTable"
            fireOnMount
            onBottomVisible={this.loadMore}
            once={false}
          >
            <ProposalsTable
              actions={actions}
              blockExplorers={blockExplorers}
              contracts={contracts}
              isLocked={isLocked}
              list={sortedList.splice(0, amount)}
              scope={scope}
              settings={settings}
              system={system}
              validate={validate}
              votes={votes}
              wallet={wallet}
            />
          </Visibility>
        ) : (
          <Message
            content={t('tools_proposals_message_no_proposals')}
            warning
          />
        )}
        {((!queryString && !filterByVote && amount < sortedList.length) ||
          (system.GOVERNANCE_GET_PROPOSALS === 'PENDING')) && (
          <Segment key="ProposalsTableLoading" clearing padded vertical>
            <Loader active />
          </Segment>
        )}
      </Segment>
    );
  }
}

export default translate('tools')(ToolsGovernanceProposals);
