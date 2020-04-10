// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Segment } from 'semantic-ui-react';

import WalletPanelFormModalConfirm from './Modal/Confirm';

class WalletPanelFormAccount extends Component<Props> {
  render() {
    const {
      confirming,
      encryptWallet,
      onCancel,
      onConfirm,
      onSubmit,
      password,
      t,
      validUser,
    } = this.props;
    return (encryptWallet)
      ? (
        <Segment>
          <p>
            {t('wallet_panel_form_will_save')}
          </p>
          <WalletPanelFormModalConfirm
            disabled={!validUser}
            open={confirming}
            onCancel={onCancel}
            onConfirm={onConfirm}
            onSubmit={onSubmit}
            password={password}
          />
        </Segment>
      )
      : (
        <Segment>
          <p>
            {t('wallet_panel_form_not_saved')}
          </p>
          <Button
            disabled={!validUser}
            content={t('wallet_panel_form_use_temporary')}
            color="green"
            fluid
          />
        </Segment>
      );
  }
}

export default withTranslation('wallet')(WalletPanelFormAccount);
