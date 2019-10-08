// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Form, Header, Modal } from 'semantic-ui-react';
import GlobalDangerLink from '../../../shared/containers/Global/DangerLink';

const { clipboard } = require('electron');

class PromptShare extends Component<Props> {
  onCopyLink = () => clipboard.writeText(this.props.uri)
  makeLink = () => {
    const { uri } = this.props;
    const uriParts = uri.split(':');
    return `https://eosio.to/${uriParts[1]}`;
  }
  render() {
    const {
      onClose,
      open,
      t,
      uri
    } = this.props;
    if (!uri) return false;
    const link = this.makeLink();
    return (
      <Modal
        closeIcon
        onClose={onClose}
        open={open}
        size="small"
        scrolling
      >
        <Modal.Header>Signing Request URI (EEP-6)</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Sharing a Signing Request</Header>
            <p>A benefit of using an EEP-6 URI link is that you can share the link with those you trust and verify what actions it will perform before signing.</p>
            <Header size="small">Using EOSIO.TO</Header>
            <p>You can open this signing request using https://eosio.to service with the button below to verify the contents of the URI. This link can also safely be shared with others to view the contents of the transaction.</p>
            <GlobalDangerLink
              content={(
                <Button
                  basic
                  color="blue"
                  content="Open Link to EOSIO.TO"
                  icon="external"
                />
              )}
              link={link}
            />
            <Header size="small">Using a raw URI</Header>
            <p>The text box below contains the raw URI of this transaction. This URI can be shared and used within a variety of applications.</p>
            <Form>
              <Form.TextArea
                style={{
                  wordBreak: 'break-all'
                }}
                value={uri}
              />
              <Button
                basic
                color="blue"
                content="Copy to Clipboard"
                icon="clipboard"
                onClick={this.onCopyLink}
              />
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default translate('global')(PromptShare);
