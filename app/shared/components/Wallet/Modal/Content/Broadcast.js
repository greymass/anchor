// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
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
      importedTransaction: false
    };
  }

  importFile = () => {
    ipcRenderer.send('openFile');
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

  render() {
    const {
      onClose,
      t,
      transaction
    } = this.props;
    const {
      data,
      signed
    } = transaction;
    let actions = [];
    if (data) {
      ({ actions } = data.transaction.transaction);
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
                  transaction={data}
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

export default translate('transaction')(WalletModalContentBroadcast);
