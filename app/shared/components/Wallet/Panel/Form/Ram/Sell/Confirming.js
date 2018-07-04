// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Divider, Icon, Segment } from 'semantic-ui-react';
import { Decimal } from 'decimal.js';

class WalletPanelFormRamSellConfirming extends Component<Props> {
  onConfirm = () => {
    const {
      onConfirm
    } = this.props;

    onConfirm();
  }

  render() {
    const {
      ramToSellInKbs,
      onBack,
      priceOfRam,
      ramQuota,
      t
    } = this.props;

    const ramToSell = Decimal(ramToSellInKbs).times(1000);
    const costOfRam = ramToSell.times(priceOfRam);

    return (
      <Segment padding="true" textAlign="center" style={{ minHeight: '180px' }} basic>
        <Segment textAlign="center">
          <Header>
            {t('ram_sell_confirming_message_one')}
            <font color="red">{ ` ${ramToSellInKbs} Kbs ` }</font>
            {`${t('ram_confirming_message_kbs_in_ram_for')} ${costOfRam} EOS.`}
          </Header>
          <Header>
            {`${t('ram_confirming_message_kbs_in_ram_for')} ${ramQuota.minus(ramToSell).dividedBy(1000)} Kbs ${t('ram_confirming_message_kbs_in_ram_left')}`}
          </Header>
          <Message warning>
            {t('ram_confirming_message_price_includes_fee')}
          </Message>
        </Segment>

        <Divider />
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
