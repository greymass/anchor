// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Dropdown, Container, Header, Segment } from 'semantic-ui-react';

import ToolsGovernanceProposalsProposal from './Proposals/Proposal';

class ToolsGovernanceProposals extends Component<Props> {
  state = {
    scope: 'cancancan345'
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
      proposals,
      settings,
      t
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
        <Header>
          {t('tools_proposals_header')}
          <Header.Subheader>
            {t('tools_proposals_subheader')}
          </Header.Subheader>
        </Header>
        <Container>
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
        {(list && list.length)
          ? (
            <Header size="large">
              {t('tools_proposals_scope_selected')}:
              {' '}
              {scope}
            </Header>
          )
          : (
            <Header size="large">
              {t('tools_proposals_no_proposals_in_scope')}:
              {' '}
              {scope}
            </Header>
          )
        }
        {([].concat(list)
          .filter((proposal) => !!proposal.valid)
          .map((proposal) => (
            <ToolsGovernanceProposalsProposal
              actions={actions}
              proposal={proposal}
              scope={scope}
              settings={settings}
              votes={votes}
            />
          ))
        )}
      </Segment>
    );
  }
}

export default translate('tools')(ToolsGovernanceProposals);
