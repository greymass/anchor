import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { List } from 'semantic-ui-react';
import ReactJson from 'react-json-view';

class GlobalTransactionMessageErrorAuthorization extends Component<Props> {
  render() {
    const {
      error,
      t
    } = this.props;

    const colorStyle = { color: '#3C3A3B' };

    return (
      <div>
        <p>
          {t('global_transaction_message_error_authorization_paragraph')}
        </p>
        <hr style={colorStyle} />
        <List style={colorStyle} ordered>
          <List.Item>
            {t('global_transaction_message_error_authorization_list_item_one')}
          </List.Item>
          <List.Item>
            {t('global_transaction_message_error_authorization_list_item_two')}
          </List.Item>
          <List.Item>
            {t('global_transaction_message_error_authorization_list_item_three')}
          </List.Item>
        </List>
        <hr style={colorStyle} />
        <p style={colorStyle}>*&nbsp;{t('global_transaction_message_error_authorization_note')}</p>
        {(typeof error === 'object') ? (
          <ReactJson
            collapsed={2}
            displayDataTypes={false}
            displayObjectSize={false}
            iconStyle="square"
            name={null}
            src={error}
            style={{ padding: '1em' }}
          />
        ) : ''}
      </div>
    );
  }
}

export default translate('global')(GlobalTransactionMessageErrorAuthorization);
