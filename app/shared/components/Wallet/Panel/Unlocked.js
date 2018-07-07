// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Accordion, Menu, Segment } from 'semantic-ui-react';

import GlobalButtonResetContainer from '../../../containers/Global/Button/Reset';
import WalletPanelButtonBroadcast from './Button/Broadcast';
import WalletPanelButtonLock from './Button/Lock';
import WalletPanelButtonStake from './Button/Stake';

import WalletPanelButtonTransferReceive from './Button/Transfer/Receive';
import WalletPanelButtonTransferSend from './Button/Transfer/Send';

import WalletPanelButtonRamSell from './Button/Ram/Sell';
import WalletPanelButtonRamBuy from './Button/Ram/Buy';

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
      globals,
      validate,
      settings,
      system,
      transaction,
      t
    } = this.props;
    return (
      <div>
        {(settings.walletMode !== 'watch' && !settings.walletTemp)
          ? (
            <WalletPanelButtonLock
              lockWallet={actions.lockWallet}
            />
          )
          : ''
        }
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
                  <Segment>
                    <WalletPanelButtonStake
                      actions={actions}
                      accounts={accounts}
                      balances={balances}
                      validate={validate}
                      settings={settings}
                      system={system}
                    />
                  </Segment>
                  <Segment>
                    <WalletPanelButtonTransferSend
                      actions={actions}
                      balances={balances}
                      settings={settings}
                      system={system}
                    />
                  </Segment>
                  <Segment>
                    <WalletPanelButtonTransferReceive
                      accountName={settings.account}
                    />
                  </Segment>
                  <Segment>
                    <WalletPanelButtonRamBuy
                      account={accounts[settings.account]}
                      actions={actions}
                      balances={balances}
                      globals={globals}
                      settings={settings}
                      system={system}
                    />
                  </Segment>
                  <Segment>
                    <WalletPanelButtonRamSell
                      account={accounts[settings.account]}
                      actions={actions}
                      balances={balances}
                      globals={globals}
                      settings={settings}
                      system={system}
                    />
                  </Segment>
                  {(settings.walletMode === 'watch')
                    ? (
                      <Segment>
                        <WalletPanelButtonBroadcast
                          actions={actions}
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

            <Menu.Item>
              <Accordion.Title
                active={activeIndex === 1}
                content={t('wallet_actions_dangerous')}
                index={1}
                onClick={this.handleClick}
              />
              <Accordion.Content
                active={activeIndex === 1}
              >
                <Segment basic>
                  <GlobalButtonResetContainer />
                </Segment>
              </Accordion.Content>
            </Menu.Item>
          </Accordion>
        </Segment>
      </div>
    );
  }
}

export default translate('wallet')(WalletPanelUnlocked);
