// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { find } from 'lodash';

import {
  Button,
  Container,
  Dropdown,
  Header,
  Icon,
  Input,
  List,
  Loader,
  Message,
  Segment,
  Visibility
} from 'semantic-ui-react';

import GlobalModalDangerLink from '../../Global/Modal/DangerLink';
import ProposalsTable from './Table';

class ToolsGovernanceProposals extends Component<Props> {
  state = {
    amount: 10,
    scope: 'eosio.forum',
    queryString: '',
    onlyVoted: false
  };
  componentDidMount() {
    this.sync();
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
    this.setState({ amount: this.state.amount + 10 })
  };
  render() {
    const {
      actions,
      blockExplorers,
      keys,
      proposals,
      settings,
      system,
      t
    } = this.props;
    const {
      amount,
      onlyVoted,
      queryString,
      scope
    } = this.state;
    const {
      list,
      votes
    } = proposals;
    const isLocked = (!['ledger', 'watch'].includes(settings.walletMode) && !keys.key);
    let recentOptions = [];
    if (settings && settings.recentProposalsScopes) {
      recentOptions = settings.recentProposalsScopes.map((recentProposalsScope) => ({
        text: recentProposalsScope,
        value: recentProposalsScope,
      }));
    }
    const validList = list.filter((proposal) => !!proposal.valid)
      .map((proposal) => {
        const voted = !!find(votes, { proposal_name: proposal.proposal_name });
        const proposalAttributes = proposal;
        proposalAttributes.voted = voted;

        return proposalAttributes;
      });
    const filteredList =
      validList.filter((proposal) => {
        return (queryString.length === 0 ||
          (proposal.proposal_name &&
            proposal.proposal_name.toLowerCase().includes(queryString.toLowerCase())) ||
          (proposal.title && proposal.title.toLowerCase().includes(queryString.toLowerCase())));
      });
    const sortedList = filteredList.filter((proposal) => !onlyVoted || proposal.voted);
    return (
      <Segment basic>
        <Header>
          {t('tools_proposals_header')}
          <Header.Subheader>
            {t('tools_proposals_subheader')}
          </Header.Subheader>
        </Header>
        <Message
          content={(
            <React.Fragment>
              <p>
                {t('tools_proposals_explanation_one')}
              </p>
              <p>
                {t('tools_proposals_explanation_two')}
              </p>
              <List divided relaxed>
                <List.Item>
                  <GlobalModalDangerLink
                    content="https://eosvotes.io"
                    link="https://eosvotes.io"
                    settings={settings}
                  />
                </List.Item>
                <List.Item>
                  <GlobalModalDangerLink
                    content="https://bloks.io/vote/referendums"
                    link="https://bloks.io/vote/referendums"
                    settings={settings}
                  />
                </List.Item>
                <List.Item>
                  <GlobalModalDangerLink
                    content={`https://www.eosx.io/tools/referendums/proposals`}
                    link={`https://www.eosx.io/tools/referendums/proposals`}
                    settings={settings}
                  />
                </List.Item>
                <List.Item>
                  <GlobalModalDangerLink
                    content={`https://eosauthority.com/polls?&lnc=en`}
                    link={`https://eosauthority.com/polls?&lnc=en`}
                    settings={settings}
                  />
                </List.Item>
              </List>
            </React.Fragment>
          )}
          info
        />
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
        <Input
          placeholder={t('tools_proposals_search_placeholder')}
          onChange={(e) => this.setState({ queryString: e.target.value })}
        />
        <Button
          color={onlyVoted ? 'blue' : 'grey'}
          onClick={() => this.setState({ onlyVoted: !onlyVoted })}
          style={{ marginLeft: 20 }}
        >
          {onlyVoted && (
            <Icon name="check" />
          )}
          {t('tools_proposal_sort_by_vote')}
        </Button>
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
            isLocked={isLocked}
            list={sortedList.splice(0, amount)}
            settings={settings}
            system={system}
            votes={votes}
          />
        </Visibility>
        {(!queryString && !onlyVoted && amount < sortedList.length) && (
          <Segment key="ProposalsTableLoading" clearing padded vertical>
            <Loader active />
          </Segment>
        )}
      </Segment>
    );
  }
}

export default translate('tools')(ToolsGovernanceProposals);
