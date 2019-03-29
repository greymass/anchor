// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Divider, Form, Header, Icon, Segment } from 'semantic-ui-react';
import GlobalAccountDropdownSelect from '../../../../shared/containers/Global/Account/Dropdown/Select';

class PromptControls extends Component<Props> {
  render() {
    const {
      callback,
      chainId,
      onSelect,
      t,
      wallet,
    } = this.props;
    const {
      account,
      authorization,
      mode,
      pubkey,
    } = wallet;
    let callbackField;
    if (callback && callback.url && callback.url !== '') {
      const url = new URL(callback.url);
      callbackField = (
        <Form.Field>
          <label>
            <Icon name="linkify" />
            Callback
          </label>
          <Segment basic size="large" style={{ marginTop: 0 }}>
            <p>{url.origin}</p>
          </Segment>
        </Form.Field>
      );
    }
    return (
      <Form>
        <Header>
          Request Options
          <Header.Subheader>
            Use the controls below to configure how this request will be processed.
          </Header.Subheader>
        </Header>
        <Divider />
        <Form.Field>
          <label>
            <Icon name="user" />
            Signing Account
          </label>
          <GlobalAccountDropdownSelect
            account={account}
            authorization={authorization}
            mode={mode}
            pubkey={pubkey}
            chainId={chainId}
            onSelect={onSelect}
            selection
          />
        </Form.Field>
        <Form.Field>
          <label>
            <Icon name="cogs" />
            Signing Preferences
          </label>
          <Segment style={{ marginTop: 0 }}>
            <Form.Checkbox
              checked
              label="Preview before Broadcasting"
            />
            <Form.Checkbox
              checked
              label="Increase privacy by using anonymous callback proxy"
            />
          </Segment>
        </Form.Field>
        {callbackField}
      </Form>
    );
  }
}

export default translate('global')(PromptControls);
