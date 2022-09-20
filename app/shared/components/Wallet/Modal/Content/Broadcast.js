// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import {
  Button,
  Container,
  Divider,
  Form,
  Header,
  Message,
  Segment,
  Tab
} from 'semantic-ui-react';

import GlobalTransactionViewActions from '../../../Global/Transaction/View/Actions';
import GlobalTransactionViewDetail from '../../../Global/Transaction/View/Detail';
import GlobalTransactionViewFull from '../../../Global/Transaction/View/Full';

const { ipcRenderer } = require('electron');

class WalletModalContentBroadcast extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      importedESR: undefined,
      importedTransaction: false
    };
  }

  importFile = () => {
    const { settings } = this.props;
    ipcRenderer.send('openFile', settings.lastFilePath);
    ipcRenderer.once('openFileData', (event, data) =>
      this.props.actions.setTransaction(data));
  }

  broadcast = () => {
    const {
      actions,
      transaction
    } = this.props;
    const {
      broadcastTransaction
    } = actions;
    broadcastTransaction(transaction.data);
  }

  onInputChange = (e, { value }) => {
    this.setState({
      importedESR: value
    });
  }

  onTextAreaChange = (e, { value }) => {
    this.setState({
      importedTransaction: value
    });
  }

  handleImport = () => {
    const {
      actions
    } = this.props;
    const {
      setTransaction
    } = actions;
    const {
      importedTransaction
    } = this.state;

    if (importedTransaction) {
      setTransaction(importedTransaction);
    }
  }

  handleESR = () => {
    const {
      importedESR
    } = this.state;
    if (!importedESR) return false;
    if (importedESR.startsWith('esr:') || importedESR.startsWith('eosio:') || importedESR.startsWith('esr-anchor:') || importedESR.startsWith('anchorcreate:')) {
      ipcRenderer.send('openUri', importedESR);
    } else {
      ipcRenderer.send('openUri', `esr:${importedESR}`);
    }
  }

  render() {
    const {
      onClose,
      t,
      transaction
    } = this.props;
    const {
      data,
      decoded,
      signed
    } = transaction;
    const {
      importedESR
    } = this.state;
    let actions = [];
    if (data && data.transaction) {
      ({ actions } = data.transaction.transaction);
    }
    if (decoded) {
      ({ actions } = decoded);
    }
    const broadcastable = (signed);
    return (
      <Segment basic>
        {(data)
          ? (
            <React.Fragment>
              <Header>
                {t('broadcast_transaction_confirm_details_title')}
                <Header.Subheader>
                  {t('broadcast_transaction_confirm_details_content')}
                </Header.Subheader>
              </Header>
              <GlobalTransactionViewDetail
                broadcastable={broadcastable}
                signed={signed}
                transaction={transaction}
              />
              <Container textAlign="center">
                {(!signed)
                  ? (
                    <Message error>
                      {t('broadcast_transaction_not_signed')}
                    </Message>
                  )
                  : false
                }
                <Button
                  color="purple"
                  content={t('broadcast_transaction_broadcast')}
                  disabled={!signed}
                  icon="wifi"
                  onClick={this.broadcast}
                  size="large"
                />
                <Button
                  color="grey"
                  content={t('close')}
                  icon="x"
                  onClick={onClose}
                  size="large"
                />
              </Container>
              <Segment>
                <GlobalTransactionViewActions
                  actions={actions}
                />
                <Divider />
                <GlobalTransactionViewFull
                  transaction={decoded || data}
                />
              </Segment>
            </React.Fragment>
          )
          : (
            <Segment basic textAlign="center">
              {(transaction.error) && (
                <Message
                  content={t('broadcast_transaction_invalid_error')}
                  error
                />
              )}
              <Tab
                defaultActiveIndex={0}
                renderActiveOnly={false}
                panes={[
                  {
                    menuItem: {
                      key: 'import_file',
                      icon: 'upload',
                      content: t('broadcast_transaction_import_file_title')
                    },
                    pane: {
                      key: 'import_file',
                      content: (
                        <Segment basic>
                          <Header>
                            <Header.Subheader>
                              {t('broadcast_transaction_import_file_content')}
                            </Header.Subheader>
                          </Header>
                          <Button
                            color="green"
                            content={t('broadcast_transaction_import_file')}
                            icon="upload"
                            onClick={this.importFile}
                            size="large"
                          />
                        </Segment>
                      )
                    }
                  },
                  {
                    menuItem: {
                      key: 'paste',
                      icon: 'paste',
                      content: t('broadcast_transaction_paste_json_title')
                    },
                    pane: {
                      key: 'paste',
                      content: (
                        <Form>
                          <Form.TextArea
                            onChange={this.onTextAreaChange}
                            placeholder={t('broadcast_transaction_import_json_label')}
                          />
                          <Button
                            color="blue"
                            content={t('broadcast_transaction_import_json')}
                            icon="paste"
                            onClick={this.handleImport}
                            size="large"
                          />
                        </Form>
                      )
                    }
                  },
                  {
                    menuItem: {
                      key: 'esr',
                      icon: 'paste',
                      content: t('broadcast_transaction_paste_esr_title')
                    },
                    pane: {
                      key: 'esr',
                      content: (
                        <Form>
                          <Form.Input
                            onChange={this.onInputChange}
                            placeholder={t('broadcast_transaction_import_esr_label')}
                            value={importedESR}
                          />
                          <Button
                            color="blue"
                            content={t('broadcast_transaction_import_esr')}
                            icon="paste"
                            onClick={this.handleESR}
                            size="large"
                          />
                        </Form>
                      )
                    }
                  }
                ]}
              />
              <Message
                content={t('broadcast_transaction_note')}
                icon="info circle"
                warning
              />
            </Segment>
          )
        }
      </Segment>
    );
  }
}

export default withTranslation('transaction')(WalletModalContentBroadcast);
