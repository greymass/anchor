// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import debounce from 'lodash/debounce';
import { Segment, Form, Button, Message, Table } from 'semantic-ui-react';

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
        actions,
        balance
      } = this.props;

      const {
        checkAccountAvailability,
        getBidForName
      } = actions;

      if (name === 'newname' && newname.length !== 0) {
        checkAccountAvailability(newname);
        getBidForName(newname);
      }

      let submitDisabled = false;

      if (!valid) {
        formErrors[name] = `invalid_${name}`;
        submitDisabled = true;
      } else if (name === 'bid' && Number(value.split(' ')[0]) > balance.EOS) {
        formErrors[name] = 'error_insufficient_balance';
        submitDisabled = true;
      } else if (name === 'newname' && value.length > 11) {
        formErrors[name] = 'newname_too_long';
        submitDisabled = true;
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
      if (formErrors[attribute] === `invalid_${attribute}` || !this.state[attribute]) {
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

  formErrorsOnRender() {
    const {
      settings,
      system
    } = this.props;

    const {
      bid,
      formErrors,
      newname
    } = this.state;

    let {
      submitDisabled
    } = this.state;

    const accountNameUnavailable = newname &&
                                   system.ACCOUNT_AVAILABLE === 'FAILURE' &&
                                   system.ACCOUNT_AVAILABLE_LAST_ACCOUNT === newname;
    const currentAccountLastBid = newname && system.NAMEBID_LAST_BID && system.NAMEBID_LAST_BID.newname === newname &&
                                  system.NAMEBID_LAST_BID.high_bidder === settings.account;
    const newnameFieldHasError = ['newname_not_available', 'newname_already_bid'].includes(formErrors.accountName);

    if (accountNameUnavailable) {
      formErrors.newname = 'newname_not_available';
      submitDisabled = true;
    } else if (currentAccountLastBid) {
      formErrors.newname = 'newname_already_bid';
      submitDisabled = true;
    } else if (newnameFieldHasError) {
      formErrors.newname = null;
    }

    const bidAmount = bid && Number(bid.split(' ')[0]);
    const bidTooLow = bid && newname &&
                      system.NAMEBID_LAST_BID &&
                      system.NAMEBID_LAST_BID.newname === newname &&
                      (system.NAMEBID_LAST_BID.high_bid / 10000) >= bidAmount;
    const bidFieldHasError = formErrors.bid === 'bid_too_low';

    if (bidTooLow) {
      formErrors.bid = 'bid_too_low';
      submitDisabled = true;
    } else if (bidFieldHasError) {
      formErrors.bid = null;
    }

    return { formErrors, submitDisabled };
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
      newname
    } = this.state;

    const shouldShowConfirm = this.state.confirming;
    const shouldShowForm = !shouldShowConfirm;
    const shouldShowBidInfo = system.NAMEBID_LAST_BID && system.NAMEBID_LAST_BID.newname === newname;

    const { formErrors, submitDisabled } = this.formErrorsOnRender();

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
                    let FieldComponentType;
                    let defaultValue;

                    if (tokenFields.includes(formAttribute)) {
                      FieldComponentType = GlobalFormFieldAmount;
                      defaultValue = this.state[formAttribute] && this.state[formAttribute].split(' ')[0];
                    } else {
                      FieldComponentType = GlobalFormFieldString;
                      defaultValue = this.state[formAttribute];
                    }

                    return (
                      <FieldComponentType
                        defaultValue={defaultValue || ''}
                        label={t(`tools_form_bid_name_${formAttribute}`)}
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
                  {(shouldShowBidInfo)
                  ? (
                    <Table
                      size="small"
                      basic
                    >
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>
                            {t('tools_form_bid_name_bid_info_header')}
                            <u>{newname}</u>
                          </Table.HeaderCell>
                          <Table.HeaderCell />
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>
                            {t('tools_form_bid_name_bid_info_last_bid')}
                          </Table.Cell>
                          <Table.Cell>
                            {system.NAMEBID_LAST_BID.high_bid / 10000} EOS
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            {t('tools_form_bid_name_bid_info_last_bidder')}
                          </Table.Cell>
                          <Table.Cell>
                            {system.NAMEBID_LAST_BID.high_bidder}
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  ) : ''}
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
