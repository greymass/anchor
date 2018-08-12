// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button } from 'semantic-ui-react';

import WalletPanelModalTransferReceive from '../../Modal/Transfer/Receive';

class WalletPanelButtonTransferReceive extends Component<Props> {
  state = {
    open: false
  }

  onOpen = () => this.setState({ open: true });

  onClose = () => this.setState({ open: false });

  render() {
    const {
      accountName,
      t,
    } = this.props;

    const {
      open
    } = this.state;

    return (
      <WalletPanelModalTransferReceive
        accountName={accountName}
        fluid
        onClose={this.onClose}
        open={open}
        trigger={(
          <Button
            color="blue"
            content={t('transfer_receive_button_cta')}
            fluid
            icon="arrow circle down"
            onClick={this.onOpen}
          />
        )}
      />
    );
  }
}

export default translate('transfer')(WalletPanelButtonTransferReceive);
