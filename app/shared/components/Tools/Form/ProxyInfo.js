// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';
import debounce from 'lodash/debounce';

import { Segment, Form, Button, Message } from 'semantic-ui-react';

import GlobalFormFieldAccount from '../../Global/Form/Field/Account';
import GlobalFormFieldString from '../../Global/Form/Field/String';
import FormMessageError from '../../Global/Form/Message/Error';
import ToolsFormProxyInfoConfirming from './ProxyInfo/Confirming';

const formAttributes = [
  'proxy', 'name', 'slogan', 'philosophy', 'background', 'website', 'logo_256', 'telegram', 'steemit', 'twitter', 'wechat'
];

class ToolsFormProxyInfo extends Component<Props> {
  constructor(props) {
    super(props);
    const {
      accountName,
      activeKey,
      balance,
      delegatedBw,
      delegatedCpu,
      ownerKey,
      ramAmount
    } = props;

    this.state = {
      accountName,
      activeKey,
      confirming: false,
      delegatedBw,
      delegatedCpu,
      EOSbalance: (balance && balance.EOS) ? balance.EOS : 0,
      formErrors: {},
      ownerKey,
      ramAmount,
      submitDisabled: true
    };
  }

  componentDidMount = () => {
    const { actions } = this.props;

    actions.getAbi('regproxyinfo');
  }

  onSubmit = (e) => {
    if (!this.state.submitDisabled) {
      this.setState({
        confirming: true
      });
    }
    e.preventDefault();
    return false;
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit(e);

      e.preventDefault();
      return false;
    }
  }

  onChange = debounce((e, { name, value, valid }) => {
    this.setState({
      submitDisabled: false,
      [name]: value
    }, () => {
      const {
        accountName,
        formErrors
      } = this.state;

      const {
        actions
      } = this.props;

      const {
        checkAccountExists
      } = actions;

      if (name === 'accountName' && accountName.length !== 0) {
        checkAccountExists(accountName);
      }

      let submitDisabled = false;

      if (!valid) {
        formErrors[name] = `invalid_${name}`;
      } else {
        formErrors[name] = null;
      }

      if (!this.allFieldsHaveValidFormat()) {
        submitDisabled = true;
      }

      this.setState({
        formErrors,
        submitDisabled
      });
    });
  }, 200)

  onToggle = (e, { name }) => {
    this.setState({
      [name]: !this.state[name]
    });
  }

  allFieldsHaveValidFormat = () => {
    const {
      formErrors
    } = this.state;

    let validFormat = true;

    formAttributes.forEach((attribute) => {
      if (!this.state[attribute] || formErrors[attribute] === `invalid_${attribute}`) {
        validFormat = false;
      }
    });

    return validFormat;
  }

  onBack = () => {
    this.setState({
      confirming: false
    });
  }

  onConfirm = () => {
    this.setState({
      confirming: false
    });

    const formValues = formAttributes.map((formAttribute) => this.state[formAttribute]);

    const {
      actions,
      settings
    } = this.props;

    actions.buildTransaction(
      'regproxyinfo',
      'set',
      settings.account,
      formValues
    );
  }

  render() {
    const {
      system,
      t
    } = this.props;

    const {
      formErrors,
      proxy,
      submitDisabled
    } = this.state;

    const shouldShowConfirm = this.state.confirming;
    const shouldShowForm = !shouldShowConfirm;

    const formErrorKeys = Object.keys(formErrors);

    return (
      <Segment
        loading={system.CREATEACCOUNT === 'PENDING'}
        textAlign="left"
      >
        {(shouldShowForm)
          ? (
            <div>

              <Message
                content={t('tools_form_proxy_info_message')}
                warning
              />
              <Form
                onKeyPress={this.onKeyPress}
                onSubmit={this.onSubmit}
              >
                <GlobalFormFieldAccount
                  defaultValue={proxy || ''}
                  label={t('tools_form_proxy_info_proxy')}
                  name="ownerKey"
                  onChange={this.onChange}
                />
                {formAttributes.map((formAttribute) => {
                  return (
                    <GlobalFormFieldString
                      defaultValue={this.state[formAttribute] || ''}
                      label={t(`tools_form_proxy_info_${formAttribute}`)}
                      name={formAttribute}
                      onChange={this.onChange}
                    />
                  );
                })}
                <FormMessageError
                  errors={
                    formErrorKeys.length > 0 && formErrorKeys.reduce((errors, key) => {
                      const error = this.state.formErrors[key];
                      if (error) {
                        errors.push(error);
                      }
                      return errors;
                    }, [])
                  }
                  icon="warning sign"
                />
                <Segment basic clearing>
                  <Button
                    content={t('tools_form_proxy_info_button')}
                    color="green"
                    disabled={submitDisabled}
                    floated="right"
                    primary
                  />
                </Segment>
              </Form>
            </div>
          ) : ''}

        {(shouldShowConfirm)
          ? (
            <ToolsFormProxyInfoConfirming
              formAttributes={formAttributes}
              formValues={this.state}
              onBack={this.onBack}
              onConfirm={this.onConfirm}
            />
          ) : ''}
      </Segment>
    );
  }
}


export default translate('tools')(ToolsFormProxyInfo);
