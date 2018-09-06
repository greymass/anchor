// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import debounce from 'lodash/debounce';
import { Segment, Form, Button, Message } from 'semantic-ui-react';
import { findIndex } from 'lodash';

import FormMessageError from '../../Global/Form/Message/Error';
import GlobalFormFieldString from '../../Global/Form/Field/String';
import GlobalFormFieldUrl from '../../Global/Form/Field/Url';
import ToolsFormProxyInfoConfirming from './ProxyInfo/Confirming';

const formAttributes = [
  'proxy', 'name', 'slogan', 'philosophy', 'background', 'website', 'logo_256', 'telegram', 'steemit', 'twitter', 'wechat'
];

const urlFields = ['logo_256', 'website'];

class ToolsFormProxyInfo extends Component<Props> {
  constructor(props) {
    super(props);
    const {
      settings
    } = props;

    this.state = {
      confirming: false,
      formErrors: {},
      proxy: settings.account,
      submitDisabled: true
    };
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
      if (formErrors[attribute] === `invalid_${attribute}`) {
        validFormat = false;
      }
    });

    ['proxy', 'name'].forEach((attribute) => {
      if (!this.state[attribute]) {
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

    const formValues = {};

    formAttributes.forEach((formAttribute) => {
      formValues[formAttribute] = this.state[formAttribute] || '';
    });

    const {
      actions
    } = this.props;

    actions.setregproxyinfo(formValues);
  }

  render() {
    const {
      account,
      isProxy,
      system,
      t,
      tables
    } = this.props;

    const {
      formErrors,
      submitDisabled
    } = this.state;

    const shouldShowConfirm = this.state.confirming;
    const shouldShowForm = !shouldShowConfirm;

    const formErrorKeys = Object.keys(formErrors);

    const displayProxyInfoForm =
      isProxy &&
      tables.regproxyinfo &&
      findIndex(tables.regproxyinfo.regproxyinfo.proxies.rows, { owner: account.account_name }) === -1;

    return (
      (displayProxyInfoForm)
        ? (
          <Segment
            loading={system.SET_REGPROXYINFO === 'PENDING'}
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
                    {formAttributes.filter((formAttribute) => formAttribute !== 'proxy').map((formAttribute) => {
                      const FieldComponentType = (urlFields.includes(formAttribute)) ? GlobalFormFieldUrl : GlobalFormFieldString;

                      return (
                        <FieldComponentType
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
        ) : '');
  }
}


export default translate('tools')(ToolsFormProxyInfo);
