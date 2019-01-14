import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Table, Icon, Popup } from 'semantic-ui-react';
import ToolsGovernanceProposalsProposal from './Proposals/Proposal';
import TimeAgo from 'react-timeago';

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
      validate,
      votes,
      wallet
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
                        content={t(proposal.voted ? 'tools_proposals_voted_message' : 'tools_proposals_not_voted_message')}
                        inverted
                        position="top center"
                        style={{ textAlign: 'center' }}
                        trigger={(
                          <Icon
                            disabled={!proposal.voted}
                            size="large"
                            color={proposal.voted ? 'purple' : 'grey'}
                            name="balance scale"
                          />
                        )}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      {proposal.title}
                      <p>
                        <small>
                          {t('tools_proposals_id')}: {proposal.proposal_name}
                        </small>
                      </p>
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        icon={selected ? 'x' : 'bars'}
                        onClick={() => {
                          this.setState({
                            selectedProposal: selected ? null : proposal.proposal_name
                          });
                        }}
                        color={selected ? 'grey' : 'blue'}
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
                            validate={validate}
                            votes={votes}
                            wallet={wallet}
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
