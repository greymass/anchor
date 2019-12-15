// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Grid, Header, Icon, Message, Modal, Segment, Tab } from 'semantic-ui-react';
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
            <Grid>
              <Grid.Row>
                <Grid.Column width={8}>
                  <Header
                    content="Sign with Mobile Wallet"
                    subheader="Scan this with an EEP-7 compatible wallet to sign this transaction."
                  />
                  <canvas ref={(node) => { this.canvas = node; }} />
                </Grid.Column>
                <Grid.Column width={8}>
                  <Header
                    content="Export this Transaction"
                    subheader="Use one of the options below to export this unsigned transaction for use in another program or on another computer."
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
                  {(copiedTransaction) && (
                    <Message
                      color="teal"
                      content={t('global_transaction_unsigned_copied')}
                      icon="check"
                    />
                  )}
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
          content={t('global_transaction_unsigned_title_r2')}
          icon="qrcode"
          size="large"
          subheader={t('global_transaction_unsigned_message_r2')}
        />
        <Modal.Content>
          <Tab
            onTabChange={this.onTabChange}
            panes={panes}
          />
          <Message
            icon
            size="large"
            warning
          >
            <Icon
              name="info circle"
            />
            <Message.Content>
              <Message.Header>{t('global_transaction_unsigned_warning_title')}</Message.Header>
              {t('global_transaction_unsigned_warning_message')}
            </Message.Content>
          </Message>
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
