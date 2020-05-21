// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { get } from 'dot-prop-immutable';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import { Grid, Header, Popup, Segment } from 'semantic-ui-react';

import WalletPanelButtonRamBuy from '../../../../../shared/components/Wallet/Panel/Button/Ram/Buy';
import WalletPanelButtonRamSell from '../../../../../shared/components/Wallet/Panel/Button/Ram/Sell';
import GlobalAccountRequired from '../../../../../shared/containers/Global/Account/Required';

import * as BuyRamBytesActions from '../../../../../shared/actions/system/buyrambytes';
import * as BuyRamActions from '../../../../../shared/actions/system/buyram';
import * as SellRamActions from '../../../../../shared/actions/system/sellram';
import { clearSystemState } from '../../../../../shared/actions/system/systemstate';
import { getContractHash } from '../../../../../shared/actions/accounts';
import { getRamStats } from '../../../../../shared/actions/globals';
import { setStake } from '../../../../../shared/actions/stake';
import { transfer } from '../../../../../shared/actions/transfer';

class WalletRamContainer extends Component<Props> {
  onClose = () => this.props.actions.clearSystemState()
  render() {
    const {
      account,
      actions,
      balances,
      blockExplorers,
      chain,
      connection,
      globals,
      settings,
      system,
      t,
    } = this.props;
    // Disable RAM markets on specific chains (Worbli)
    const disableRamMarket = (connection.chainId === '73647cde120091e0a4b85bced2f3cfdb3041e266cbbe95cee59b73235a1b3b6f');
    // Disable features based on distribution feature (BEOS)
    const distributionPeriod = get(chain, 'distributionPeriodInfo.beosDistribution', false);
    return (
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={10}>
            <Segment color="blue" piled>
              <Header>
                {t('main_sections_wallet_ram_header')}
                <Header.Subheader>
                  {t('main_sections_wallet_ram_subheader')}
                </Header.Subheader>
              </Header>
              <GlobalAccountRequired>
                {(distributionPeriod)
                  ? (
                    <Popup
                      content={t('beos_withdraw:disabled_for_distribution_period')}
                      inverted
                      position="right center"
                      trigger={(
                        <Segment>
                          <WalletPanelButtonRamBuy
                            account={account}
                            actions={actions}
                            balances={balances}
                            blockExplorers={blockExplorers}
                            connection={connection}
                            disabled
                            globals={globals}
                            settings={settings}
                            system={system}
                          />
                        </Segment>
                      )}
                    />
                  )
                  : false
                }
                {(!distributionPeriod && !disableRamMarket)
                  ? (
                    <Segment>
                      <WalletPanelButtonRamBuy
                        account={account}
                        actions={actions}
                        balances={balances}
                        blockExplorers={blockExplorers}
                        connection={connection}
                        globals={globals}
                        settings={settings}
                        system={system}
                        disabled={false}
                      />
                    </Segment>
                  )
                  : false
                }
                {(distributionPeriod)
                  ? (
                    <Popup
                      content={t('beos_withdraw:disabled_for_distribution_period')}
                      inverted
                      position="right center"
                      trigger={(
                        <Segment>
                          <WalletPanelButtonRamSell
                            account={account}
                            actions={actions}
                            balances={balances}
                            blockExplorers={blockExplorers}
                            connection={connection}
                            disabled
                            globals={globals}
                            settings={settings}
                            system={system}
                          />
                        </Segment>
                      )}
                    />
                  )
                  : false
                }
                {(!distributionPeriod && !disableRamMarket)
                  ? (
                    <Segment>
                      <WalletPanelButtonRamSell
                        account={account}
                        actions={actions}
                        balances={balances}
                        blockExplorers={blockExplorers}
                        connection={connection}
                        globals={globals}
                        settings={settings}
                        system={system}
                        disabled={false}
                      />
                    </Segment>
                  )
                  : false
                }
              </GlobalAccountRequired>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
    globals: state.globals,
    settings: state.settings,
    system: state.system,
    validate: state.validate,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...BuyRamBytesActions,
      ...BuyRamActions,
      ...SellRamActions,
      clearSystemState,
      getContractHash,
      getRamStats,
      setStake,
      transfer,
    }, dispatch)
  };
}


export default compose(
  withRouter,
  withTranslation('main'),
  connect(mapStateToProps, mapDispatchToProps)
)(WalletRamContainer);
