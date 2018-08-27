// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Segment, Form, Divider, Message, Button } from 'semantic-ui-react';

class ToolsFormRegisterProxy extends Component<Props> {
  props: Props;

  onSubmit = () => {
    const {
      account,
      actions
    } = this.props;

    const {
      regproxy
    } = actions;

    regproxy(account);
  }

  render() {
    const {
      onClose,
      system,
      t
    } = this.props;

    return (
      <Segment
        loading={system.REGPROXY === 'PENDING'}
        style={{ minHeight: '80px' }}
      >
        <div>
          <Message
            icon="info circle"
            info
            content={t('tools_proxy_form_message_about_to_register')}
          />
          <Divider />
          <Form
            onSubmit={this.onSubmit}
          >
            <Button
              content={t('tools_proxy_form_button_cancel')}
              color="grey"
              onClick={onClose}
            />
            <Button
              content={t('tools_proxy_form_button_register')}
              color="green"
              floated="right"
              primary
            />
          </Form>
        </div>
      </Segment>
    );
  }
}


export default translate('tools')(ToolsFormRegisterProxy);
