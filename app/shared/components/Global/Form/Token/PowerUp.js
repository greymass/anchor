// @flow
import React, { Component } from 'react';
import { Button, Checkbox, Header, Form, Grid, Table } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';

import GlobalAccountFragmentPowerUpPrice from '../../../../containers/Global/Account/Fragment/PowerUp/Price';
import GlobalAccountFragmentTokenBalance from '../../../../containers/Global/Account/Fragment/TokenBalance';
import GlobalFormFieldGeneric from '../../../../components/Global/Form/Field/Generic';

export class GlobalFormTokenPowerUp extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      rentBoth: true,
      value: false,
      valid: false,
    };
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
    const { sample, resource, pstate } = this.props;
    const { actions } = this.props;
    const { rentBoth, valid, value } = this.state;
    if (valid) {
      actions.powerup(sample, pstate, value, resource, rentBoth);
    }
  }
  toggleRentBoth = () => this.setState({ rentBoth: !this.state.rentBoth })
  render() {
    const {
      account,
      connection,
      resource,
      processing,
      sample,
      pstate,
      settings,
    } = this.props;
    const {
      rentBoth,
      valid,
      value,
    } = this.state;
    const unit = resource === 'cpu' ? 'ms' : 'kb';
    return (
      <Form loading={processing} onKeyPress={this.onKeyPress}>
        <Grid padded="horizontally">
          <Grid.Row columns={2}>
            <Grid.Column>
              <GlobalFormFieldGeneric
                autoFocus
                connection={connection}
                key="amount"
                label={(
                  <div style={{ marginBottom: '1em' }}>
                    <Header>
                      Rent {resource.toUpperCase()} via PowerUp
                      <Header.Subheader>
                        Enter the amount of {unit} you would like to rent.
                        {' '}
                        The rental will expire after 24 hours.
                      </Header.Subheader>
                    </Header>
                  </div>
                )}
                name="amount"
                onChange={this.onChange}
              />
              <Checkbox
                checked={rentBoth}
                label={`Include a small amount of ${(resource === 'cpu') ? 'NET' : 'CPU'} resources.`}
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
                Estimate
                <Header.Subheader>
                  <GlobalAccountFragmentPowerUpPrice
                    amount={value || 1}
                    detailed
                    pstate={pstate}
                    rentBoth={rentBoth}
                    resource={resource}
                    sample={sample}
                    symbol={[connection.tokenPrecision, connection.chainSymbol].join(',')}
                    unit={unit}
                  />
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
