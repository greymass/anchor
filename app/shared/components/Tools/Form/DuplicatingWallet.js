// @flow
import React, { Component } from 'react';
import { Segment, Form, Button, Icon, Dropdown } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import { findIndex } from 'lodash';

import GlobalFormFieldAccount from '../../Global/Form/Field/Account';
import GlobalFormFieldGeneric from '../../Global/Form/Field/Generic';
import GlobalFormFieldMemo from '../../Global/Form/Field/Memo';
import GlobalFormMessageError from '../../Global/Form/Message/Error';

class ToolsFormDuplicatingWallet extends Component<Props> {
  state = {
    submitDisabled: true,
    formError: false,
  };
  
  onClick = (chainId) => {
    const { duplicatingWallet, actions } = this.props;

    this.setState({chainId, submitDisabled: false, formError: false}, () => {
      if (this.walletAlreadyExists()) {
        this.setState({ formError: 'wallet_already_exists', submitDisabled: true })
      }
    });
  }

  walletAlreadyExists = () => {
    const { duplicatingWallet, wallets } = this.props;
    const { account, authorization } = duplicatingWallet;
    const { chainId } = this.state;

    const index = findIndex(wallets, { account, authorization, chainId })

    return index >= 0;
  }

  onSubmit = () => {
    const { duplicatingWallet } = this.props;
    const { chainId, submitDisabled } = this.state;

    if (submitDisabled) {
      return;
    }
    actions.duplicateWallet(duplicatingWallet, chainId)
  }

  render() {
    const {
      blockchains,
      onClose,
      settings,
      t
    } = this.props;

    const {
      chainId,
      formError,
      submitDisabled
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

    return (
      <Form
        onKeyPress={this.onKeyPress}
        onSubmit={this.onSubmit}
      >
        <Dropdown
          placeholder={t('tools_modal_duplicate_account_select_blockchain')}
          fluid
          selection
          options={options}
          value={chainId}
          style={{marginBottom: 10}}
        />

        <GlobalFormMessageError
          error={formError}
          icon="warning sign"
        />

        <Segment basic clearing>
          <Button
            content={t('tools_form_duplicate_duplicate')}
            color="green"
            disabled={submitDisabled}
            floated="right"
            primary
          />
          <Button
            onClick={onClose}
          >
            <Icon name="x" /> {t('tools_form_duplicate_cancel')}
          </Button>
        </Segment>
      </Form>
    );
  }
}

export default translate('tools')(ToolsFormDuplicatingWallet);
