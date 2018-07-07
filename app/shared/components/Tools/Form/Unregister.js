// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Segment, Form, Divider, Message, Button } from 'semantic-ui-react';

class ToolsFormUnregister extends Component<Props> {
  onSubmit = () => {
    const {
      account,
      actions
    } = this.props;

    const {
      unregproxy
    } = actions;

    unregproxy(account);
  }

  render() {
    const {
      onClose,
      system,
      t
    } = this.props;

    return (
      <Segment
        loading={system.UNREGPROXY === 'PENDING'}
        style={{ minHeight: '80px' }}
      >
        <div>
          <Message
            icon="info circle"
            info
            content={t('tools_proxy_form_message_about_to_unregister')}
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
              content={t('tools_proxy_form_button_unregister')}
              color="red"
              floated="right"
            />
          </Form>
        </div>
      </Segment>
    );
  }
}


export default translate('tools')(ToolsFormUnregister);
