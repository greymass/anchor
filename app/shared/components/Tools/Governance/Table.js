import React, { Component } from 'react';
import { translate } from 'react-i18next';
import {  Button, Table } from 'semantic-ui-react';
import ToolsGovernanceProposalsProposal from './Proposals';

class ProposalsTable extends Component<Props> {
  state= { selectedProposal: null };
  render() {
    const {
      actions,
      blockExplorers,
      isLocked,
      scope,
      settings,
      system,
      t,
      votes
    } = this.props;
    const {
      selectedProposal
    } = this.state;
    return (
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
    );
  }
}

export default translate(ProposalsTable);
