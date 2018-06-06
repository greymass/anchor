// @flow
import React, { Component } from 'react';
import { Button, Divider, Form, Header, Icon, Message, Segment, Table } from 'semantic-ui-react';
import { I18n } from 'react-i18next';

import FormFieldAccount from '../../../Form/Field/Account';
import FormFieldGeneric from '../../../Form/Field/Generic';
import FormFieldToken from '../../../Form/Field/Token';

export default class WalletPanelFormTransfer extends Component<Props> {
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
      system
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
    const error = system.TRANSFER_LAST_ERROR;
    return (
      <I18n ns="transfer">
        {
          (t) => (
            <Form
              loading={system.TRANSFER === 'PENDING'}
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
                    <Message notice>
                      <Header icon="warning sign">
                        {t('transfer_warning_irreversible_title')}
                      </Header>
                      <p>{t('transfer_warning_irreversible_body')}</p>
                    </Message>
                    <Divider />
                    <Button
                      onClick={onClose}
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
                    <FormFieldToken
                      icon="x"
                      label={t('transfer_label_quantity')}
                      loading={false}
                      maximum={balance.EOS}
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
                          {JSON.stringify(error)}
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
          )
        }
      </I18n>
    );
  }
}
