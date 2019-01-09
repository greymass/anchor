// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Accordion, Menu, Segment } from 'semantic-ui-react';

import WalletPanelButtonBroadcast from './Button/Broadcast';
import WalletPanelButtonLock from './Button/Lock';
import WalletPanelButtonStake from './Button/Stake';

import WalletPanelButtonTransferReceive from './Button/Transfer/Receive';
import WalletPanelButtonTransferSend from './Button/Transfer/Send';

import WalletPanelButtonRamSell from './Button/Ram/Sell';
import WalletPanelButtonRamBuy from './Button/Ram/Buy';

import WalletPanelButtonWithdraw from './Button/Withdraw';
import WalletPanelButtonCrosschainTransfer from './Button/CrosschainTransfer';

class WalletPanelUnlocked extends Component<Props> {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    const {
      actions,
      accounts,
      balances,
      blockchains,
      blockExplorers,
      connection,
      globals,
      validate,
      settings,
      system,
      transaction,
      t
    } = this.props;
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
                  {(settings.excludeForChainKey.includes(connection.chainKey))
                    ? false
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
                  <Segment>
                    <WalletPanelButtonTransferSend
                      actions={actions}
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
                  {(settings.excludeForChainKey.includes(connection.chainKey))
                    ? false
                    : (
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
                        />
                      </Segment>
                    )
                  }
                  {(settings.excludeForChainKey.includes(connection.chainKey))
                    ? false
                    : (
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
                        />
                      </Segment>
                    )
                  }
                  {(connection.supportedContracts.includes("withdraw"))
                    && (
                      <Segment>
                        <WalletPanelButtonWithdraw
                          actions={actions}
                          balances={balances}
                          blockchains={blockchains}
                          blockExplorers={blockExplorers}
                          connection={connection}
                          settings={settings}
                          system={system}
                          transaction={transaction}
                        />
                      </Segment>
                    )
                  }
                  {(connection.supportedContracts.includes("crosschaintransfer") || connection.chainSymbol === "EOS")
                    && (
                      <Segment>
                        <WalletPanelButtonCrosschainTransfer
                          actions={actions}
                          balances={balances}
                          blockchains={blockchains}
                          blockExplorers={blockExplorers}
                          connection={connection}
                          settings={settings}
                          system={system}
                          transaction={transaction}
                        />
                      </Segment>
                    )
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

export default translate('wallet')(WalletPanelUnlocked);
