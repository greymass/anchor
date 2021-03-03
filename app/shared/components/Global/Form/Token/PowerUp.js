// @flow
import React, { Component } from 'react';
import { Button, Checkbox, Header, Form, Grid, Table } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';

import GlobalAccountFragmentResourceStakedDelegated from '../../../../containers/Global/Account/Fragment/Resource/Staked/Delegated';
import GlobalAccountFragmentResourceStakedSelf from '../../../../containers/Global/Account/Fragment/Resource/Staked/Self';
import GlobalAccountFragmentPowerUpPrice from '../../../../containers/Global/Account/Fragment/PowerUp/Price';
import GlobalAccountFragmentTokenBalance from '../../../../containers/Global/Account/Fragment/TokenBalance';
import GlobalFormFieldToken from '../../../../components/Global/Form/Field/Token';

export class GlobalFormTokenPowerUp extends Component<Props> {
  state = {
    rentBoth: false,
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
    const { resource, pstate } = this.props;
    const { actions } = this.props;
    const { rentBoth, valid, value } = this.state;
    if (valid) {
      actions.powerup(pstate, value, resource, rentBoth);
    }
  }
  toggleRentBoth = () => this.setState({ rentBoth: !this.state.rentBoth })
  render() {
    const {
      account,
      connection,
      resource,
      powerup,
      processing,
      settings,
    } = this.props;
    const {
      rentBoth,
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
                  <div style={{ marginBottom: '1em' }}>
                    <Header>
                      Rent {resource.toUpperCase()} via PowerUp
                      <Header.Subheader>
                        Enter the amount of {connection.chainSymbol} tokens you would like to pay to rent
                        {' '}
                        {resource.toUpperCase()} resources for a period of 24-hours.
                      </Header.Subheader>
                    </Header>
                  </div>
                )}
                name="amount"
                onChange={this.onChange}
              />
              <Checkbox
                checked={rentBoth}
                label={`Use 5% of amount to also rent ${(resource === 'cpu') ? 'NET' : 'CPU'} resources.`}
                onChange={this.toggleRentBoth}
              />
            </Grid.Column>
            <Grid.Column>
              <Table definition textAlign="right">
                <Table.Body>
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
                </Table.Body>
              </Table>
              <Header size="small">
                Resource Estimate
                <Header.Subheader>
                  <GlobalAccountFragmentPowerUpPrice
                    amount={valid ? value : 0.1}
                    detailed
                    powerup={powerup}
                    resource={resource}
                    symbol={connection.chainSymbol}
                  />
                </Header.Subheader>
                <Header.Subheader style={{ marginTop: '1em' }}>
                  <p>Based on an estimated price of {String(powerup)}/{resource === 'cpu' ? '1ms' : '1kb'}</p>
                </Header.Subheader>
              </Header>
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

export default withTranslation('global')(GlobalFormTokenPowerUp);
