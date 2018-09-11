// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import FormFieldToken from '../../../../Global/Form/Field/Token';
import calculateAmountOfRam from '../../../../helpers/calculateAmountOfRam';

import GlobalDataBytes from '../../../../Global/Data/Bytes';

class WalletPanelFormRamBuyByCost extends Component<Props> {
  constructor(props) {
    super(props);

    const {
      priceOfRam
    } = this.props;

    this.state = {
      amountOfRam: 0,
      priceOfRam
    };
  }

  onConfirm = () => {
    const {
      onConfirm
    } = this.props;

    onConfirm();
  }

  onChange = (e, { value }) => {
    const {
      globals,
      onChange
    } = this.props;

    const decPrice = Decimal(value.split(' ')[0]);

    const decBaseBal = Decimal(globals.ram.base_balance);
    const decQuoteBal = Decimal(globals.ram.quote_balance);

    let amountOfRam = 0;

    if (decPrice.greaterThan(0)) {
      const decAmount = calculateAmountOfRam(decBaseBal, decQuoteBal, decPrice);
      amountOfRam = decAmount.floor();
    }

    onChange(amountOfRam, decPrice);

    this.setState({
      amountOfRam,
      priceOfRam: decPrice
    });
  }

  render() {
    const {
      connection,
      formError,
      settings,
      t
    } = this.props;

    const {
      amountOfRam,
      priceOfRam
    } = this.state;

    return (
      <div>
        <FormFieldToken
          autoFocus
          label={t('ram_form_label_amount_in_eos', {tokenSymbol:settings.blockchain.prefix})}
          loading={false}
          name="ram_to_buy"
          onChange={this.onChange}
          defaultValue={priceOfRam && priceOfRam.toFixed(4)}
          connection={connection}
        />
        {(amountOfRam && !formError) ? (
          <h4 style={{ textAlign: 'center', margin: '30px' }}>
            {t('ram_form_text_amount_estimate')}
            <GlobalDataBytes
              bytes={Number(amountOfRam)}
            />
          </h4>
        ) : ''}
      </div>
    );
  }
}

export default translate('ram')(WalletPanelFormRamBuyByCost);
