// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Accordion, Menu, Popup, Segment } from 'semantic-ui-react';
import { get } from 'dot-prop-immutable';

import WalletPanelButtonBroadcast from './Button/Broadcast';
import WalletPanelButtonStake from './Button/Stake';

import WalletPanelButtonTransferReceive from './Button/Transfer/Receive';
import WalletPanelButtonTransferSend from './Button/Transfer/Send';

import WalletPanelButtonRamSell from './Button/Ram/Sell';
import WalletPanelButtonRamBuy from './Button/Ram/Buy';
import WalletPanelButtonWaxClaim from './Button/Wax/Claim';

class WalletPanelUnlocked extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      isWaxChain:
        props.connection.chainId ===
          '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
    };
  }

  componentDidMount() {
    const { actions, settings } = this.props;

    const { isWaxChain } = this.state;

    if (isWaxChain) {
      actions.getTable('eosio', settings.account, 'genesis');
    }
  }

  componentWillReceiveProps(nextProps) {
    const { connection } = this.props;

    if (connection.chainId !== nextProps.connection.chainId) {
      this.setState({
        isWaxChain:
          nextProps.connection.chainId ===
           '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4'
      });
    }
  }


  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;
    const {
      actions,
      accounts,
      app,
      balances,
      blockExplorers,
      chain,
      connection,
      globals,
      validate,
      settings,
      system,
      tables,
      transaction,
      t
    } = this.props;
    const {
      isWaxChain
    } = this.state;
    // Disable RAM markets on specific chains (Worbli)
    const disableRamMarket = (connection.chainId === '73647cde120091e0a4b85bced2f3cfdb3041e266cbbe95cee59b73235a1b3b6f');
    // Disable features based on distribution feature (BEOS)
    const distributionPeriod = get(chain, 'distributionPeriodInfo.beosDistribution', false);

    const isGenesisAccount = (get(tables, `eosio.${settings.account}.genesis.rows`) || []).length !== 0;
    const needsWaxClaimButton = isWaxChain && isGenesisAccount;

    if (!settings.account) return false;
    return (
      <div>
        <Segment vertical>
          <Accordion
            as={Menu}
            fluid
            vertical
          >
            <Menu.Item>
              <Accordion.Title
                active={activeIndex === 0}
                content={t('wallet_actions')}
                index={0}
                onClick={this.handleClick}
              />
              <Accordion.Content
                active={activeIndex === 0}
              >
                <Segment.Group>
                  {(distributionPeriod)
                    ? (
                      <Popup
                        content={t('beos_withdraw:disabled_for_distribution_period')}
                        inverted
                        position="right center"
                        trigger={(
                          <Segment>
                            <WalletPanelButtonStake
                              actions={actions}
                              accounts={accounts}
                              balances={balances}
                              blockExplorers={blockExplorers}
                              connection={connection}
                              disabled
                              validate={validate}
                              settings={settings}
                              system={system}
                            />
                          </Segment>
                        )}
                      />
                    )
                    : (
                      <Segment>
                        <WalletPanelButtonStake
                          actions={actions}
                          accounts={accounts}
                          balances={balances}
                          blockExplorers={blockExplorers}
                          connection={connection}
                          validate={validate}
                          settings={settings}
                          system={system}
                        />
                      </Segment>
                    )
                  }
                  {needsWaxClaimButton && (
                    <Segment>
                      <WalletPanelButtonWaxClaim
                        actions={actions}
                        app={app}
                        balances={balances}
                        blockExplorers={blockExplorers}
                        connection={connection}
                        settings={settings}
                        system={system}
                      />
                    </Segment>
                  )}
                  <Segment>
                    <WalletPanelButtonTransferSend
                      actions={actions}
                      app={app}
                      balances={balances}
                      blockExplorers={blockExplorers}
                      connection={connection}
                      settings={settings}
                      system={system}
                    />
                  </Segment>
                  <Segment>
                    <WalletPanelButtonTransferReceive
                      accountName={settings.account}
                    />
                  </Segment>
                  {(distributionPeriod)
                    ? (
                      <Popup
                        content={t('beos_withdraw:disabled_for_distribution_period')}
                        inverted
                        position="right center"
                        trigger={(
                          <Segment>
                            <WalletPanelButtonRamBuy
                              account={accounts[settings.account]}
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
                          account={accounts[settings.account]}
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
                              account={accounts[settings.account]}
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
                          account={accounts[settings.account]}
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
                  {(settings.walletMode === 'watch')
                    ? (
                      <Segment>
                        <WalletPanelButtonBroadcast
                          actions={actions}
                          blockExplorers={blockExplorers}
                          settings={settings}
                          system={system}
                          transaction={transaction}
                        />
                      </Segment>
                    )
                    : false
                  }
                </Segment.Group>
              </Accordion.Content>
            </Menu.Item>
            {(settings.walletMode === 'hot')
              ? (
                <Menu.Item>
                  <Accordion.Title
                    active={activeIndex === 1}
                    content={t('wallet_actions_advanced')}
                    index={1}
                    onClick={this.handleClick}
                  />
                  <Accordion.Content
                    active={activeIndex === 1}
                  >
                    <Segment basic>
                      <WalletPanelButtonBroadcast
                        actions={actions}
                        blockExplorers={blockExplorers}
                        settings={settings}
                        system={system}
                        transaction={transaction}
                      />
                    </Segment>
                  </Accordion.Content>
                </Menu.Item>
              )
              : false
            }
          </Accordion>
        </Segment>
      </div>
    );
  }
}

export default translate(['wallet', 'beos_withdraw'])(WalletPanelUnlocked);
