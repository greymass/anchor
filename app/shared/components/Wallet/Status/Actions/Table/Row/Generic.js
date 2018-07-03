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

    const parameterTexts = [];

    Object.keys(data).forEach(param => {
      parameterTexts.push(`${param} ${t('actions_table_row_default_text_three')} ${data[param]}`);
    });

    return (
      <div>
        <Icon
          name="exclamation circle"
          size="large"
          style={iconStyle}
        />
        <div>
          {`${t('actions_table_row_default_text_one')} ${name} ${t('actions_table_row_default_text_two')}:`}
          <ul style={{ marginLeft: '30px' }}>
            {parameterTexts.map((parameterText, index) => <li key={index}>{parameterText}</li>)}
          </ul>
        </div>
      </div>
    );
  }
}

export default translate('actions')(WalletStatusActionsTableRowGeneric);

