// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Form, Grid, Header, Message, Modal, Segment } from 'semantic-ui-react';
import GlobalDangerLink from '../../../shared/containers/Global/DangerLink';

const { clipboard } = require('electron');

class PromptShare extends Component<Props> {
  onCopyLink = () => clipboard.writeText(this.props.uri)
  makeLink = () => {
    const { uri } = this.props;
    const uriParts = uri.split(':');
    return `https://eosio.to/${uriParts[1].replace('//', '')}`;
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
        centered={false}
        closeIcon
        onClose={onClose}
        open={open}
        style={{ marginTop: '130px', marginBottom: '110px' }}
      >
        <Modal.Header>Share this Signing Request</Modal.Header>
        <Segment
          as={Modal.Content}
          padded="very"
          scrolling
          style={{ marginTop: 0 }}
        >
          <Grid>
            <Grid.Row columns={1}>
              <Grid.Column>
                <Message
                  header="Share with caution"
                  content="Use the following tools to share this signing request with those you trust in the event you have questions about what you are being asked to sign. These requests may contain metadata and information related to your login sessions with other applications."
                  icon="exclamation sign"
                  size="small"
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column textAlign="center">
                <GlobalDangerLink
                  content={(
                    <Button
                      color="blue"
                      content="Open Link to EOSIO.TO"
                      icon="external"
                    />
                  )}
                  link={link}
                />
                <Header>
                  View on EOSIO.to
                </Header>
                <p>
                  <p>
                    EOSIO.to is a service that creates sharable website links for signing requests. Opening this signing request on EOSIO.to will display the transaction data for this request and allow you to share it with others.
                  </p>
                </p>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Button
                  color="blue"
                  content="Copy Link to Clipboard"
                  icon="clipboard"
                  onClick={this.onCopyLink}
                />
                <Header>
                  Share with a link
                </Header>
                <p>
                  This text box contains the raw link (URI) of this specific transaction. You can share this link with other users to ask questions or to just share the transaction.
                </p>
                <Form>
                  <Form.TextArea
                    style={{
                      wordBreak: 'break-all'
                    }}
                    value={uri}
                  />
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Modal>
    );
  }
}

export default withTranslation('global')(PromptShare);
