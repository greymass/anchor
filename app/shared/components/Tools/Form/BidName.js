// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import debounce from 'lodash/debounce';
import { Segment, Form, Button, Message } from 'semantic-ui-react';

import FormMessageError from '../../Global/Form/Message/Error';
import GlobalFormFieldString from '../../Global/Form/Field/String';
import GlobalFormFieldAmount from '../../Global/Form/Field/Token';
import ToolsFormBidNameConfirming from './BidName/Confirming';
import WalletPanelLocked from '../../Wallet/Panel/Locked';

const formAttributes = ['bidder', 'newname', 'bid'];
const tokenFields = ['bid'];

class ToolsFormBidName extends Component<Props> {
  constructor(props) {
    super(props);
    const {
      settings
    } = props;

    this.state = {
      confirming: false,
      formErrors: {},
      bidder: settings.account,
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
        formErrors,
        newname
      } = this.state;

      const {
        actions
      } = this.props;

      const {
        checkAccountExists
      } = actions;

      if (name === 'newname' && newname.length !== 0) {
        checkAccountExists(newname);
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
      if (formErrors[attribute] === `invalid_${attribute}` && !this.state[attribute]) {
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
      formValues[formAttribute] = this.state[formAttribute];
    });

    const {
      actions
    } = this.props;

    actions.bidname(formValues);
  }

  render() {
    const {
      actions,
      keys,
      settings,
      system,
      t,
      validate,
      wallet
    } = this.props;

    const {
      formErrors,
      submitDisabled
    } = this.state;

    const shouldShowConfirm = this.state.confirming;
    const shouldShowForm = !shouldShowConfirm;

    const formErrorKeys = Object.keys(formErrors);

    return ((keys && keys.key) || settings.walletMode === 'watch')
      ? (
        <Segment
          loading={system.BIDNAME === 'PENDING'}
          textAlign="left"
        >
          {(shouldShowForm)
            ? (
              <div>
                <Message
                  content={t('tools_form_bid_name_message')}
                  warning
                />
                <Form
                  onKeyPress={this.onKeyPress}
                  onSubmit={this.onSubmit}
                >
                  {formAttributes.filter((formAttribute) => formAttribute !== 'bidder').map((formAttribute) => {
                    const FieldComponentType = (tokenFields.includes(formAttribute)) ? GlobalFormFieldAmount : GlobalFormFieldString;

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
              <ToolsFormBidNameConfirming
                formAttributes={formAttributes}
                formValues={this.state}
                onBack={this.onBack}
                onConfirm={this.onConfirm}
              />
            ) : ''}
        </Segment>
      ) : (
        <WalletPanelLocked
          actions={actions}
          settings={settings}
          validate={validate}
          wallet={wallet}
        />
      );
  }
}


export default translate('tools')(ToolsFormBidName);
