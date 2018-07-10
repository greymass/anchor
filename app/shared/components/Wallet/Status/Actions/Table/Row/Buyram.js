// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Icon } from 'semantic-ui-react';

import GlobalDataBytes from '../../../../../Global/Data/Bytes';

class WalletStatusActionsTableRowBuyram extends Component<Props> {
  render() {
    const {
      action,
      t
    } = this.props;
    const {
      data
    } = action.action_trace.act;

    return (
      <React.Fragment>
        <Icon
          floated="left"
          name="database"
          size="large"
        />
        {t('actions_table_row_buyrambytes_text_one')}
        {(data.quant) ? (
          <span>
            {`${data.quant} `}
          </span>
        ) : (
          <GlobalDataBytes
            bytes={data.bytes}
          />
        )}
        {t('actions_table_row_of_ram')}
      </React.Fragment>
    );
  }
}

export default translate('actions')(WalletStatusActionsTableRowBuyram);
