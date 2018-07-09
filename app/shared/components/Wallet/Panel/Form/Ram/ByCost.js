// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import FormFieldToken from '../../../../../Global/Form/Field/Token';
import calculateAmountOfRam from '../helpers/calculateAmountOfRam';

class WalletPanelFormRamBuyByAmount extends Component<Props> {
  onConfirm = () => {
    const {
      onConfirm
    } = this.props;

    onConfirm();
  }

  onChange = (e, { name, value }) => {
    const {
      globals,
      onChange,
      onError
    } = this.props;

    const decBaseBal = Decimal(globals.ram.base_balance);
    const decQuoteBal = Decimal(globals.ram.quote_balance);
    const decValueInBytes = Decimal(parseFloat(value));

    let priceOfRam = 0;

    if (decValueInBytes.greaterThan(0)) {
      priceOfRam = calculateAmountOfRam(decBaseBal, decQuoteBal, decValueInBytes).times(1.005);
    }

    onChange(decValueInBytes, priceOfRam);
  }

  render() {
    const {
      ramToBuy,
      t
    } = this.props;

    const {
      formError,
      priceOfRam
    } = this.state;

    return (
      <div>
        <FormFieldToken
          autoFocus
          label={t('ram_form_label_amount_in_bytes_to_buy')}
          loading={false}
          name="ram_to_buy"
          onChange={this.onChange}
          value={ramToBuy}
        />
        {(amountOfRam && !formError) ? (
          <h4 style={{ textAlign: 'center', margin: '10px' }}>
            {`${t('ram_form_text_estimate')} ${priceOfRam.toFixed(4)} EOS.`}
          </h4>
        ) : ''}
      </div>
    );
  }
}

export default translate('ram')(WalletPanelFormRamBuyByAmount);
