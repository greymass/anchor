// @flow
import React, { Component } from 'react';
import { Button, Header, Form, Grid, Table } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import GlobalAccountFragmentResourceStakedDelegated from '../../../../containers/Global/Account/Fragment/Resource/Staked/Delegated';
import GlobalAccountFragmentResourceStakedSelf from '../../../../containers/Global/Account/Fragment/Resource/Staked/Self';
import GlobalAccountFragmentREXPrice from '../../../../containers/Global/Account/Fragment/REX/Price';
import GlobalAccountFragmentTokenBalance from '../../../../containers/Global/Account/Fragment/TokenBalance';
import GlobalFormFieldToken from '../../../../components/Global/Form/Field/Token';

export class GlobalFormTokenRent extends Component<Props> {
  state = {
    value: false,
    valid: false,
  }
  onChange = (e, { value, valid }) => {
    this.setState({ value, valid });
  }
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
    const { resource } = this.props;
    const { depositrentcpu, depositrentnet } = this.props.actions;
    const { valid, value } = this.state;
    if (valid) {
      switch (resource) {
        default:
        case 'cpu':
          depositrentcpu(value);
          break;
        case 'net':
          depositrentnet(value);
          break;
      }
    }
  }
  render() {
    const {
      account,
      connection,
      resource,
      processing,
      settings,
    } = this.props;
    const {
      valid,
      value,
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
                    Rent {resource.toUpperCase()} via REX
                    <Header.Subheader>
                      Enter the amount of {connection.chainSymbol} to pay in order to rent
                      {' '}
                      {resource.toUpperCase()} resources for a period of 30-days.
                    </Header.Subheader>
                  </Header>
                )}
                name="amount"
                onChange={this.onChange}
              />
              <Header size="small">
                Cost Estimate
                <Header.Subheader>
                  <GlobalAccountFragmentREXPrice
                    amount={valid ? value : 0.1}
                    detailed
                    resource={resource}
                    symbol={connection.chainSymbol}
                  />
                </Header.Subheader>
              </Header>
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
                  <Table.Cell>Available Tokens</Table.Cell>
                  <Table.Cell>
                    <GlobalAccountFragmentTokenBalance
                      account={settings.account}
                      chainId={settings.chainId}
                      contract="eosio"
                      token={connection.chainSymbol}
                    />
                    {` ${connection.chainSymbol}`}
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
                color="green"
                content={`Rent ${resource.toUpperCase()}`}
                disabled={!valid}
                floated="right"
                icon="exchange"
                onClick={this.onSubmit}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }
}

export default translate('global')(GlobalFormTokenRent);
