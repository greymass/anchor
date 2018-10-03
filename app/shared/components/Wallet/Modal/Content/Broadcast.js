// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Container, Divider, Header, Message, Segment, TextArea } from 'semantic-ui-react';

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

  handleImport() {
    const {
      importedTransaction
    } = this.state;

    if (importedTransaction) {
      ipcRenderer.send('saveFile', importedTransaction);
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
                <Button
                  color="green"
                  content={t('broadcast_transaction_import_file')}
                  onClick={this.importFile}
                  size="large"
                />
                <hr />
                <TextArea
                  placeholder={t('broadcast_transaction_import_label')}
                  onChange={this.onTextAreaChange}
                />
                <Button
                  color="green"
                  content={t('broadcast_transaction_import')}
                  icon="arrow-down"
                  onClick={this.handleImport}
                  size="large"
                />
                <hr />
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
            <Header>
              {t('broadcast_transaction_no_details_title')}
              <Header.Subheader>
                {t('broadcast_transaction_no_details_content')}
              </Header.Subheader>
            </Header>
          )
        }
      </Segment>
    );
  }
}

export default translate('transaction')(WalletModalContentBroadcast);
