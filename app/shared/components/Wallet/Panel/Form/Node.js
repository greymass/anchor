// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Form, Input } from 'semantic-ui-react';

export default class WalletPanelFormNode extends Component<Props> {
  render() {
    const {
      onChange,
      validate,
      value
    } = this.props;
    return (
      <I18n ns="wallet">
        {
          (t) => (
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
          )
        }
      </I18n>
    );
  }
}
