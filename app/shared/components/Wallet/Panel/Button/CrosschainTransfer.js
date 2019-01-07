// @flow
import React, { Component } from "react";
import { translate } from "react-i18next";

import GlobalTransactionModal from "../../../Global/Transaction/Modal";
import WalletPanelCrosschainTransfer from "../Form/CrosschainTransfer/CrosschainTransfer";

type Props = {
  actions: {
    clearSystemState: () => void
  },
  connection: {},
  balances: {},
  blockExplorers: {},
  blockchains: {},
  settings: {},
  system: {},
  t: () => void
};

class WalletPanelButtonCrosschainTransfer extends Component<Props> {
  props: Props;

  render() {
    const {
      actions,
      blockchains,
      blockExplorers,
      connection,
      balances,
      settings,
      system,
      t
    } = this.props;

    return (
      <GlobalTransactionModal
        actionName="TRANSFER"
        actions={actions}
        blockExplorers={blockExplorers}
        button={{
          color: "blue",
          content: t("crosschain_transfer_button_cta"),
          fluid: true,
          icon: "arrow circle up"
        }}
        content={
          <WalletPanelCrosschainTransfer
            actions={actions}
            balances={balances}
            blockchains={blockchains}
            connection={connection}
            settings={settings}
            system={system}
          />
        }
        icon="arrow circle up"
        title={t("crosschain_transfer_modal_title")}
        settings={settings}
        system={system}
      />
    );
  }
}

export default translate("crosschaintransfer")(WalletPanelButtonCrosschainTransfer);
