// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Button } from 'semantic-ui-react';

class WalletPanelButtonLock extends Component<Props> {
  render() {
    const { t } = this.props;
    return (
      <Button
        color="purple"
        content={t('wallet_panel_wallet_lock')}
        fluid
        icon="lock"
        onClick={this.props.lockWallet}
      />
    );
  }
}

export default withTranslation('wallet')(WalletPanelButtonLock);
