// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Header, List, Segment } from 'semantic-ui-react';

import ProducersSelectorItem from './Selector/Item';
import ProducersSelectorItemEmpty from './Selector/Item/Empty';

export default class ProducersSelector extends Component<Props> {
  render() {
    const {
      account,
      modified,
      selected,
      submitting
    } = this.props;
    return (
      <I18n ns="producers">
        {
          (t) => (
            <Segment loading={!(account)}>
              <Button
                color={modified ? 'green' : 'grey'}
                content={modified ? t('producer_voter_save_changes') : t('producer_voter_no_changes')}
                disabled={!modified}
                fluid
                loading={submitting}
                onClick={() => this.props.submitProducerVotes()}
              />
              <List
                divided
                relaxed
                size="small"
              >
                <List.Item key="header">
                  <Header size="small" textAlign="center">
                    <Header.Subheader>
                      {selected.length}/30 {t('producer_voter_votes_used')}
                    </Header.Subheader>
                  </Header>
                </List.Item>
                {(selected.length)
                  ? selected.map((producer) => (
                    <ProducersSelectorItem
                      key={producer}
                      producer={producer}
                      removeProducer={this.props.removeProducer}
                    />
                  ))
                  : (
                    <ProducersSelectorItemEmpty
                      key="empty"
                      modified={modified}
                    />
                  )
                }
              </List>
            </Segment>
          )
        }
      </I18n>
    );
  }
}
