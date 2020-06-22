// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Form, Input } from 'semantic-ui-react';

class WalletPanelKey extends Component<Props> {
  render() {
    const {
      onChange,
      t,
      validate,
      value,
    } = this.props;
    return (
      <Form.Field
        autoFocus
        control={Input}
        fluid
        icon={(validate.NODE === 'SUCCESS' && validate.ACCOUNT === 'SUCCESS' && validate.KEY === 'SUCCESS') ? 'checkmark' : 'x'}
        label={t('wallet_panel_form_key')}
        loading={(validate.KEY === 'PENDING')}
        name="key"
        onChange={onChange}
        defaultValue={value}
        type="password"
      />
    );
  }
}

export default withTranslation('wallet')(WalletPanelKey);
