// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Icon } from 'semantic-ui-react';

class WalletStatusActionsTableRowVoteproducer extends Component<Props> {
  render() {
    const {
      action,
      t
    } = this.props;
    const {
      data
    } = action.action_trace.act;

    const {
      producers
    } = data;

    const allButLastProducers = producers.slice(0, producers.length - 1).join(', ');

    const andStatement = (producers.length > 1) ? (` ${t('actions_table_row_text_and')}`) : '';

    const lastProducer = producers.slice(-1);

    return (
      <React.Fragment>
        <Icon
          floated="left"
          name="check square"
          size="large"
        />
        { `${t('actions_table_row_voteproducer_text')} ${allButLastProducers}${andStatement} ${lastProducer}.` }
      </React.Fragment>
    );
  }
}

export default translate('actions')(WalletStatusActionsTableRowVoteproducer);
