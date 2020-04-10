// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Header, Segment } from 'semantic-ui-react';

class ProducersVotingAccount extends Component<Props> {
  render() {
    const {
      settings,
      t,
    } = this.props;
    return (
      <Segment secondary color="purple">
        <Header>
          {t('producer_voter_voting_as')}
          {' '}
          {settings.account}
          <Header.Subheader>
            {t('producer_voted_connected_to')}
            {' '}
            {settings.node}
          </Header.Subheader>
        </Header>
      </Segment>
    );
  }
}

export default withTranslation('producers')(ProducersVotingAccount);
