// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Icon } from 'semantic-ui-react';

class WalletStatusActionsTableRowRegproxy extends Component<Props> {
  render() {
    const {
      action,
      t
    } = this.props;
    const {
      data
    } = action.action_trace.act;

    let textSentence = t('actions_table_row_regproxy_text_two');

    if (data.isproxy) {
      textSentence = t('actions_table_row_regproxy_text_one');
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
