// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Header, List, Segment } from 'semantic-ui-react';

import ProducersSelectorItem from './Selector/Item';
import ProducersSelectorItemEmpty from './Selector/Item/Empty';

export default class ProducersSelector extends Component<Props> {
  render() {
    const {
      account,
      isProxying,
      modified,
      selected,
      t,
      unregisteredProducers
    } = this.props;
    const listItems = [(
      <List.Item key="header">
        <Header color="blue" textAlign="center">
          {(isProxying) ? t('producer_voter_proxying_vote') : false}
          <Header.Subheader>
            {selected.length}/30 {t('producer_voter_votes_used')}
          </Header.Subheader>
        </Header>
      </List.Item>
    )];

    const registeredProducersSelected = selected - unregisteredProducers;

    if (registeredProducersSelected.length === 0) {
      listItems.push(<ProducersSelectorItemEmpty
        isProxying={isProxying}
        key={`${isProxying}-empty`}
        modified={modified}
      />);
    } else {
      listItems.concat(selected.map((producer) => (
        <ProducersSelectorItem
          isProxying={isProxying}
          key={`${isProxying}-${producer}`}
          producer={producer}
          removeProducer={this.props.removeProducer}
        />
      )));
    }
    if (unregisteredProducers.length !== 0) {
      listItems.push(
        <List.Item key="header">
          <Header color="blue" textAlign="center">
            {t('producer_voter_unregistered_block_producers')}
          </Header>
        </List.Item>
      );
      listItems.concat(unregisteredProducers.map((producer) => (
        <ProducersSelectorItem
          isProxying={isProxying}
          key={`${isProxying}-${producer}`}
          producer={producer}
          removeProducer={this.props.removeProducer}
        />
      )));
    }

    return (
      <I18n ns="producers">
        {
          (t) => (
            <Segment loading={!(account)}>
              <List
                divided
                relaxed
                size="small"
              >
                {listItems}
                {(selected.length)
                  ? selected.map((producer) => (
                    <ProducersSelectorItem
                      isProxying={isProxying}
                      key={`${isProxying}-${producer}`}
                      producer={producer}
                      removeProducer={this.props.removeProducer}
                    />
                  ))
                  : (
                    <ProducersSelectorItemEmpty
                      isProxying={isProxying}
                      key={`${isProxying}-empty`}
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
