// @flow
import React, { Component } from 'react';
import { Form, Input, Dropdown, Radio } from 'semantic-ui-react';
import { I18n } from 'react-i18next';
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
    const valid = !!(parsed.match(/^[a-z12345.]+$/g));
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
    this.setState({ fieldOption: value });
  }

  render() {
    const {
      autoFocus,
      contacts,
      disabled,
      fluid,
      hideOptions,
      icon,
      label,
      loading,
      name,
      width
    } = this.props;

    const {
      fieldOption,
      value
    } = this.state;

    let dropdownOptions;

    if (fieldOption === 'contacts') {
      dropdownOptions = sortBy(contacts, c => c.fullName).map((contact) => {
        return { value: contact.accountName, text: (contact.fullName || contact.accountName) };
      });
    } else if (fieldOption === 'exchanges') {
      dropdownOptions = sortBy(exchangeAccounts).map((exchangeAccount) => {
        return { value: exchangeAccount, text: exchangeAccount };
      });
    }

    const inlineLabel = (hideOptions ? label : false);

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

    const availableOptions = ['manual', 'exchanges'];

    if (contacts.length > 0) {
      availableOptions.push('contacts');
    }

    return (hideOptions)
      ? (
        inputField
      ) : (
        <I18n ns="global">
          {
            (t) => (
              <div>
                <label htmlFor={name}>
                  <strong>{label}</strong>
                  {(fieldOption === 'manual')
                  ? (
                    inputField
                  ) : ''}

                  {(fieldOption !== 'manual')
                  ? (
                    <Dropdown
                      defaultValue={value}
                      fluid
                      name={name}
                      onChange={this.onChange}
                      options={dropdownOptions}
                      selection
                    />
                  ) : ''}
                </label>
                {(!hideOptions)
                  ? (
                    <Form.Field style={{ margin: '10px' }}>
                      {availableOptions.map((option) => (
                        <Radio
                          label={t(`global_form_field_${option}`)}
                          key={option}
                          name="inputRadioOptions"
                          style={{ marginLeft: '10px' }}
                          value={option}
                          checked={this.state.fieldOption === option}
                          onChange={this.handleRadioChange}
                        />
                      ))}
                    </Form.Field>
                  ) : <br />}
              </div>
            )
          }
        </I18n>
      );
  }
}

export default GlobalFormFieldAccount;
