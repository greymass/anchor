import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { List } from 'semantic-ui-react';

class GlobalTransactionMessageErrorAuthorization extends Component<Props> {
  render() {
    const {
      error,
      t
    } = this.props;

    return (
      <div>
        <p>
          {t('global_transaction_message_error_authorization_paragraph')}
        </p>
        <List>
          <List.Item>
            1) {t('global_transaction_message_error_authorization_list_item_one')}
          </List.Item>
          <List.Item>
            2) {t('global_transaction_message_error_authorization_list_item_two')}
          </List.Item>
          <List.Item>
            3) {t('global_transaction_message_error_authorization_list_item_three')}
          </List.Item>
        </List>
      </div>
    );
  }
}

export default translate('global')(GlobalTransactionMessageErrorAuthorization);
