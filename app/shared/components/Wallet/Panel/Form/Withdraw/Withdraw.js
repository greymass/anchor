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
import FormMessageError from "../../../../Global/Form/Message/Error";
import EOSContract from "../../../../../utils/EOS/Contract";
import WalletPanelFormWithdrawConfirming from "./Confirming";

class WalletPanelFormWithdraw extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      asset: "PXBTS",
      confirming: false,
      formError: false,
      from: props.settings.account,
      quantity: " PXBTS",
      to: "",
      waiting: false,
      waitingStarted: 0,
      assetAccountTypes: {
        PXBTS: "Bitshares",
        PXBRNP: "Bitshares",
        PXEOS: "Eos"
      },
      storeName: "beos.gateway",
      isValidAccount: false,
      submitDisabled: true
    };
  }

  onConfirm = () => {
    const { from, to, quantity, storeName } = this.state;
    this.setState({ confirming: false }, () => {
      this.props.actions.withdraw(from, to, quantity, storeName);
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

    if (includes(["PXBTS", "PXBRNP"], asset)) {
      const url = "https://blocktrades.syncad.com/api/v2";
      const validationUrl = `${url}/wallets/bitshares2/address-validator?address=${value}`;
      try {
        const response = await fetch(validationUrl);
        const { isValid } = await response.json();
        if (isValid) {
          this.setState({ isValidAccount: true, formError: null });
        } else {
          this.setState({
            isValidAccount: false,
            formError: "invalid_withdraw_account"
          });
        }
      } catch (e) {
        this.setState({
          isValidAccount: false,
          formError: "withdraw_account_validation_failed"
        });
        throw e;
      }
    } else if (asset === "PXEOS") {
      const { blockchains } = this.props;
      const nodeUrl = blockchains
        .filter(({ _id }) => _id === "eos-mainnet")
        .map(({ node }) => node)[0];
      const url = `${nodeUrl}/v1/chain/get_account`;
      try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const { ok } = await fetch(url, {
          method: "POST",
          body: JSON.stringify({ account_name: value }),
          headers
        });
        if (ok) {
          this.setState({ isValidAccount: true, formError: null });
        } else {
          this.setState({
            isValidAccount: false,
            formError: "invalid_withdraw_account"
          });
        }
      } catch (e) {
        this.setState({
          isValidAccount: false,
          formError: "withdraw_account_validation_failed"
        });
        throw e;
      }
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
      assetAccountTypes,
      confirming,
      from,
      to,
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
        loading={system.WITHDRAW === "PENDING"}
        onSubmit={this.onSubmit}
        warning={hasWarnings}
      >
        {confirming ? (
          <WalletPanelFormWithdrawConfirming
            asset={asset}
            balances={balances}
            to={to}
            withdrawAssetType={assetAccountTypes[asset]}
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
              label={t("withdraw_label_to", {
                type: assetAccountTypes[asset]
              })}
              name="to"
              onChange={this.onChange}
              value={to}
            />
            <FormFieldMultiToken
              balances={balances}
              connection={connection}
              icon="x"
              label={t("withdraw_label_token_and_quantity")}
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
                {t("withdraw_header_available")}
              </p>
            )}
            <FormMessageError
              error={formError}
              chainSymbol={assetAccountTypes[asset]}
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

export default translate("beos_withdraw")(WalletPanelFormWithdraw);
