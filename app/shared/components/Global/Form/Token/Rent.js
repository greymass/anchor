// @flow
import React, { Component } from 'react';
import { Button, Header, Form, Grid, Table } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';
import { Asset } from '@greymass/eosio';

import GlobalAccountFragmentREXPrice from '../../../../containers/Global/Account/Fragment/REX/Price';
import GlobalAccountFragmentTokenBalance from '../../../../containers/Global/Account/Fragment/TokenBalance';
import GlobalFormFieldGeneric from '../../../../components/Global/Form/Field/Generic';

export class GlobalFormTokenRent extends Component<Props> {
  state = {
    value: false,
    valid: false,
  }
  onChange = (e, { value }) => {
    const { connection, rstate, sample } = this.props;
    let valid = false;
    if (value > 0) {
      const price = rstate.price_per(sample, Number(value) * 1000);
      const asset = Asset.from(price, `${connection.tokenPrecision},${connection.chainSymbol}`);
      if (asset.value > 0) {
        valid = true;
      }
    }
    this.setState({
      value,
      valid
    });
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
    const { resource, rstate, sample } = this.props;
    const { depositrentcpu, depositrentnet } = this.props.actions;
    const { valid, value } = this.state;
    if (valid) {
      switch (resource) {
        default:
        case 'cpu':
          depositrentcpu(value, rstate, sample);
          break;
        case 'net':
          depositrentnet(value, rstate, sample);
          break;
      }
    }
  }
  render() {
    const {
      account,
      connection,
      resource,
      rstate,
      processing,
      sample,
      settings,
    } = this.props;
    const {
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
                  <Header>
                    Rent {resource.toUpperCase()} via REX
                    <Header.Subheader>
                      Enter the amount of {unit} you would like to rent.
                      {' '}
                      This amount will be usable each day for a period of 30-days.
                    </Header.Subheader>
                  </Header>
                )}
                name="amount"
                onChange={this.onChange}
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
                Cost Estimate
                <Header.Subheader>
                  <GlobalAccountFragmentREXPrice
                    amount={value || 1}
                    detailed
                    resource={resource}
                    rstate={rstate}
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

export default withTranslation('global')(GlobalFormTokenRent);
