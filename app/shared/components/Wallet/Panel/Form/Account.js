// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Form, Input } from 'semantic-ui-react';
import WalletModalAccountLookup from '../../Modal/Account/Lookup';

class WalletPanelFormAccount extends Component<Props> {
  render() {
    const {
      actions,
      accounts,
      onChange,
      t,
      validate,
      value
    } = this.props;
    return (
      <Form.Field
        control={Input}
        fluid
        icon={(validate.NODE === 'SUCCESS' && validate.ACCOUNT === 'SUCCESS') ? 'checkmark' : 'x'}
        label={(
          <span>
            <span style={{ float: 'right' }}>
              <WalletModalAccountLookup
                actions={actions}
                accounts={accounts}
                validate={validate}
              />
            </span>
            {t('wallet_panel_form_account')}
          </span>
        )}
        loading={(validate.ACCOUNT === 'PENDING')}
        name="account"
        onChange={onChange}
        defaultValue={value}
      />
    );
  }
}

export default withTranslation('wallet')(WalletPanelFormAccount);
