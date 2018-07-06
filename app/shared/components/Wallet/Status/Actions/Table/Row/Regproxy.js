// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Icon } from 'semantic-ui-react';

class WalletStatusActionsTableRowRegproxy extends Component<Props> {
  render() {
    const {
      data,
      t
    } = this.props;

    let textSentence = t('actions_table_row_regproxy_text_one');

    if (data) {
      textSentence = t('actions_table_row_regproxy_text_two');
    }

    return (
      <React.Fragment>
        <Icon
          floated="left"
          name="registered"
          size="large"
        />
        { textSentence }
      </React.Fragment>
    );
  }
}

export default translate('actions')(WalletStatusActionsTableRowRegproxy);
