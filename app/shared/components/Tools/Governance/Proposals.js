// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Dropdown, Container, Header, Message, Segment } from 'semantic-ui-react';

import ToolsGovernanceProposalsProposal from './Proposals/Proposal';

class ToolsGovernanceProposals extends Component<Props> {
  state = {
    scope: 'eosforumrcpp'
  }
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
      scope
    } = this.state;
    const {
      list,
      votes
    } = proposals;
    const isLocked = (settings.walletMode !== 'watch' && !keys.key);
    let recentOptions = [];
    if (settings && settings.recentProposalsScopes) {
      recentOptions = settings.recentProposalsScopes.map((recentProposalsScope) => ({
        text: recentProposalsScope,
        value: recentProposalsScope,
      }));
    }
    return (
      <Segment basic>
        <Header>
          Referendum::Proposals (BETA)
          <Header.Subheader>
            This feature is a preview release of the upcoming Referendum system being implemented into the EOS ecosystem.
          </Header.Subheader>
        </Header>
        <Message
          content={(
            <React.Fragment>
              <p>
                The Referendum system is a smart contract that allows EOS stakeholders to directly be involved in the governance of the EOS blockchain. When a proposal is entered into the referendum contract, there will be a period of time where all accounts staking EOS will be allowed to vote in yes/no on the matters presented in a stake weighted system.
              </p>
              <p>
                External links to learn more about this system will be integrated as the system evolves and as more official releases are made available.
              </p>
            </React.Fragment>
          )}
          info
        />
        <Container style={{ display: 'none' }}>
          {(list && list.length)
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
        {([].concat(list)
          .filter((proposal) => !!proposal.valid)
          .map((proposal) => (
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
          ))
        )}
      </Segment>
    );
  }
}

export default translate('tools')(ToolsGovernanceProposals);
