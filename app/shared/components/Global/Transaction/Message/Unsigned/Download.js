// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Icon, Message, Modal, Segment } from 'semantic-ui-react';
import ReactJson from 'react-json-view';

const { clipboard, ipcRenderer } = require('electron');

class GlobalTransactionMessageUnsignedDownload extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      copiedTransaction: false
    };
  }
  promptSave = () => {
    const { contract, transaction } = this.props;
    const data = JSON.stringify({
      contract,
      transaction
    }, null, 2);
    ipcRenderer.send('saveFile', data);
  }
  onCopy = () => {
    const {
      transaction
    } = this.props;

    this.setState({ copiedTransaction: true }, () => {
      clipboard.writeText(JSON.stringify(transaction));

      setTimeout(() => { this.setState({ copiedTransaction: false }); }, 5000);
    });
  }
  render() {
    const {
      onClose,
      t,
      transaction
    } = this.props;
    const {
      copiedTransaction
    } = this.state;
    return (
      <Segment basic>
        <Header
          content={t('global_transaction_unsigned_title')}
          icon="checkmark"
          size="large"
        />
        <Modal.Content>
          <p>{t('global_transaction_unsigned_message')}</p>
          <Segment padded>
            <Header
              content={t('global_transaction_unsigned_raw_tx')}
            />
            <ReactJson
              collapsed={1}
              displayDataTypes={false}
              displayObjectSize={false}
              iconStyle="square"
              name={null}
              src={transaction}
              style={{ padding: '1em' }}
              theme="harmonic"
            />
            <Segment basic textAlign="center">
              <Button
                color="blue"
                content={t('global_transaction_unsigned_save_file')}
                icon="download"
                onClick={this.promptSave}
                style={{ marginBottom: '1em' }}
              />
              <Button
                color="teal"
                content={t('global_transaction_unsigned_copy_to_clipboard')}
                icon={(copiedTransaction) ? "circle check" : "clipboard"}
                onClick={this.onCopy}
              />
              {(copiedTransaction) && (
                <Message
                  color="teal"
                  content={t('global_transaction_unsigned_copied')}
                  icon="check"
                />
              )}
            </Segment>
          </Segment>
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
      </Segment>

    );
  }
}

export default translate('global')(GlobalTransactionMessageUnsignedDownload);
