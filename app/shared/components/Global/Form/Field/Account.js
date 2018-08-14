// @flow
import React, { Component } from 'react';
import { Form, Input, Dropdown, Radio } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import { sortBy } from 'lodash';

import exchangeAccounts from '../../../../constants/exchangeAccounts';

class GlobalFormFieldAccount extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      fieldOption: 'manual',
      value: props.value
    };
  }
  onChange = (e, { name, value }) => {
    const parsed = value.trim().toLowerCase();
    const valid = !!(parsed.match(/^[a-z12345.]{1,12}$/g));
    this.setState({
      value: parsed
    }, () => {
      this.props.onChange(e, {
        name,
        value: parsed,
        valid
      });
    });
  }
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
  }

  render() {
    const {
      autoFocus,
      contacts,
      disabled,
      enableContacts,
      enableExchanges,
      fluid,
      icon,
      label,
      loading,
      name,
      t,
      width
    } = this.props;

    const {
      fieldOption,
      value
    } = this.state;

    let dropdownOptions;

    if (fieldOption === 'contacts') {
      dropdownOptions = sortBy(contacts, c => c.accountName).map((contact) => ({
        value: contact.accountName,
        text: `${contact.accountName} ${contact.label ? (`(${contact.label})`) : ''}`
      }));
    } else if (fieldOption === 'exchanges') {
      dropdownOptions = sortBy(exchangeAccounts).map((exchangeAccount) => ({
        value: exchangeAccount,
        text: exchangeAccount
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
        loading={loading}
        name={name}
        onChange={this.onChange}
        ref={ref => { this.input = ref; }}
        value={value}
        width={width}
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
                  checked={this.state.fieldOption === option}
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
              defaultValue={value}
              fluid
              name={name}
              onChange={this.onChange}
              options={dropdownOptions}
              selection
            />
          ) : ''}
        </label>
      </Form.Field>
    );
  }
}

export default translate('global')(GlobalFormFieldAccount);
