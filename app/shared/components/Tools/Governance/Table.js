import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Table, Icon, Popup } from 'semantic-ui-react';
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
            <Table.HeaderCell />
            <Table.HeaderCell>
              {t('tools_proposals_title')}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {t('tools_proposals_id')}
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
                <React.Fragment key={proposal.proposal_name}>
                  <Table.Row>
                    <Table.Cell>
                      <Popup
                        content={t('tools_proposals_voted_message')}
                        inverted
                        position="top center"
                        style={{ textAlign: 'center' }}
                        trigger={(
                          <Icon
                            size="large"
                            color={proposal.voted ? 'green' : 'grey'}
                            name={proposal.voted ? 'check square outline' : 'square outline'}
                          />
                        )}
                      />
                    </Table.Cell>
                    <Table.Cell style={{ maxWidth: 300 }}>
                      {proposal.title}
                    </Table.Cell>
                    <Table.Cell>
                      {proposal.proposal_name}
                    </Table.Cell>
                    <Table.Cell>
                      {(new Date(proposal.expires_at)).toLocaleDateString('en-US')}
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        icon="bars"
                        onClick={() => {
                          this.setState({
                            selectedProposal: selected ? null : proposal.proposal_name
                          });
                        }}
                        color={selected ? 'grey' : 'blue'}
                        content={t('tools_proposals_select_button')}
                      />
                    </Table.Cell>
                  </Table.Row>
                  {selected &&
                    (
                      <Table.Row>
                        <Table.Cell colSpan="5">
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
