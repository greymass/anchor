// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Form, Input } from 'semantic-ui-react';

class WalletPanelFormNode extends Component<Props> {
  render() {
    const {
      onChange,
      t,
      validate,
      value
    } = this.props;
    return (
      <Form.Field
        control={Input}
        fluid
        icon={(validate.NODE === 'SUCCESS') ? 'checkmark' : 'x'}
        label={t('wallet_panel_form_node')}
        loading={(validate.NODE === 'PENDING')}
        name="node"
        onChange={onChange}
        defaultValue={value}
      />
    );
  }
}

export default withTranslation('wallet')(WalletPanelFormNode);
