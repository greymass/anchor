// @flow
import React, { PureComponent } from 'react';
import { Label, Popup } from 'semantic-ui-react';
import { translate } from 'react-i18next';


export class GlobalFragmentWalletType extends PureComponent<Props> {
  render() {
    const {
      mode,
      t
    } = this.props;
    let color = 'grey';
    let icon = 'disk';
    switch (mode) {
      case 'ledger': {
        color = 'purple';
        icon = 'usb';
        break;
      }
      case 'watch': {
        color = 'grey';
        icon = 'eye';
        break;
      }
      case 'cold': {
        color = 'blue';
        icon = 'snowflake';
        break;
      }
      default: {
        color = 'green';
        icon = 'id card';
      }
    }
    return (
      <Popup
        content={t(`wallet:wallet_mode_explain_${mode}_2`)}
        header={t('tools:tools_wallets_mode')}
        inverted
        trigger={(
          <Label
            basic
            color={color}
            content={t(`global_modal_account_import_${mode}_wallet`)}
            icon={icon}
            position="left center"
          />
        )}
      />
    );
  }
}

export default translate('global')(GlobalFragmentWalletType);
