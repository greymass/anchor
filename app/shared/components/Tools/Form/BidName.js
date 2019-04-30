// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import debounce from 'lodash/debounce';
import { Segment, Form, Button, Message, Table } from 'semantic-ui-react';
import { Decimal } from 'decimal.js';

import FormMessageError from '../../Global/Form/Message/Error';
import GlobalFormFieldString from '../../Global/Form/Field/String';
import GlobalFormFieldToken from '../../Global/Form/Field/Token';
import ToolsFormBidNameConfirming from './BidName/Confirming';
import WalletPanelLocked from '../../Wallet/Panel/Locked';

const formAttributes = ['bidder', 'newname', 'bid'];
const specialCharactersRegex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

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
      secondStepDisabled: true,
      step: 1,
      submitDisabled: true,
    };
  }

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.bid && !this.state.submitDisabled) {
      this.setState({
        confirming: true
      });
    }

    return false;
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit(e);

      e.preventDefault();
      return false;
    }
  }

  handleNextStep = () => {
    const {
      actions
    } = this.props;
    const {
      getBidForName
    } = actions;
    const {
      newname
    } = this.state;
    this.setState({ step: 2 }, () => {
      getBidForName(newname);
    });
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
        balance,
        connection
      } = this.props;

      const {
        checkAccountAvailability,
      } = actions;

      if (name === 'newname' && newname.length !== 0) {
        checkAccountAvailability(newname);
      }

      let submitDisabled = false;
      let secondStepDisabled = false;

      if (!valid) {
        formErrors[name] = `invalid_${name}`;
        secondStepDisabled = true;
        submitDisabled = true;
      } else if (name === 'bid' && Number(value.split(' ')[0]) > balance[connection.chainSymbol]) {
        formErrors[name] = 'insufficient_balance';
        submitDisabled = true;
      } else if (name === 'newname' && value.length > 11) {
        formErrors[name] = 'newname_too_long';
        secondStepDisabled = true;
        submitDisabled = true;
      } else if (name === 'newname' && specialCharactersRegex.test(value)) {
        formErrors[name] = 'invalid_characters';
        secondStepDisabled = true;
        submitDisabled = true;
      } else {
        formErrors[name] = null;
      }

      if (!newname || newname.length === 0) {
        secondStepDisabled =  true;
      }

      if (!this.allFieldsHaveValidFormat()) {
        submitDisabled = true;
      }

      this.setState({
        secondStepDisabled,
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
  };

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
      secondStepDisabled,
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
      secondStepDisabled = true;
    } else if (currentAccountLastBid) {
      formErrors.newname = 'newname_already_bid';
      submitDisabled = true;
      secondStepDisabled =  true;
    } else if (newnameFieldHasError) {
      formErrors.newname = null;
    }

    const bidAmount = bid && Number(bid.split(' ')[0]);
    const bidTooLow = bid && newname &&
                      system.NAMEBID_LAST_BID &&
                      system.NAMEBID_LAST_BID.newname === newname &&
                      Decimal(Math.abs(system.NAMEBID_LAST_BID.high_bid)).dividedBy(Decimal(10000))
                                                                         .times(Decimal(1.1))
                                                                         .greaterThan(Decimal(bidAmount))
    const bidFieldHasError = formErrors.bid === 'bid_is_too_low';

    if (bidTooLow) {
      formErrors.bid = 'bid_is_too_low';
      submitDisabled = true;
    } else if (bidFieldHasError) {
      formErrors.bid = null;
    }

    return { formErrors, submitDisabled, secondStepDisabled };
  }

  render() {
    const {
      actions,
      connection,
      pubkeys,
      settings,
      system,
      t,
      validate,
      wallet
    } = this.props;

    const {
      newname,
      bid,
      step
    } = this.state;

    const shouldShowConfirm = this.state.confirming;
    const shouldShowForm = !shouldShowConfirm;
    const shouldShowBidInfo = system.NAMEBID_LAST_BID && system.NAMEBID_LAST_BID.newname === newname && step === 2;

    const { formErrors, submitDisabled, secondStepDisabled } = this.formErrorsOnRender();

    const formErrorKeys = Object.keys(formErrors);

    return ((pubkeys.unlocked.includes(wallet.pubkey)) || ['ledger', 'watch'].includes(settings.walletMode))
      ? (
        <Segment
          loading={system.BIDNAME === 'PENDING'}
          textAlign="left"
        >
          {(shouldShowForm)
            ? (
              <div>
                <Message
                  content={t('tools_form_bid_name_warning')}
                  icon="warning sign"
                  warning
                />
                <Form
                  onKeyPress={this.onKeyPress}
                  onSubmit={this.onSubmit}
                >
                  {(step === 1) ? (
                    <GlobalFormFieldString
                      defaultValue={newname || ''}
                      label={t('tools_form_bid_name_choose_name')}
                      name="newname"
                      onChange={this.onChange}
                    />
                  ) : (
                    <GlobalFormFieldToken
                      connection={connection}
                      defaultValue={bid && bid.split(' ')[0] || ''}
                      label={t('tools_form_bid_name_choose_bid_amount', { chainSymbol: connection.chainSymbol })}
                      name="bid"
                      onChange={this.onChange}
                    />
                  )}
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
                  {(shouldShowBidInfo) && (
                    <Table
                      size="small"
                      basic
                    >
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>
                            {t('tools_form_bid_name_bid_info_bid_info')}
                          </Table.HeaderCell>
                          <Table.HeaderCell />
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>
                            {t('tools_form_bid_name_bid_info_bid_name')}
                          </Table.Cell>
                          <Table.Cell>
                            {newname}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            {t('tools_form_bid_name_bid_info_last_bid')}
                          </Table.Cell>
                          <Table.Cell>
                            {Math.abs(system.NAMEBID_LAST_BID.high_bid) / 10000} {connection.chainSymbol}
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
                  )}

                  {(!shouldShowBidInfo && step === 2) && (
                    <Message
                      content={t('tools_form_bid_name_first_bid')}
                    />
                  )}
                  <Segment basic clearing>
                    {(step === 1)
                    ? (
                      <Button
                        content={t('tools_form_proxy_info_next')}
                        color="green"
                        disabled={secondStepDisabled}
                        floated="right"
                        onClick={this.handleNextStep}
                        primary
                      />
                    ) : (
                      <div>
                        <Button
                          content={t('tools_form_proxy_info_back')}
                          onClick={() => this.setState({ step: 1, bid: undefined, formErrors: {}, secondStepDisabled: false })}
                        />
                        <Button
                          content={t('tools_form_proxy_info_next')}
                          color="green"
                          disabled={submitDisabled}
                          floated="right"
                          primary
                        />
                      </div>
                    )}
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
