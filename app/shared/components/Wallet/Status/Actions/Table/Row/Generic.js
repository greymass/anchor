// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Icon } from 'semantic-ui-react';

class WalletStatusActionsTableRowGeneric extends Component<Props> {
  render() {
    const {
      name,
      data,
      t
    } = this.props;

    const iconStyle = {
      margin: '5px',
      marginRight: '20px',
      float: 'left',
      verticalAlign: 'top'
    };

    return (
      <div>
        <Icon
          name="arrow circle up"
          size="large"
          style={iconStyle}
        />
        <div>
          {`${t('actions_table_row_default_text_one')} ${name} ${t('actions_table_row_default_text_two')}: ${data.join(' | ')}.`}
        </div>
      </div>
    );
  }
}

export default translate('actions')(WalletStatusActionsTableRowGeneric);

