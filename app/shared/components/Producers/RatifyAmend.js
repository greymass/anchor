// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Dropdown, Container, Header, Message, Segment } from 'semantic-ui-react';

import GovernanceRatifyAmendRatify from './Governance/RatifyAmend/Ratify';

class GovernanceRatifyAmend extends Component<Props> {
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
          Ratify / Amend
          <Header.Subheader>
            Coming soon!
          </Header.Subheader>
        </Header>
      </Segment>
    );
  }
}

export default translate('tools')(GovernanceRatifyAmend);
