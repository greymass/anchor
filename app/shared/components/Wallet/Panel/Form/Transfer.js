// @flow
import React, { Component } from 'react';
import { Button, Divider, Form, Header, Icon, Message, Segment, Table } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import FormFieldAccount from '../../../Global/Form/Field/Account';
import FormFieldGeneric from '../../../Global/Form/Field/Generic';
import FormFieldMultiToken from '../../../Global/Form/Field/MultiToken';
import WalletMessageContractTransfer from '../../../Global/Message/Contract/Transfer';

class WalletPanelFormTransfer extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      confirming: false,
      from: props.settings.account,
      memo: '',
      quantity: '',
      to: '',
      waiting: false
    };
  }

  state = {};

  onChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit(e);
    }
  }

  onSubmit = () => {
    this.setState({
      confirming: true,
      waiting: true
    });
    // Make the user wait 3 seconds before they can confirm
    setTimeout(() => {
      this.setState({
        waiting: false
      });
    }, 3000);
  }

  onCancel = (e) => {
    this.setState({
      confirming: false,
      waiting: false
    });
    e.preventDefault();
    return false;
  }

  onConfirm = (e) => {
    const {
      from,
      to,
      quantity,
      memo
    } = this.state;
    this.setState({ confirming: false }, () => {
      this.props.actions.transfer(from, to, quantity, memo);
    });
    e.preventDefault();
    return false;
  }

  render() {
    const {
      balances,
      onClose,
      settings,
      system,
      t
    } = this.props;
    const {
      confirming,
      from,
      memo,
      quantity,
      to,
      waiting
    } = this.state;
    const balance = balances[settings.account];
    const asset = 'EOS';
    const error = system.TRANSFER_LAST_ERROR;
    let errorMsg = JSON.stringify(error);
    if (error && error.error) {
      if (error.error.details[0]) {
        errorMsg = error.error.details[0].message;
      } else {
        errorMsg = t(error.error.name);
      }
    }
    if (error && error.message) {
      errorMsg = error.message;
    }
    // console.log(errorMsg)
    return (
      <Form
        loading={system.TRANSFER === 'PENDING'}
        onKeyPress={this.onKeyPress}
        onSubmit={this.onSubmit}
      >
        {(confirming)
          ? (
            <Segment basic clearing vertical>
              <Header size="small">
                {t('transfer_confirming_title')}
                <Header.Subheader>
                  {t('transfer_confirming_body')}
                </Header.Subheader>
              </Header>
              <Table compact definition striped>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell width={4}>{t('transfer_label_from')}</Table.Cell>
                    <Table.Cell>{from}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{t('transfer_label_to')}</Table.Cell>
                    <Table.Cell>{to}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{t('transfer_label_quantity')}</Table.Cell>
                    <Table.Cell>{quantity}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{t('transfer_label_memo')}</Table.Cell>
                    <Table.Cell>{memo}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <WalletMessageContractTransfer
                data={{
                  from,
                  quantity,
                  to,
                  transaction: {
                    delay: 60
                  }
                }}
              />
              <Divider />
              <Button
                onClick={this.onCancel}
              >
                <Icon name="x" /> {t('cancel')}
              </Button>
              <Button
                color={(waiting) ? 'grey' : 'green'}
                content={(waiting) ? t('waiting') : t('confirm')}
                disabled={waiting}
                floated="right"
                onClick={this.onConfirm}
              />
            </Segment>
          )
          : (
            <Segment basic clearing>
              <FormFieldAccount
                disabled
                label={t('transfer_label_from')}
                name="from"
                onChange={this.onChange}
                value={settings.account}
              />
              <FormFieldAccount
                autoFocus
                label={t('transfer_label_to')}
                name="to"
                onChange={this.onChange}
                value={to}
              />
              <FormFieldMultiToken
                assets={Object.keys(balances[settings.account])}
                icon="x"
                label={t('transfer_label_token_and_quantity')}
                loading={false}
                maximum={balance[asset]}
                name="quantity"
                onChange={this.onChange}
                value={quantity}
              />
              <FormFieldGeneric
                icon="x"
                label={t('transfer_label_memo')}
                loading={false}
                name="memo"
                onChange={this.onChange}
                value={memo}
              />

              {(error)
                ? (
                  <Message negative>
                    <Header>{t('error')}</Header>
                    {errorMsg}
                  </Message>
                )
                : ''
              }

              <Divider />
              <Button
                onClick={onClose}
              >
                <Icon name="x" /> {t('cancel')}
              </Button>
              <Button
                content={t('confirm')}
                floated="right"
                primary
              />
            </Segment>
          )
        }
      </Form>
    );
  }
}

export default translate('transfer')(WalletPanelFormTransfer);
