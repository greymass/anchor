// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  withRouter
} from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';

import { Grid, Header, Segment } from 'semantic-ui-react';

import GlobalAccountFragmentTokenBalance from '../../../../../shared/containers/Global/Account/Fragment/TokenBalance';
import GlobalFragmentWallet from '../../../../../shared/components/Global/Fragment/Wallet';

class AccountHeader extends Component<Props> {
  render() {
    const {
      accounts,
      connection,
      settings,
      t,
    } = this.props;
    const account = accounts[settings.account];
    let warning;
    if (account) {
      const {
        cpu_limit,
        net_limit,
        ram_quota,
        ram_usage,
      } = account;
      if (
        cpu_limit.max === 0 // no staked CPU
        || cpu_limit.available / cpu_limit.max < 0.1 // CPU less than 10%
      ) {
        warning = 'cpu_low';
      }
      if (
        net_limit.max === 0 // no staked NET
        || net_limit.available / net_limit.max < 0.1 // NET less than 10%
      ) {
        warning = 'net_low';
      }
      if (((ram_quota - ram_usage) / ram_quota) < 0.1) {
        warning = 'ram_low';
      }
    }
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
                    <Header color={(warning) ? 'orange' : 'green'} size="large">
                      {(warning)
                        ? t(`global_resource_status_${warning}`)
                        : 'OK'
                      }
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
                        {t('main_sections_header_header_available')}
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
    accounts: state.accounts,
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

export default compose(
  withRouter,
  withTranslation('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(AccountHeader);
