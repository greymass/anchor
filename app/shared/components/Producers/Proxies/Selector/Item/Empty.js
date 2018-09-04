// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { List, Message } from 'semantic-ui-react';

export default class ProducersSelectorItemEmpty extends Component<Props> {
  render() {
    const {
      modified,
    } = this.props;
    return (
      <I18n ns="producers">
        {
          (t) => (
            <List.Item>
              {(modified)
                ? (
                  <Message
                    icon="warning sign"
                    header={t('producer_voter_remove_all_votes_header')}
                    content={t('producer_voter_remove_all_votes_subheader')}
                  />
                )
                : (
                  <Message
                    icon="law"
                    header={t('producer_voter_no_producers_votes_cast_header')}
                    content={t('producer_voter_no_producers_votes_cast_subheader')}
                  />
                )
              }
            </List.Item>
          )
        }
      </I18n>
    );
  }
}
