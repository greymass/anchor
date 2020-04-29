// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { List, Message } from 'semantic-ui-react';

class ProducersSelectorItemEmpty extends Component<Props> {
  render() {
    const {
      modified,
      t,
    } = this.props;
    return (
      <List.Item>
        {(modified)
          ? (
            <Message
              header={t('producer_voter_remove_all_votes_header')}
              content={t('producer_voter_remove_all_votes_subheader')}
            />
          )
          : (
            <Message
              header={t('producer_voter_no_producers_votes_cast_header')}
              content={t('producer_voter_no_producers_votes_cast_subheader')}
              size="small"
            />
          )
        }
      </List.Item>
    );
  }
}

export default withTranslation('producers')(ProducersSelectorItemEmpty);
