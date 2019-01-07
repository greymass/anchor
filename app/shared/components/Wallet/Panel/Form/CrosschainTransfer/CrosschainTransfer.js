// @flow
import React, { Component } from "react";
import { translate } from "react-i18next";
import {
  Form,
  Segment,
  Button,
  Divider,
  Icon,
  Message
} from "semantic-ui-react";
import { debounce, findIndex, includes } from "lodash";

import GlobalFormFieldAccount from "../../../../Global/Form/Field/Account";
import FormFieldMultiToken from "../../../../Global/Form/Field/MultiToken";
import GlobalFormFieldMemo from "../../../../Global/Form/Field/Memo";
import FormMessageError from "../../../../Global/Form/Message/Error";
import EOSContract from "../../../../../utils/EOS/Contract";
import WalletPanelCrosschainTransferConfirming from "./Confirming";

class WalletPanelCrosschainTransfer extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      asset: "EOS",
      confirming: false,
      formError: false,
      from: props.settings.account,
      quantity: " EOS",
      to: "",
      memo: "",
      destinationAsset: "BEOS",
      waiting: false,
      waitingStarted: 0,
      storeName: "beos.gateway",
      isValidAccount: false,
      submitDisabled: true
    };
  }

  onConfirm = () => {
    const { from, to, quantity, storeName, asset, memo } = this.state;
    this.setState({ confirming: false }, () => {
      const newMemo = `pxeos:${to}:${memo}:`
      this.props.actions.transfer(from, 'beos.gateway', quantity, newMemo, asset);
      this.setState({
        to: "",
        quantity: ""
      })
    });
  };

  onSubmit = () => {
    this.setState({
      confirming: true,
      waiting: true,
      waitingStarted: new Date()
    });
    const tick = setInterval(this.tick, 250);
    // Make the user wait 3 seconds before they can confirm
    setTimeout(() => {
      clearInterval(tick);
      this.setState({
        waiting: false
      });
    }, 3000);
  };

  tick = () => this.setState({ waiting: true });

  onCancel = e => {
    this.setState({
      confirming: false,
      waiting: false
    });
    e.preventDefault();
    return false;
  };

  onBack = () => {
    this.setState({ confirming: false });
  };

  validateAccount = debounce(async (value, asset) => {
    this.setState({ formError: null });

    if (!value) {
      return;
    }

    const url = "https://blocktrades.syncad.com/api/v2";
    const validationUrl = `${url}/wallets/beos/address-validator?address=${value}`;
    try {
      const response = await fetch(validationUrl);
      const { isValid } = await response.json();
      if (isValid) {
        this.setState({ isValidAccount: true, formError: null });
      } else {
        this.setState({
          isValidAccount: false,
        formError: "account_does_not_exist"
        });
      }
    } catch (e) {
      this.setState({
        isValidAccount: false,
        formError: "crosschain_transfer_account_validation_failed"
      });
      throw e;
    }
  }, 150);

  onChange = (e, { name, value, valid }) => {
    const { asset, formError } = this.state;
    const { balances, settings: { account } } = this.props;
    const newState = { [name]: value };

    if (name === "to") {
      this.validateAccount(value, asset);
    }

    if (name === "quantity") {
      const [quantity, asset] = value.split(" ");
      newState.asset = asset;
      if (parseFloat(value) > balances[account][asset]) {
        this.setState({ formError: 'insufficient_balance' });
      } else {
        this.setState({ formError: null });
      }
    }

    this.setState(newState);
  };

  isSubmitDisabled = () => {
    const { asset, formError, isValidAccount, quantity, to } = this.state;
    const { balances, settings: { account } } = this.props;
    const [value, symbol] = quantity.split(" ");
    const balance = balances[account];

    return !quantity ||
      !value ||
      !parseFloat(value) ||
      value > balance[symbol] ||
      !asset ||
      !to ||
      !!formError ||
      !isValidAccount
      ? true
      : false;
  };

  render() {
    const {
      asset,
      confirming,
      destinationAsset,
      from,
      to,
      memo,
      quantity,
      formError,
      submitDisabled,
      waiting,
      waitingStarted
    } = this.state;
    const { balances, connection, settings, system, t, onClose } = this.props;

    const balance = balances[settings.account];

    let hasWarnings = null;

    return (
      <Form
        loading={system.TRANSFER === "PENDING"}
        onSubmit={this.onSubmit}
        warning={hasWarnings}
      >
        {confirming ? (
          <WalletPanelCrosschainTransferConfirming
            asset={asset}
            balances={balances}
            to={to}
            memo={memo}
            from={from}
            onBack={this.onBack}
            onConfirm={this.onConfirm}
            quantity={quantity}
            waiting={waiting}
            waitingStarted={waitingStarted}
          />
        ) : (
          <Segment basic clearing>
            <GlobalFormFieldAccount
              autoFocus
              contacts={settings.contacts}
              fluid
              label={t("crosschain_transfer_label_to", {
                type: destinationAsset
              })}
              name="to"
              onChange={this.onChange}
              value={to}
            />
            <FormFieldMultiToken
              balances={balances}
              connection={connection}
              icon="x"
              label={t("crosschain_transfer_label_token_and_quantity")}
              loading={false}
              maximum={balance[asset]}
              name="quantity"
              onChange={this.onChange}
              settings={settings}
              value={quantity}
            />
            {asset && (
              <p>
                {(balance[asset] && balance[asset].toFixed(4)) || "0.0000"}
                &nbsp;
                {asset}
                &nbsp;
                {t("crosschain_transfer_header_available")}
              </p>
            )}
            <GlobalFormFieldMemo
                icon="x"
                label={t('crosschain_transfer_label_memo')}
                loading={false}
                name="memo"
                onChange={this.onChange}
                value={memo}
              />
            <FormMessageError
              error={formError}
              chainSymbol={asset}
            />
            <Divider />
            <Button
              type="submit"
              content={t("confirm")}
              disabled={this.isSubmitDisabled()}
              floated="right"
              primary
            />
            <Button onClick={onClose}>
              <Icon name="x" /> {t("cancel")}
            </Button>
          </Segment>
        )}
      </Form>
    );
  }
}

export default translate("crosschaintransfer")(WalletPanelCrosschainTransfer);
