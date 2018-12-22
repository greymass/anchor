// @flow
import React, { Component } from 'react';
import { Segment, Form, Button, Icon, Dropdown, Message } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import { find, findIndex } from 'lodash';

import GlobalFormFieldAccount from '../../Global/Form/Field/Account';
import GlobalFormFieldGeneric from '../../Global/Form/Field/Generic';
import GlobalFormFieldMemo from '../../Global/Form/Field/Memo';
import GlobalFormMessageError from '../../Global/Form/Message/Error';

class ToolsFormDuplicatingWallet extends Component<Props> {
  state = {
    formError: false,
    submitDisabled: true,
    successfullyDuplicated: false
  };

  componentDidUpdate = (prevProps) => {
    const { actions, blockchains, wallets } = this.props;
    const { wallets: previousWallets } = prevProps;
    const { chainDuplicatingTo } = this.state;

    if (wallets.length > previousWallets.length) {
      const blockchain = chainDuplicatingTo && find(blockchains, { chainId: chainDuplicatingTo });

      this.setState({
        chainDuplicatingTo: null,
        successfullyDuplicated: blockchain && blockchain.name
      }, () => {
        actions.clearSystemState();
      });
    }
  };

  componentWillUnmount = () => {
    const { actions } = this.props;

    actions.clearSystemState();
  };

  onClick = (chainDuplicatingTo) => {
    const { blockchains, duplicatingWallet, actions } = this.props;

    this.setState({
      chainDuplicatingTo,
      submitDisabled: false,
      formError: false,
      successfullyDuplicated: false
    }, () => {
      if (this.walletAlreadyExists()) {
        this.setState({ formError: 'wallet_already_exists', submitDisabled: true });
      }

      const blockchain = chainDuplicatingTo && find(blockchains, { chainId: chainDuplicatingTo });

      blockchain && actions.checkAccountExists(duplicatingWallet.account, blockchain.node);
    });
  };

  walletAlreadyExists = () => {
    const { duplicatingWallet, wallets } = this.props;
    const { account, authorization } = duplicatingWallet;
    const { chainDuplicatingTo } = this.state;

    const index = findIndex(wallets, { account, authorization, chainId: chainDuplicatingTo })

    return index >= 0;
  };

  onSubmit = () => {
    const { actions, duplicatingWallet, settings } = this.props;
    const { chainDuplicatingTo, submitDisabled } = this.state;

    const { authorization, account } = duplicatingWallet;
    const { chainId: chainDuplicatingFrom } = settings;

    if (submitDisabled) {
      return;
    }

    actions.duplicateWallet(account, authorization, chainDuplicatingTo, chainDuplicatingFrom);
  };

  render() {
    const {
      blockchains,
      duplicatingWallet,
      onClose,
      settings,
      system,
      t
    } = this.props;

    const {
      chainDuplicatingTo,
      formError,
      submitDisabled,
      successfullyDuplicated
    } = this.state;

    const options = blockchains
      .filter(b => (
        (
          (settings.displayTestNetworks && b.testnet) || !b.testnet
        )
        && b.chainId !== settings.chainId
      ))
      .sort((a, b) => a.name > b.name)
      .map((b) => {
        return {
          key: b.chainId,
          onClick: () => this.onClick(b.chainId),
          text: `${b.name} ${(b.testnet ? '(TESTNET)' : '')}`,
          value: b.chainId
        };
      });

    let error = formError;
    let disabled = submitDisabled;

    if (system.ACCOUNT_EXISTS_LAST_ACCOUNT === duplicatingWallet.account && system.ACCOUNT_EXISTS === 'FAILURE' ) {
      error = 'account_does_not_exist_on_chain';
      disabled = true;
    } else if (system.ACCOUNT_EXISTS === 'PENDING') {
      disabled = true;
    }

    return (
      <React.Fragment>
        <Message
          warning
          content={
            t('tools_modal_duplicate_warning', { account: duplicatingWallet.account, authorization: duplicatingWallet.authorization })
          }
        />
        {successfullyDuplicated && (
          <Message
            success
            content={
              t('tools_modal_duplicate_success', {
                account: duplicatingWallet.account,
                authorization: duplicatingWallet.authorization,
                blockchainName: successfullyDuplicated
              })
            }
          />
        )}
        <Form
          onKeyPress={this.onKeyPress}
          onSubmit={this.onSubmit}
        >
          <Dropdown
            placeholder={t('tools_modal_duplicate_wallet_select_blockchain')}
            fluid
            selection
            options={options}
            value={chainDuplicatingTo}
            style={{marginBottom: 10}}
          />

          <GlobalFormMessageError
            error={error}
            icon="warning sign"
          />

          <Segment basic clearing>
            <Button
              content={t('tools_form_duplicate_duplicate')}
              color="green"
              disabled={disabled}
              floated="right"
              primary
            />
            <Button
              onClick={onClose}
            >
              <Icon name="x" /> {t('tools_form_duplicate_close')}
            </Button>
          </Segment>
        </Form>
      </React.Fragment>
    );
  }
}

export default translate('tools')(ToolsFormDuplicatingWallet);
