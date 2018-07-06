// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';
import { Button, Header, Divider, Icon, Segment, Message } from 'semantic-ui-react';

import WalletMessageContractBuyRamBytes from '../../../../../Global/Message/Contract/BuyRamBytes';

class WalletPanelFormRamBuyConfirming extends Component<Props> {
  onConfirm = () => {
    const {
      onConfirm
    } = this.props;

    onConfirm();
  }

  render() {
    const {
      ramToBuyinKbs,
      onBack,
      priceOfRam,
      ramQuota,
      settings,
      t
    } = this.props;

    const ramToBuy = Decimal(ramToBuyinKbs).times(1024);

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
            {t('ram_buy_confirming_message_one')}
            <font color="green">{` ${ramToBuyinKbs} Kbs `}</font>
            {` ${t('ram_confirming_message_kbs_in_ram_for')} ~${priceOfRam.toFixed(4)} EOS.`}
          </Header>
          <Header>
            {`${t('ram_confirming_message_will_have')} ${ramQuota.plus(ramToBuy).dividedBy(1024)} Kbs ${t('ram_confirming_message_kbs_in_ram_left')}`}
          </Header>
        </Segment>

        <Message warning>
          {t('ram_confirming_message_price_includes_fee')}
        </Message>

        <Divider />

        <WalletMessageContractBuyRamBytes
          data={{
            buyer: settings.account,
            bytes: `${ramToBuyinKbs * 1024}kbs`,
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

export default translate('ram')(WalletPanelFormRamBuyConfirming);
