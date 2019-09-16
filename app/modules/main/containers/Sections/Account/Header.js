// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  withRouter
} from 'react-router-dom';

import { Button, Grid, Header, Progress, Segment, Table } from 'semantic-ui-react';

import GlobalFragmentWallet from '../../../../../shared/components/Global/Fragment/Wallet';
import GlobalAccountFragmentTokenBalance from '../../../../../shared/containers/Global/Account/Fragment/TokenBalance';

import range from 'lodash/range';

class AccountHeader extends Component<Props> {
  render() {
    const {
      connection,
      settings,
      t,
    } = this.props;
    console.log(connection.chainSymbol)
    return (
      <Segment stacked>
        <Grid divided>
          <Grid.Row>
            <Grid.Column width={4} textAlign="center">
              <GlobalFragmentWallet
                account={settings.account}
                authorization={settings.authorization}
                disableAvatar
                mode={settings.walletMode}
                size="large"
              />
            </Grid.Column>
            <Grid.Column width={12}>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={7} textAlign="center">
                    <Header color="green" size="large">
                      OK
                      <Header.Subheader>
                        Status
                      </Header.Subheader>
                    </Header>
                  </Grid.Column>
                  <Grid.Column width={2}></Grid.Column>
                  <Grid.Column width={7} textAlign="center">
                    <Header size="large">
                      <GlobalAccountFragmentTokenBalance
                        account={settings.account}
                        chainId={settings.chainId}
                        contract="eosio"
                        token={connection.chainSymbol}
                      />
                      {' '}
                      {connection.chainSymbol}
                      <Header.Subheader>
                        Available
                      </Header.Subheader>
                    </Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    connection: state.connection,
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({

    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountHeader));
