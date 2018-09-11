// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import FormFieldRam from '../../../../Global/Form/Field/Ram';
import calculatePriceOfRam from '../../../../helpers/calculatePriceOfRam';

class WalletPanelFormRamByAmount extends Component<Props> {
  constructor(props) {
    super(props);

    const {
      amountOfRam
    } = this.props;

    this.state = {
      amountOfRam,
      priceOfRam: null
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

    const decBaseBal = Decimal(globals.ram.base_balance);
    const decQuoteBal = Decimal(globals.ram.quote_balance);
    const decValueInBytes = Decimal(parseFloat(value));

    let priceOfRam = 0;

    if (decValueInBytes.greaterThan(0)) {
      priceOfRam = calculatePriceOfRam(decBaseBal, decQuoteBal, decValueInBytes);
    }

    onChange(value, priceOfRam);

    this.setState({
      amountOfRam: value,
      priceOfRam
    });
  }

  render() {
    const {
      formError,
      t,
      connection
    } = this.props;

    const {
      amountOfRam,
      priceOfRam
    } = this.state;

    return (
      <div>
        <FormFieldRam
          autoFocus
          icon="database"
          label={t('ram_form_label_amount_in_bytes')}
          loading={false}
          name="ram_to_buy"
          onChange={this.onChange}
          defaultValue={amountOfRam}
          connection={connection}
        />
        {(priceOfRam && !formError) ? (
          <h4 style={{ textAlign: 'center', margin: '30px' }}>
            {`${t('ram_form_text_estimate')} ${priceOfRam.toFixed(4)} ${connection.keyPrefix}.`}
          </h4>
        ) : ''}
      </div>
    );
  }
}

export default translate('ram')(WalletPanelFormRamByAmount);
