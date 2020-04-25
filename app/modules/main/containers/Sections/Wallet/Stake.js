// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { get } from 'dot-prop-immutable';
import { Decimal } from 'decimal.js';

import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import { withTranslation } from 'react-i18next';

import { Grid, Header, Segment } from 'semantic-ui-react';

import GlobalTransactionHandler from '../../../../../shared/components/Global/Transaction/Handler';
import WalletPanelFormStake from '../../../../../shared/components/Wallet/Panel/Form/Stake';
import GlobalAccountRequired from '../../../../../shared/containers/Global/Account/Required';

import { clearSystemState } from '../../../../../shared/actions/system/systemstate';
import { getContractHash } from '../../../../../shared/actions/accounts';
import { setStake } from '../../../../../shared/actions/stake';
import { transfer } from '../../../../../shared/actions/transfer';

class WalletStakeContainer extends Component<Props> {
  render() {
    const {
      account,
      actions,
      balances,
      blockExplorers,
      chain,
      connection,
      settings,
      system,
      t,
      validate,
    } = this.props;
    const distributionPeriod = get(chain, 'distributionPeriodInfo.beosDistribution', false);
    if (distributionPeriod) {
      return (
        <Segment
          content="disabled"
        />
      );
    }
    const transaction = system.STAKE_LAST_TRANSACTION;
    let cpu_weight = 0;
    let net_weight = 0;
    if (account) {
      ({
        cpu_weight,
        net_weight
      } = account.self_delegated_bandwidth);
    }
    return (
      <React.Fragment>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={10}>
              <Segment color="blue" piled>
                <Header>
                  {t('main_components_wallet_stake_header')}
                  <Header.Subheader>
                    {t('main_components_wallet_stake_subheader')}
                  </Header.Subheader>
                </Header>
                <GlobalAccountRequired>
                  <GlobalTransactionHandler
                    actionName="STAKE"
                    actions={actions}
                    blockExplorers={blockExplorers}
                    content={(
                      <WalletPanelFormStake
                        account={account}
                        accountName={settings.account}
                        actions={actions}
                        balance={balances[settings.account]}
                        connection={connection}
                        cpuAmount={Decimal(String(cpu_weight).split(' ')[0])}
                        netAmount={Decimal(String(net_weight).split(' ')[0])}
                        onClose={this.onClose}
                        settings={settings}
                        system={system}
                        validate={validate}
                      />
                    )}
                    icon="microchip"
                    onClose={actions.clearSystemState}
                    title={t('main_components_wallet_stake_transaction_title')}
                    settings={settings}
                    system={system}
                    transaction={transaction}
                  />
                </GlobalAccountRequired>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    account: get(state, `accounts.${state.settings.account}`),
    app: state.app,
    balances: state.balances,
    chain: state.chain,
    connection: state.connection,
    settings: state.settings,
    system: state.system,
    validate: state.validate,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      clearSystemState,
      getContractHash,
      setStake,
      transfer,
    }, dispatch)
  };
}

export default compose(
  withRouter,
  withTranslation('main'),
  connect(mapStateToProps, mapDispatchToProps)
)(WalletStakeContainer);
