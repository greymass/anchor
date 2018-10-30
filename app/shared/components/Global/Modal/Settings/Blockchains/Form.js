// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Container, Form, Input } from 'semantic-ui-react';

class GlobalModalSettingsBlockchainsForm extends Component<Props> {
  render() {
    const {
      onChange,
      onSubmit,
      ref,
      t,
      values
    } = this.props;
    const {
      blockchain,
      tokenSymbol,
      node
    } = values;

    return (
      <Form
        onSubmit={onSubmit}
        ref={ref}
      >
        <Form.Field
          autoFocus
          control={Input}
          fluid
          label={t('global_modal_settings_blockchain_form_blockchain_label')}
          name="blockchain"
          onChange={onChange}
          placeholder={t('global_modal_settings_blockchain_form_blockchain_placeholder', {tokenSymbol:tokenSymbol})}
          type="text"
          value={blockchain}
        />
        <Form.Field
          control={Input}
          fluid
          label={t('global_modal_settings_blockchain_form_prefix_label')}
          name="tokenSymbol"
          onChange={onChange}
          placeholder={t('global_modal_settings_blockchain_form_prefix_placeholder', {tokenSymbol:tokenSymbol})}
          type="text"
          value={tokenSymbol}
        />
        <Form.Field
          control={Input}
          fluid
          label={t('global_modal_settings_blockchain_form_node_label')}
          name="node"
          onChange={onChange}
          placeholder={t('global_modal_settings_blockchain_form_node_placeholder')}
          type="text"
          value={node}
        />
        <Container textAlign="center">
          <Button
            color="green"
            content={t('global_modal_settings_blockchain_add')}
          />
        </Container>
      </Form>
    );
  }
}

export default translate('global')(GlobalModalSettingsBlockchainsForm);
