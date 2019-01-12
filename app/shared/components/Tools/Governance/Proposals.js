// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Dropdown, Container, Header, List, Message, Segment } from 'semantic-ui-react';

import GlobalModalDangerLink from '../../Global/Modal/DangerLink';
import ToolsGovernanceProposalsProposal from './Proposals/Proposal';

class ToolsGovernanceProposals extends Component<Props> {
  state = {
    scope: 'eosio.forum'
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
          Referendum::Proposals
          <Header.Subheader>
            This is an early release of the interface in eos-voter to interact with the LIVE EOS Referendum System. Expect a major revamp of this tool in the near future.
          </Header.Subheader>
        </Header>
        <Message
          content={(
            <React.Fragment>
              <p>
                The Referendum system is a smart contract that allows EOS stakeholders to directly be involved in the governance of the EOS blockchain.
                Each proposal created by the community is entered into this interface, which will allow a set period of time where all accounts (which stake EOS) will be allowed to vote in yes/no on the matters presented in a stake weighted system.
              </p>
              <p>
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
