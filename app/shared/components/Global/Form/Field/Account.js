// @flow
import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';
import { sortBy } from 'lodash';
import { get } from 'dot-prop-immutable';

export class GlobalFormFieldAccount extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      fieldOption: 'manual',
      maxlength: props.maxlength || 12,
      value: props.value
    };
  }
  onChange = (e, { name, value }) => {
    const parsed = value.trim().toLowerCase();
    let valid = false;
    switch (this.props.rules) {
      case 'generic':
        valid = !!(parsed.match(new RegExp("^[a-z12345]{" + this.state.maxlength + "}$", "g")));
        break;
      default:
        valid = !!(parsed.match(new RegExp("^[a-z12345.]{1," + this.state.maxlength + "}$", "g")));
        break;
    }
    this.setState({
      value: parsed
    }, () => {
      this.props.onChange(e, {
        name,
        value: parsed,
        valid
      });
    });
  };
  reset = () => this.setState({ value: '' });

  handleRadioChange = (e, { value }) => {
    const {
      name
    } = this.props;

    this.setState({
      fieldOption: value
    }, () => {
      this.onChange(e, { name, value: '' });
    });
  };

  render() {
    const {
      app,
      autoFocus,
      contacts,
      disabled,
      enableContacts,
      enableExchanges,
      showErrorOnInput = false,
      fluid,
      icon,
      label,
      labelPosition,
      loading,
      name,
      t,
      width
    } = this.props;

    const { value } = this.state;

    let { fieldOption } = this.state;

    const exchangeAccounts = get(app, 'constants.exchanges') || [];

    if (contacts && contacts.includes(value)) {
      fieldOption = 'contacts';
    } else if (exchangeAccounts && exchangeAccounts.includes(value)) {
      fieldOption = 'exchanges';
    }

    let dropdownOptions;

    if (fieldOption === 'contacts') {
      dropdownOptions = sortBy(contacts, c => c.accountName).map((contact) => ({
        value: contact.accountName,
        text: `${contact.accountName} ${contact.label ? (`(${contact.label})`) : ''}`
      }));
    } else if (fieldOption === 'exchanges') {
      dropdownOptions = sortBy(exchangeAccounts).map((exchangeAccount) => ({
        value: exchangesInfo[exchangeAccount].account,
        text: exchangesInfo[exchangeAccount].name,
      }));
    }

    const availableOptions = ['manual'];
    if (enableExchanges) {
      availableOptions.push('exchanges');
    }
    if (enableContacts && contacts && contacts.length > 0) {
      availableOptions.push('contacts');
    }

    const showOptions = (availableOptions.length > 1);

    const inlineLabel = (!showOptions ? label : false);

    const inputField = (
      <Form.Field
        autoFocus={autoFocus}
        control={Input}
        disabled={disabled}
        fluid={fluid}
        icon={icon}
        label={inlineLabel}
        labelPosition={labelPosition}
        loading={loading}
        name={name}
        onChange={this.onChange}
        ref={ref => { this.input = ref; }}
        value={value}
        width={width}
        error={showErrorOnInput}
      />
    );

    if (!showOptions) {
      return inputField;
    }

    return (
      <Form.Field>
        {(showOptions)
          ? (
            <Form.Group inline>
              <label>{t('global_form_field_account_options')}</label>
              {availableOptions.map((option) => (
                <Form.Radio
                  label={t(`global_form_field_account_${option}`)}
                  key={option}
                  name="inputRadioOptions"
                  style={{ marginLeft: '10px' }}
                  value={option}
                  checked={fieldOption === option}
                  onChange={this.handleRadioChange}
                />
              ))}
            </Form.Group>
          ) : <br />}
        <label htmlFor={name}>
          <strong>{label}</strong>
          {(fieldOption === 'manual')
          ? (
            inputField
          ) : ''}

          {(fieldOption !== 'manual')
          ? (
            <Form.Dropdown
              value={value}
              fluid
              name={name}
              onChange={this.onChange}
              options={dropdownOptions}
              placeholder={
                fieldOption === 'exchanges' ?
                  t('global_form_placeholder_exchange') :
                  t('global_form_placeholder_contact')
              }
              selection
            />
          ) : ''}
        </label>
      </Form.Field>
    );
  }
}

export default withTranslation('global')(GlobalFormFieldAccount);

const exchangesInfo = {
  binancecleos: {
    account: 'binancecleos',
    name: 'Binance',
  },
  bitfinexdep1: {
    account: 'bitfinexdep1',
    name: 'Bitfinex',
  },
  krakenkraken: {
    account: 'krakenkraken',
    name: 'Kraken',
  },
};
