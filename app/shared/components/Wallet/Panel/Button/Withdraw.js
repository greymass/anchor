// @flow
import React, { Component } from "react";
import { translate } from "react-i18next";

import GlobalTransactionModal from "../../../Global/Transaction/Modal";
import WalletPanelFormWithdraw from "../Form/Withdraw/Withdraw";

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

class WalletPanelButtonWithdraw extends Component<Props> {
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
        actionName="WITHDRAW"
        actions={actions}
        blockExplorers={blockExplorers}
        button={{
          color: "blue",
          content: t("withdraw_send_button_cta"),
          fluid: true,
          icon: "arrow circle up"
        }}
        content={
          <WalletPanelFormWithdraw
            actions={actions}
            balances={balances}
            blockchains={blockchains}
            connection={connection}
            settings={settings}
            system={system}
          />
        }
        icon="arrow circle up"
        title={t("withdraw_modal_title")}
        settings={settings}
        system={system}
      />
    );
  }
}

export default translate("beos_withdraw")(WalletPanelButtonWithdraw);
