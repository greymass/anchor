// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Divider, Icon, Segment, Message, Popup } from 'semantic-ui-react';

import WalletMessageContractBuyRamBytes from '../../../../Global/Message/Contract/BuyRamBytes';

const prettyBytes = require('pretty-bytes');

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
      t
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
            {t('ram_buy_confirming_message_one')}
            <Popup
              content={`${ramAmount} B`}
              inverted
              trigger={
                <span>
                  <font color="green">{` ${prettyBytes(Number(ramAmount))}`}</font>
                </span>
              }
            />

            {` ${t('ram_confirming_message_in_ram_for')} ~${priceOfRam.toFixed(4)} EOS.`}
          </Header>
          <Header>
            {t('ram_confirming_message_will_have')}
            <Popup
              content={`${newRamAmount} B`}
              inverted
              trigger={
                <span>
                  {` ${prettyBytes(newRamAmount)} ${t('ram_confirming_message_in_ram_left')}`}
                </span>
              }
            />
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
