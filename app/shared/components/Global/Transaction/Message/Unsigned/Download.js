// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Divider, Grid, Header, Icon, Message, Modal, Segment, Tab } from 'semantic-ui-react';
import ReactJson from 'react-json-view';
import QRCode from 'qrcode';

import GlobalDangerLink from '../../../../../containers/Global/DangerLink';

const zlib = require('zlib');
const { clipboard, ipcRenderer } = require('electron');
const { SigningRequest } = require('eosio-signing-request');


const opts = {
  zlib: {
    deflateRaw: (data) => new Uint8Array(zlib.deflateRawSync(Buffer.from(data))),
    inflateRaw: (data) => new Uint8Array(zlib.inflateRawSync(Buffer.from(data))),
  },
};

export class GlobalTransactionMessageUnsignedDownload extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      copiedTransaction: false,
      uri: false
    };
  }
  componentDidMount() {
    this.renderQRCode();
  }
  async renderQRCode() {
    const { settings, transaction } = this.props;
    const { chainId } = settings;
    const req = await SigningRequest.create({
      chainId,
      transaction: transaction.transaction.transaction
    }, opts);
    const uri = req.encode();
    this.setState({ uri })
    const { canvas } = this;
    QRCode.toCanvas(canvas, uri, {
      scale: 6
    }, (error) => {
      if (error) console.error(error);
    });
  }
  promptSave = () => {
    const { contract, settings, transaction } = this.props;
    const data = JSON.stringify({
      contract,
      transaction
    }, null, 2);
    ipcRenderer.send('saveFile', settings.lastFilePath, data);
  };
  onCopy = () => {
    const {
      transaction
    } = this.props;

    this.setState({ copiedTransaction: true }, () => {
      clipboard.writeText(JSON.stringify(transaction));
      setTimeout(() => { this.setState({ copiedTransaction: false }); }, 5000);
    });
  };
  onTabChange = (e, { activeIndex }) => {
    if (activeIndex === 0) {
      this.renderQRCode();
    }
  }
  render() {
    const {
      onClose,
      t,
      transaction
    } = this.props;
    const {
      copiedTransaction,
      uri
    } = this.state;
    let uriParts = []
    if (uri) {
      uriParts = uri.split('://')
    }
    const panes = [
      {
        menuItem: 'Signing',
        render: () => (
          <Tab.Pane>
            <Grid divided relaxed>
              <Grid.Row>
                <Grid.Column width={6}>
                  <Header
                    content="Export this Transaction"
                    subheader="Use one of the following options to export this unsigned transaction for use in another program or on another computer."
                    textAlign="center"
                  />
                  <Button
                    basic
                    color="blue"
                    content="Save as File"
                    fluid
                    icon="download"
                    onClick={this.promptSave}
                    style={{ marginBottom: '1em' }}
                  />
                  <Button
                    basic
                    color="blue"
                    content="Copy to Clipboard"
                    fluid
                    icon={(copiedTransaction) ? 'circle check' : 'clipboard'}
                    onClick={this.onCopy}
                    style={{ marginBottom: '1em' }}
                  />
                  <GlobalDangerLink
                    content={(
                      <Button
                        basic
                        color="blue"
                        content="View ESR Link"
                        fluid
                        icon="external"
                      />
                    )}
                    link={`https://eosio.to/${uriParts[1]}`}
                  />
                  <Message
                    icon
                    textAlign="left"
                  >
                    <Message.Content>
                      <Message.Header>
                        Expiration of Transactions
                      </Message.Header>
                      Every transaction has an expiration date, after which time even if signed will not be accepted by the blockchain. To successfully complete this transaction, ensure it is signed within the given amount of time.
                    </Message.Content>
                  </Message>
                  {(copiedTransaction) && (
                    <Message
                      color="teal"
                      content={t('global_transaction_unsigned_copied')}
                      icon="check"
                    />
                  )}
                </Grid.Column>
                <Grid.Column width={10} textAlign="center">
                  <canvas ref={(node) => { this.canvas = node; }} />
                  <Header
                    content="Sign with a Mobile Wallet"
                    style={{ marginTop: 0 }}
                    subheader="Scan this QR Code with an ESR/EEP-7 compatible wallet to sign and complete this transaction."
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Transaction',
        render: () => (
          <Tab.Pane>
            <ReactJson
              collapsed={4}
              displayDataTypes={false}
              displayObjectSize={false}
              iconStyle="square"
              name={null}
              src={transaction}
              style={{ padding: '1em' }}
              theme="harmonic"
            />
          </Tab.Pane>
        )
      },
    ];
    return (
      <React.Fragment>
        <Header
          content="Unsigned Transaction"
          icon="qrcode"
          subheader="This read only wallet has created an unsigned transaction which needs to be signed by the appropriate account before broadcasting to the blockchain."
        />
        <Modal.Content>
          <Tab
            onTabChange={this.onTabChange}
            panes={panes}
          />
        </Modal.Content>
        <Modal.Actions>
          <Segment basic clearing>
            <Button color="green" floated="right" onClick={onClose}>
              <Icon name="checkmark" /> {t('close')}
            </Button>
          </Segment>
        </Modal.Actions>
      </React.Fragment>
    );
  }
}

export default translate('global')(GlobalTransactionMessageUnsignedDownload);
