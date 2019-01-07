// @flow
import React, { Component } from "react";
import {
  Button,
  Divider,
  Header,
  Icon,
  Segment,
  Table
} from "semantic-ui-react";
import { translate } from "react-i18next";

class WalletPanelCrosschainTransferConfirming extends Component<Props> {
  onConfirm = e => {
    const { onConfirm } = this.props;

    onConfirm();
    e.preventDefault();
    return false;
  };

  render() {
    const {
      balances,
      to,
      from,
      memo,
      onBack,
      quantity,
      asset,
      destinationAsset,
      t,
      waiting,
      waitingStarted
    } = this.props;

    const contract = balances.__contracts[asset.toUpperCase()].contract;

    const secondsElapsed = new Date() - waitingStarted;
    const secondsRemaining = parseInt((3000 - secondsElapsed) / 1000, 10) + 1;
    return (
      <Segment basic clearing vertical>
        <Header size="small">
          {t("crosschain_transfer_confirming_title")}
          <Header.Subheader>
            {t("crosschain_transfer_confirming_body_quantity")}
          </Header.Subheader>
          <Header.Subheader className="beos-validation-error">
            <p className="beos-validation-error">{`${t(
              "crosschain_transfer_confirming_eos_network_fee"
            )}`}</p>
          </Header.Subheader>
        </Header>
        <Table compact definition striped>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={4}>{t("crosschain_transfer_label_from")}</Table.Cell>
              <Table.Cell>{from}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{t("crosschain_transfer_label_to", { type: destinationAsset })}</Table.Cell>
              <Table.Cell>{to}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{t("crosschain_transfer_label_memo")}</Table.Cell>
              <Table.Cell>{memo}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{t("crosschain_transfer_label_quantity")}</Table.Cell>
              <Table.Cell>
                {quantity} ({contract})
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Divider />
        <Button
          color="green"
          content={
            waiting ? `${t("confirm")} (${secondsRemaining})` : t("confirm")
          }
          disabled={waiting}
          floated="right"
          onClick={this.onConfirm}
        />
        <Button onClick={onBack}>
          <Icon name="arrow left" /> {t("back")}
        </Button>
      </Segment>
    );
  }
}

export default translate("crosschaintransfer")(
  WalletPanelCrosschainTransferConfirming
);
