// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Divider, Icon, Segment, Message } from 'semantic-ui-react';

import WalletMessageContractBuyRamBytes from '../../../../Global/Message/Contract/BuyRamBytes';
import GlobalDataBytes from '../../../../Global/Data/Bytes';

class WalletPanelFormRamBuyConfirming extends Component<Props> {
  onConfirm = () => {
    const {
      onConfirm
    } = this.props;

    onConfirm();
  }

  render() {
    const {
      buying,
      ramAmount,
      onBack,
      priceOfRam,
      newRamAmount,
      settings,
      t,
      connection
    } = this.props;

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
            {(buying)
              ? (
                <span>{t('ram_buy_confirming_message_one')}</span>
              ) : (
                <span>{t('ram_sell_confirming_message_one')}</span>
              )}

            <font color="green">
              <GlobalDataBytes
                bytes={Number(ramAmount)}
              />
            </font>


            {` ${t('ram_confirming_message_in_ram_for')} ~${priceOfRam.toFixed(4)} ${connection.keyPrefix}.`}
          </Header>
          <Header>
            {t('ram_confirming_message_will_have')}
            <GlobalDataBytes
              bytes={newRamAmount}
            />
            {t('ram_confirming_message_in_ram_left')}
          </Header>
        </Segment>

        <Message warning>
          {t('ram_confirming_message_price_includes_fee')}
        </Message>

        <Divider />


        {(buying) ?
          (
            <WalletMessageContractBuyRamBytes
              data={{
                buyer: settings.account,
                bytes: `${ramAmount} B`,
                tokenSymbol: settings.blockchain.prefix
              }}
            />
          ) : ''}

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
          <Icon name="check" /> {t('ram_button_confirm_transaction')}
        </Button>
      </Segment>
    );
  }
}

export default translate('ram')(WalletPanelFormRamBuyConfirming);
