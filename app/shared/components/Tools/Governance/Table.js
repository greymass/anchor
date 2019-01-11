import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Table } from 'semantic-ui-react';
import ToolsGovernanceProposalsProposal from './Proposals/Proposal';

class ProposalsTable extends Component<Props> {
  state= { selectedProposal: null };
  render() {
    const {
      actions,
      blockExplorers,
      isLocked,
      list,
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
      <Table style={{ marginTop: 20 }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              {t('tools_proposals_title')}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {t('tools_proposals_expires')}
            </Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {([].concat(list)
            .map((proposal) => {
              const selected = selectedProposal === proposal.proposal_name;
              return (
                <React.Fragment>
                  <Table.Row>
                    <Table.Cell>
                      {proposal.title}
                    </Table.Cell>
                    <Table.Cell>
                      {(new Date(proposal.expires_at)).toLocaleDateString('en-US')}
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        onClick={() => {
                          this.setState({
                            selectedProposal: selected ? null : proposal.proposal_name
                          });
                        }}
                        content={selected ? t('tools_proposals_hide_button') : t('tools_proposals_select_button')}
                      />
                    </Table.Cell>
                  </Table.Row>
                  {selected &&
                    (
                      <Table.Row>
                        <Table.Cell colSpan="3">
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
              );
            }))}
        </Table.Body>
      </Table>
    );
  }
}

export default translate('tools')(ProposalsTable);
