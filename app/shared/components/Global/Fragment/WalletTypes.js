// @flow
import React, { PureComponent } from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import { translate } from 'react-i18next';

export class GlobalFragmentWalletTypes extends PureComponent<Props> {
  render() {
    const {
      onChange,
      t
    } = this.props;
    return (
      <Grid divided="vertically" padded="vertically" stackable>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Header
              content="Hot Wallet"
              icon="lock"
              size="large"
              subheader="An account setup to perform actions on the blockchain using a locally encrypted private key. The security of a hot wallet is equal to the security of the computer."
            />
          </Grid.Column>
          <Grid.Column verticalAlign="middle" textAlign="center">
            <p>Import a private key to create a Hot Wallet.</p>
            <Button
              content="Import Private Key"
              icon="lock"
              onClick={onChange}
              primary
              size="large"
              value={1}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Header
              content="Hardware Wallet"
              icon="usb"
              size="large"
              subheader="An account that has been configured to use a hardware signing device. All keys are stored on the device and not on this computer."
            />
          </Grid.Column>
          <Grid.Column verticalAlign="middle" textAlign="center">
            <p>Load the public key(s) from a device to create a Ledger Wallet.</p>
            <Button
              content="Load Public Keys"
              icon="usb"
              onClick={onChange}
              primary
              size="large"
              value={2}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Header
              content="Watch Wallet"
              icon="eye"
              size="large"
              subheader="An account that cannot interact with the blockchain, but can monitor the account and create unsigned transactions for a cold wallet."
            />
          </Grid.Column>
          <Grid.Column verticalAlign="middle" textAlign="center">
            <p>Specify any account name to create a new watch wallet.</p>
            <Button
              content="Create Watch Wallet"
              icon="eye"
              onClick={onChange}
              primary
              size="large"
              value={3}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default translate('global')(GlobalFragmentWalletTypes);
