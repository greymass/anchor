// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Divider, Icon, Segment, Message } from 'semantic-ui-react';
import { Decimal } from 'decimal.js';

import WalletMessageContractSellRamBytes from '../../../../../Global/Message/Contract/SellRamBytes';

class WalletPanelFormRamSellConfirming extends Component<Props> {
  onConfirm = () => {
    const {
      onConfirm
    } = this.props;

    onConfirm();
  }

  render() {
    const {
      onBack,
      priceOfRam,
      ramToSellInKbs,
      ramQuota,
      settings,
      t
    } = this.props;

    const ramToSell = Decimal(ramToSellInKbs).times(1024);

    return (
      <Segment basic clearing padding="true">
        <Segment textAlign="center">
          <Header size="large">
            {t('ram_confirming_message_price_estimate_header')}
            <Header.Subheader>
              {t('ram_confirming_message_price_estimate_subheader')}
            </Header.Subheader>
          </Header>
          <Header>
            {t('ram_sell_confirming_message_one')}
            <font color="red">{ ` ${ramToSellInKbs} kBs ` }</font>
            {`${t('ram_confirming_message_kbs_in_ram_for')} ~${priceOfRam.toFixed(4)} EOS.`}
          </Header>
          <Header>
            {`${t('ram_confirming_message_will_have')} ${ramQuota.minus(ramToSell).dividedBy(1024)} kBs ${t('ram_confirming_message_kbs_in_ram_left')}`}
          </Header>
        </Segment>
        <Message warning>
          {t('ram_confirming_message_price_includes_fee')}
        </Message>

        <Divider />

        <WalletMessageContractSellRamBytes
          data={{
            account: settings.account,
            bytes: `${ramToSellInKbs * 1024}kBs`,
            signer: settings.account,
          }}
        />

        <Button
          floated="left"
          onClick={onBack}
        >
          <Icon name="arrow left" /> {t('ram_button_confirm_back')}
        </Button>
        <Button
          color="blue"
          floated="right"
          onClick={this.onConfirm}
        >
          <Icon name="check" /> {t('ram_button_confirm_sell')}
        </Button>
      </Segment>
    );
  }
}

export default translate('ram')(WalletPanelFormRamSellConfirming);
