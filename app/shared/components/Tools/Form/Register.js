// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import { Segment, Form, Divider, Message, Button } from 'semantic-ui-react';

import WalletPanelFormStakeStats from './Stake/Stats';
import WalletPanelFormStakeInput from './Stake/Input';
import WalletPanelFormStakeConfirming from './Stake/Confirming';
import FormMessageError from '../../../Global/Form/Message/Error';

type Props = {
  actions: {},
  account: {},
  balance: {},
  system: {}
};

class ToolsFormRegister extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    const { account } = props;
    const {
      cpu_weight,
      net_weight
    } = account.self_delegated_bandwidth;

    const parsedCpuWeight = cpu_weight.split(' ')[0];
    const parsedNetWeight = net_weight.split(' ')[0];

    this.state = {
      EOSbalance: (props.balance && props.balance.EOS) ? props.balance.EOS : 0,
      decimalCpuAmount: Decimal(parsedCpuWeight),
      cpuOriginal: Decimal(parsedCpuWeight),
      decimalNetAmount: Decimal(parsedNetWeight),
      netOriginal: Decimal(parsedNetWeight),
      confirming: false,
      formError: null,
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

  onChange = (name, value) => {
    const decimalFieldName = `decimal${name.charAt(0).toUpperCase()}${name.slice(1)}`;
    this.setState({
      submitDisabled: false,
      formError: null,
      [decimalFieldName]: Decimal(value)
    }, () => {
      const error = this.errorsInForm();
      if (error) {
        this.onError(error);
      }
    });
  }

  onSubmit = () => {
    const {
      account,
      actions
    } = this.props;

    const {
      regproxy
    } = actions;

    regproxy(account);
  }

  render() {
    const {
      account,
      onClose,
      system,
      t
    } = this.props;

    return (
      <Segment
        loading={system.REGPROXY === 'PENDING'}
        style={{ minHeight: '80px' }}
      >
        <div>
          <Message
            icon="info circle"
            info
            content={t('proxy_form_message_about_to_register')}
          />
          <Divider />
          <Form
            onSubmit={this.onSubmit}
          >
            <Button
              content={t('proxy_form_button_cancel')}
              color="grey"
              onClick={onClose}
            />
            <Button
              content={t('proxy_form_button_register')}
              color="green"
              floated="right"
              primary
            />
          </Form>
        </div>
      </Segment>
    );
  }
}


export default translate('proxy')(ToolsFormRegister);
