// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Dropdown, Container, Header, Message, Segment } from 'semantic-ui-react';

import GovernanceProposalsProposal from './Governance/Proposals/Proposal';
import GovernanceProposalsButtonProxy from './Governance/Proposals/Button/Proposal';

class GovernanceProposals extends Component<Props> {
  state = {
    scope: 'eosio.work'
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
  onClose = () => {
    const { onCloseProposal } = this.props;
    this.sync();
    onCloseProposal();
  }
  sync = () => {
    const { actions } = this.props;
    const { scope } = this.state;
    actions.getProposals(scope);
  }
  render() {
    const {
      accounts,
      actions,
      blockExplorers,
      proposals,
      settings,
      system,
      t,
      tables,
      validate,
      wallet
    } = this.props;
    const {
      scope
    } = this.state;
    const {
      list,
      votes
    } = proposals;
    let recentOptions = [];
    if (settings && settings.recentProposalsScopes) {
      recentOptions = settings.recentProposalsScopes.map((recentProposalsScope) => ({
        text: recentProposalsScope,
        value: recentProposalsScope,
      }));
    }
    return (
      <Segment basic>
        <Header floated="left">
          Worker Proposals
        </Header>
        {(0==0)
          ? (
            <Container floated="right" style={{ marginBottom: '50px' }}>
              <GovernanceProposalsButtonProxy
                accounts={accounts}
                actions={actions}
                blockExplorers={blockExplorers}
                onClose={this.onClose}
                settings={settings}
                system={system}
                tables={tables}
                validate={validate}
                wallet={wallet}
              />
            </Container>
          )
          : ''
        }
          <Message 
            content={(
              <React.Fragment>
                <p>
                  We encourage you to participate in these worker proposals to make your voice heard in the governance of this blockchain. Please vote responsibly.
                </p>
              </React.Fragment>
            )}
            info
          />
          <Container>
            {(list && list.length)
              ? (
                <Message
                style={{ display: 'none' }}>
                  Proposal Scope:
                  {' '}
                  {scope}
                </Message>
              )
              : (
                <Message
                style={{ display: 'none' }}
                >
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
              style={{ display: 'none' }}
            />
          </Container>
          {([].concat(list)
            // .filter((p) => ((p.created + p.cycles * 2500000) * 1000) < Date.now()) // ignored expired proposals
            .map((proposal) => (
              <GovernanceProposalsProposal
                actions={actions}
                key={proposal.id}
                blockExplorers={blockExplorers}
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

export default translate('tools')(GovernanceProposals);
