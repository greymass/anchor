// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Dropdown, Header, Menu } from 'semantic-ui-react';
import { forEach } from 'lodash';
import Blockies from 'react-blockies';

import * as AccountsActions from '../../../shared/actions/accounts';
import * as AppActions from '../../../shared/actions/app';
import * as BlockExplorersActions from '../../../shared/actions/blockexplorers';
// import * as BuyRamBytesActions from '../../../shared/actions/system/buyrambytes';
// import * as BuyRamActions from '../../../shared/actions/system/buyram';
import * as ChainActions from '../../../shared/actions/chain';
// import * as ConnectionActions from '../../../shared/actions/connection';
// import * as ContractsActions from '../../../shared/actions/contracts';
// import * as CreateAccountActions from '../../../shared/actions/createaccount';
import * as GlobalsActions from '../../../shared/actions/globals';
// import * as ProducersActions from '../../../shared/actions/producers';
// import * as ProposalsActions from '../../../shared/actions/governance/proposals';
// import * as SellRamActions from '../../../shared/actions/system/sellram';
// import * as SettingsActions from '../../../shared/actions/settings';
// import * as StakeActions from '../../../shared/actions/stake';
// import * as TableActions from '../../../shared/actions/table';
// import * as TransactionActions from '../../../shared/actions/transaction';
// import * as TransferActions from '../../../shared/actions/transfer';
// import * as ValidateActions from '../../../shared/actions/validate';
// import * as VoteProducerActions from '../../../shared/actions/system/voteproducer';
// import * as WalletActions from '../../../shared/actions/wallet';
// import * as SystemStateActions from '../../../shared/actions/system/systemstate';
// import * as BEOSWithdrawActions from '../../../shared/actions/blockchains/beos/withdraw';

import GlobalAccountDropdown from '../../../shared/containers/Global/Account/Dropdown';
import GlobalBlockchainDropdown from '../../../shared/containers/Global/Blockchain/Dropdown';
import GlobalHardwareLedgerStatus from '../../../shared/containers/Global/Hardware/Ledger/Status';
import WalletLockState from '../../../shared/components/Wallet/LockState';
import WalletMode from '../../../shared/components/Wallet/Mode';
import logo from '../../../renderer/assets/images/greymass.png';

const accounts = [
  {
    key: 'developjesta@owner',
    text: 'developjesta@owner',
    value: 'developjesta@owner',
  },
  {
    key: 'developjesta@active',
    text: 'developjesta@active',
    value: 'developjesta@active',
  },
  {
    key: 'teamgreymass@active',
    text: 'teamgreymass@active',
    value: 'teamgreymass@active',
  },
];

class MenuContainer extends Component<Props> {
  componentDidMount() {
    const {
      actions,
      history,
      settings
    } = this.props;

    const {
      getBlockExplorers,
      getCurrencyStats,
      initApp
    } = actions;

    initApp();

    switch (settings.walletMode) {
      case 'cold': {
        history.push('/coldwallet');
        break;
      }
      default: {
        if (!settings.walletInit && !settings.skipImport && !settings.walletTemp) {
          history.push('/');
        } else {
          getCurrencyStats();
          getBlockExplorers();
          forEach(settings.customTokens, (token) => {
            const [chainId, contract, symbol] = token.split(':');
            if (chainId === settings.chainId) {
              getCurrencyStats(contract, symbol.toUpperCase());
            }
          });
        }
      }
    }
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    const {
      actions,
      settings,
      validate
    } = this.props;
    const {
      getAccount,
      getConstants,
      getGlobals,
      getInfo
    } = actions;
    if (validate.NODE === 'SUCCESS') {
      if (settings.account) {
        getAccount(settings.account);
      }
      getConstants();
      getGlobals();
      getInfo();
    }
  }
  render() {
    const {
      settings,
      actions,
      locked,
      validate,
      wallet,
    } = this.props;
    return (
      <Menu
        fixed="top"
        style={{
          border: 'none',
          borderBottom: '1px solid rgba(34,36,38,.15)',
        }}
      >
        <GlobalBlockchainDropdown
          style={{
            marginLeft: '107px',
            paddingLeft: '1.5rem'
          }}
        />
        <Dropdown
          labeled
          item
          trigger={(
            <React.Fragment>
              <Header
                size="tiny"
                style={{
                  margin: 0
                }}
              >
                <Blockies
                  className="ui image"
                  seed="greymassvote@active"
                />
                <Header.Content>
                  greymassvote
                  <Header.Subheader>
                    watch / active
                  </Header.Subheader>
                </Header.Content>
              </Header>
            </React.Fragment>
          )}
        >
          <Dropdown.Menu>
            {accounts.map(option => {
              const [accountName, permission] = option.value.split('@');
              return (
                <Dropdown.Item key={option.value}>
                  <Header
                    size="tiny"
                    style={{
                      margin: 0
                    }}
                  >
                    <Blockies
                      className="ui image"
                      seed={option.value}
                    />
                    <Header.Content>
                      {accountName}
                      <Header.Subheader>
                        {permission} / watch
                      </Header.Subheader>
                    </Header.Content>
                  </Header>
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Menu position="right">
          <WalletMode
            settings={settings}
          />
          <WalletLockState
            actions={actions}
            key="lockstate"
            locked={locked}
            validate={validate}
            wallet={wallet}
          />
          <GlobalHardwareLedgerStatus />
        </Menu.Menu>
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
    actions: state.actions,
    locked: state.locked,
    validate: state.validate,
    wallet: state.wallet,
    prompt: state.prompt,
    system: state.system,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountsActions,
      ...AppActions,
      ...BlockExplorersActions,
      ...ChainActions,
      ...GlobalsActions,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuContainer));
