// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Header, Icon, Segment } from 'semantic-ui-react';

class GlobalTransactionMessageHardwareLedger extends Component<Props> {
  render() {
    const {
      t
    } = this.props;
    return (
      <Segment basic>
        <Header icon size="large" textAlign="center">
          <Icon
            loading
            name="circle notched"
          />
          {t('global_transaction_hardware_ledger_awaiting_device_header')}
          <Header.Subheader
            content={t('global_transaction_hardware_ledger_awaiting_device_subheader')}
          />
        </Header>
      </Segment>
    );
  }
}

export default translate('global')(GlobalTransactionMessageHardwareLedger);
