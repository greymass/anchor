// @flow
import React, { Component } from 'react';
import { Button, Header, Form, Grid, Table } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import GlobalAccountFragmentResourceStakedDelegated from '../../../../containers/Global/Account/Fragment/Resource/Staked/Delegated';
import GlobalAccountFragmentResourceStakedSelf from '../../../../containers/Global/Account/Fragment/Resource/Staked/Self';
import GlobalFormFieldToken from '../../../../components/Global/Form/Field/Token';

export class GlobalFormTokenUnstake extends Component<Props> {
  state = {
    value: false,
    valid: false,
  }
  onChange = (e, { value, valid }) => this.setState({ value, valid });
  onCancel = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit(e);
      e.preventDefault();
      return false;
    }
  }
  onSubmit = () => {
    const { account, resource } = this.props;
    const { undelegatebw } = this.props.actions;
    const { valid, value } = this.state;
    if (valid) {
      switch (resource) {
        default:
        case 'cpu':
          undelegatebw(account, account, false, value);
          break;
        case 'net':
          undelegatebw(account, account, value, false);
          break;
      }
    }
  }
  render() {
    const {
      account,
      connection,
      processing,
      resource,
    } = this.props;
    const {
      valid,
    } = this.state;
    return (
      <Form loading={processing} onKeyPress={this.onKeyPress}>
        <Grid padded="horizontally">
          <Grid.Row columns={2}>
            <Grid.Column>
              <GlobalFormFieldToken
                autoFocus
                connection={connection}
                key="amount"
                label={(
                  <Header>
                    Remove Tokens
                    <Header.Subheader>
                      Enter the amount of tokens you would like to remove
                      {' '}
                      from your staked {resource.toUpperCase()} balance.
                    </Header.Subheader>
                  </Header>
                )}
                name="amount"
                onChange={this.onChange}
              />
            </Grid.Column>
            <Grid.Column>
              <Table definition textAlign="right">
                <Table.Row>
                  <Table.Cell>Account</Table.Cell>
                  <Table.Cell>
                    {account}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Staked {resource.toUpperCase()} Tokens</Table.Cell>
                  <Table.Cell>
                    <GlobalAccountFragmentResourceStakedSelf
                      account={account}
                      chainId={connection.chainId}
                      contract="eosio"
                      token={connection.chainSymbol}
                      type={resource}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Other {resource.toUpperCase()} Tokens</Table.Cell>
                  <Table.Cell>
                    <GlobalAccountFragmentResourceStakedDelegated
                      account={account}
                      chainId={connection.chainId}
                      contract="eosio"
                      token={connection.chainSymbol}
                      type={resource}
                    />
                  </Table.Cell>
                </Table.Row>
              </Table>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Button
                content="Cancel"
                onClick={this.onCancel}
              />
            </Grid.Column>
            <Grid.Column>
              <Button
                content="Stake"
                disabled={!valid}
                floated="right"
                icon="circle plus"
                primary
                onClick={this.onSubmit}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }
}

export default translate('global')(GlobalFormTokenUnstake);
