// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { find } from 'lodash';

import { Dropdown, Container, Header, List, Message, Segment, Button, Input, Table } from 'semantic-ui-react';

import GlobalModalDangerLink from '../../Global/Modal/DangerLink';
import ToolsGovernanceProposalsProposal from './Proposals/Proposal';

class ToolsGovernanceProposals extends Component<Props> {
  state = {
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
  }
  sync = () => {
    const { actions } = this.props;
    const { scope } = this.state;
    actions.getProposals(scope);
  }
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
      onlyVoted,
      queryString,
      scope,
      selectedProposal
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
    const filteredList =
      validList.filter((proposal) => queryString.length === 0 ||
        proposal.proposal_name.includes(queryString));
    const sortedList = filteredList.filter((proposal) => {
      if (!onlyVoted) {
        return true;
      }
      return !!(find(votes, { proposal_name: proposal.proposal_name }));
    });
    return (
      <Segment basic>
        <Header>
          {t('governance_proposals_header')} Referendum::Proposals
          <Header.Subheader>
            {t('governance_proposals_subheader')} This is an early release of the interface in eos-voter to interact with the LIVE EOS Referendum System. Expect a major revamp of this tool in the near future.
          </Header.Subheader>
        </Header>
        <Message
          content={(
            <React.Fragment>
              <p>
                {t('governance_proposals_explanation_one')}
                The Referendum system is a smart contract that allows EOS stakeholders to directly be involved in the governance of the EOS blockchain.
                Each proposal created by the community is entered into this interface, which will allow a set period of time where all accounts (which stake EOS) will be allowed to vote in yes/no on the matters presented in a stake weighted system.
              </p>
              <p>
                {t('governance_proposals_explanation_two')}
                This is a voting interface - and not a research tool. Use the external links provided with each proposal to view the status and full details of each proposal. Proposals can also be browsed using the following sites:
              </p>
              <List divided relaxed>
                <List.Item>
                  <GlobalModalDangerLink
                    content={`https://eosvotes.io`}
                    link={`https://eosvotes.io`}
                    settings={settings}
                  />
                </List.Item>
                <List.Item>
                  <GlobalModalDangerLink
                    content={`https://bloks.io/vote/referendums`}
                    link={`https://bloks.io/vote/referendums`}
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
                Proposal Scope:
                {' '}
                {scope}
              </Message>
            )
            : (
              <Message>
                No proposals found in the scope named "{scope}".
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
          onChange={(e) => this.setState({ queryString: e.target.value }) }
        />
        <Button
          content={onlyVoted ? t('tools_proposal_sort_by_vote') : t('tools_proposal_remove_filter')}
          color="grey"
          onClick={() => this.setState({ onlyVoted: !onlyVoted })}
        />
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                {t('governance_proposals_title')}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {t('governance_proposals_name')}
              </Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {([].concat(sortedList)
                .map((proposal) => (
                <React.Fragment>
                  <Table.Row>
                    <Table.Cell>
                      {proposal.title}
                    </Table.Cell>
                    <Table.Cell>
                      {proposal.proposal_name}
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        onClick={() => {
                          this.setState({ selectedProposal: proposal.proposal_name })
                        }}
                        content={t('proposals_select_button')}
                      />
                    </Table.Cell>
                  </Table.Row>
                  {selectedProposal === proposal.proposal_name &&
                    (
                      <Table.Row>
                        <Table.Cell colSpan='3'>
                          <ToolsGovernanceProposalsProposal
                            actions={actions}
                            blockExplorers={blockExplorers}
                            isLocked={isLocked}
                            key={proposal.proposal_name}
                            proposal={proposal}
                            scope={scope}
                            settings={settings}
                            system={system}
                            votes={votes}
                          />
                        </Table.Cell>
                      </Table.Row>
                  )}
                </React.Fragment>
              )))}
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}

export default translate('tools')(ToolsGovernanceProposals);
