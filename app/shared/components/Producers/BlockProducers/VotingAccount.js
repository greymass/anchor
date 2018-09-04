// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Header, Segment } from 'semantic-ui-react';

export default class ProducersVotingAccount extends Component<Props> {
  render() {
    const {
      settings
    } = this.props;
    return (
      <I18n ns="producers">
        {
          (t) => (
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
          )
        }
      </I18n>
    );
  }
}
