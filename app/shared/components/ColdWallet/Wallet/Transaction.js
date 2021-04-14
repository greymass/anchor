// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { get } from 'dot-prop-immutable';

import { Button, Container, Header, Message, Segment } from 'semantic-ui-react';

import GlobalTransactionViewActions from '../../Global/Transaction/View/Actions';
import GlobalTransactionViewDetail from '../../Global/Transaction/View/Detail';
import GlobalTransactionViewFull from '../../Global/Transaction/View/Full';
import GlobalUnlock from '../../../../shared/containers/Global/Unlock';

import EOSTransaction from '../../../utils/EOS/Transaction';

const { ipcRenderer } = require('electron');

class ColdWalletTransaction extends Component<Props> {
  props: Props;

  componentWillReceiveProps(nextProps) {
    const { transaction } = this.props;
    if (!transaction.signed && nextProps.transaction.signed) {
      this.saveFile(nextProps.transaction);
    }
  }

  saveFile = (tx = false) => {
    const { settings } = this.props;
    const data = JSON.stringify({
      contracts: tx.contracts,
      transaction: tx.data,
    }, null, 2);
    ipcRenderer.send('saveFile', settings.lastFilePath, data, 'signed');
  }

  clearTransaction = () => {
    this.props.actions.clearTransaction();
  }

  signTransaction = () => {
    const {
      transaction
    } = this.props;
    this.props.actions.signTransaction(transaction.data, transaction.contracts);
  }

  render() {
    const {
      pubkeys,
      settings,
      t,
      transaction,
      wallet,
    } = this.props;
    const {
      data,
      decoded,
      signed
    } = transaction;
    const expiration = get(data, 'transaction.transaction.expiration');
    const { account, authorization } = settings;
    const firstAuth = get(data, 'transaction.transaction.actions.0.authorization.0', {
      actor: 'undefined',
      permission: 'undefined',
    });
    const lastAuth = get(data, 'transaction.transaction.actions.$end.authorization.0', {
      actor: 'undefined',
      permission: 'undefined',
    });
    const isSigned = (
      (String(firstAuth.actor) === String(lastAuth.actor) && signed)
      || (String(firstAuth.actor === 'greymassfuel') && transaction.data.transaction.signatures.length > 1)
    );
    const matchingAuthorization = (account === String(lastAuth.actor)
      && authorization === String(lastAuth.permission));
    const expires = new Date(`${expiration}z`);
    const now = new Date();
    const expired = (now > expires);
    const locked = !pubkeys.unlocked.includes(wallet.pubkey);
    const disabled = (isSigned);
    if (!isSigned && locked && matchingAuthorization) {
      return <GlobalUnlock />;
    }
    return (
      <React.Fragment>
        <Segment attached="top" style={{ marginTop: 0 }}>
          <Header size="large">
            {t('coldwallet_transaction_signature_request_title')}
            <Header.Subheader>
              {t('coldwallet_transaction_signature_request_content')}
            </Header.Subheader>
          </Header>
          <GlobalTransactionViewDetail
            expired={expired}
            signed={isSigned}
            transaction={transaction}
          />
          {(expired)
            ? (
              <Message error>
                {t('coldwallet_transaction_invalid_expired')}
              </Message>
            )
            : false
          }
          {(!matchingAuthorization)
            ? (
              <Message error>
                {t('coldwallet_transaction_invalid_authorization', lastAuth)}
              </Message>
            )
            : false
          }
          <Container fluid textAlign="center">
            {(!isSigned && !locked && matchingAuthorization)
              ? (
                <Button
                  color="orange"
                  content={t('collwallet_transaction_sign_confirm')}
                  disabled={disabled}
                  icon="signup"
                  onClick={this.signTransaction}
                  size="large"
                />
              )
              : false
            }
            {(isSigned)
              ? (
                <Button
                  color="green"
                  content={t('collwallet_transaction_sign_save_again')}
                  icon="save"
                  onClick={() => this.saveFile(transaction)}
                  size="large"
                />
              )
              : false
            }
            <Button
              color="grey"
              content={t('close')}
              icon="x"
              onClick={this.clearTransaction}
              size="large"
            />
          </Container>
        </Segment>
        <Segment attached>
          <GlobalTransactionViewActions
            actions={get(decoded, 'actions', [])}
          />
        </Segment>
        <Segment attached>
          <GlobalTransactionViewFull
            transaction={decoded}
          />
        </Segment>
      </React.Fragment>
    );
  }
}

export default withTranslation('coldwallet')(ColdWalletTransaction);
