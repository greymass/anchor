// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Accordion, Menu, Segment } from 'semantic-ui-react';

import GlobalButtonResetContainer from '../../../containers/Global/Button/Reset';
import WalletPanelButtonBroadcast from './Button/Broadcast';
import WalletPanelButtonLock from './Button/Lock';
import WalletPanelButtonStake from './Button/Stake';

import WalletPanelButtonTransferReceive from './Button/Transfer/Receive';
import WalletPanelButtonTransferSend from './Button/Transfer/Send';


export default class WalletPanelUnlocked extends Component<Props> {
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
      validate,
      settings,
      system,
      transaction
    } = this.props;
    return (
      <I18n ns="wallet">
        {
          (t) => (
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
          )
        }
      </I18n>
    );
  }
}
