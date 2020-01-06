// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Form, Grid, Header, Modal, Segment } from 'semantic-ui-react';
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
        size="wide"
        style={{ marginTop: '110px' }}
        scrolling
      >
        <Modal.Header>EOSIO Signing Request (EEP-7)</Modal.Header>
        <Modal.Content>
          <Header>
            <Header.Subheader>
              A benefit of using the <strong>EOSIO Signing Request</strong> protocol is that you can share the link with those you trust and verify what actions it will perform before signing.
            </Header.Subheader>
          </Header>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header attached="top" size="small">
                  Share Request as a Link
                </Header>
                <Segment attached="bottom">
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
                  <Button
                    color="blue"
                    content="Copy to Clipboard"
                    fluid
                    icon="clipboard"
                    onClick={this.onCopyLink}
                    style={{ marginTop: '1em' }}
                  />
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Header attached="top" size="small">View/Share using EOSIO.TO</Header>
                <Segment attached="bottom">
                  <p>You can also open this signing request using the service found at https://eosio.to using the button below. This site provides a secondary source of information to verify the contents of the URI. This link can also safely be shared with others to view the contents of the transaction.</p>
                  <GlobalDangerLink
                    content={(
                      <Button
                        color="blue"
                        content="Open Link to EOSIO.TO"
                        fluid
                        icon="external"
                      />
                    )}
                    link={link}
                  />
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
      </Modal>
    );
  }
}

export default translate('global')(PromptShare);
