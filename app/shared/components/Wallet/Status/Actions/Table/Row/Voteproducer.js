// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Icon } from 'semantic-ui-react';

class WalletStatusActionsTableRowVoteproducer extends Component<Props> {
  render() {
    const {
      data,
      t
    } = this.props;

    const {
      producers
    } = data;

    const iconStyle = {
      margin: '5px',
      marginRight: '20px',
      float: 'left',
      verticalAlign: 'top'
    };

    const allButLastProducers = producers.slice(0, producers.length - 1).join(', ');

    const andStatement = (producers.length > 1) ? (` ${t('actions_table_row_text_and')}`) : '';

    const lastProducer = producers.slice(-1);

    return (
      <div>
        <Icon
          name="check square"
          size="large"
          style={iconStyle}
        />
        <div>
          { `${t('actions_table_row_voteproducer_text')} ${allButLastProducers}${andStatement} ${lastProducer}.` }
        </div>
      </div>
    );
  }
}

export default translate('actions')(WalletStatusActionsTableRowVoteproducer);
