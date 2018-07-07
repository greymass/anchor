// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Icon } from 'semantic-ui-react';

class WalletStatusActionsTableRowVoteproducer extends Component<Props> {
  render() {
    const {
      action,
      settings,
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

    if (data.proxy === settings.account) {
      const capitalizedVoterName = data.voter.charAt(0).toUpperCase() + data.voter.slice(1);

      textSetence = `${capitalizedVoterName} ${t('actions_table_row_voteproducer_text_two')}`;
    } else if (data.proxy) {
      textSetence = `${t('actions_table_row_voteproducer_text_three')} ${data.proxy}.`;
    } else if (data.producers.length !== 0) {
      const allButLastProducers = producers.slice(0, producers.length - 1).join(', ');
      const andStatement = (producers.length > 1) ? (` ${t('actions_table_row_text_and')}`) : '';
      const lastProducer = producers.slice(-1);

      iconName = 'check square';
      textSetence = `${t('actions_table_row_voteproducer_text_four')} ${allButLastProducers}${andStatement} ${lastProducer}.`;
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
