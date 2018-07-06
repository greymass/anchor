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

    let iconName = 'share square';
    let textSetence = t('actions_table_row_voteproducer_text_one');

    if (data.proxy) {
      iconName = 'share square';
      textSetence = `${t('actions_table_row_voteproducer_text_two')} ${data.proxy}.`;
    } else if (data.producers.length !== 0) {
      const allButLastProducers = producers.slice(0, producers.length - 1).join(', ');
      const andStatement = (producers.length > 1) ? (` ${t('actions_table_row_text_and')}`) : '';
      const lastProducer = producers.slice(-1);

      iconName = 'check square';
      textSetence = `${t('actions_table_row_voteproducer_text_three')} ${allButLastProducers}${andStatement} ${lastProducer}.`;
    }

    return (
      <React.Fragment>
        <Icon
          floated="left"
          name={iconName}
          size="large"
        />
        {textSetence}
      </React.Fragment>
    );
  }
}

export default translate('actions')(WalletStatusActionsTableRowVoteproducer);
