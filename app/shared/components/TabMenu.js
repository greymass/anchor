// @flow
import React, { Component } from 'react';
import { Label,Menu } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import { find } from 'lodash';

import GlobalAccountDropdown from '../containers/Global/Account/Dropdown';
import GlobalBlockchainDropdown from '../containers/Global/Blockchain/Dropdown';
import GlobalHardwareLedgerStatus from '../containers/Global/Hardware/Ledger/Status';
import WalletLockState from './Wallet/LockState';
import WalletMode from './Wallet/Mode';
import logo from '../../renderer/assets/images/greymass.png';

class TabMenu extends Component<Props> {
  render() {
    const {
      actions,
      activeItem,
      handleItemClick,
      locked,
      settings,
      validate,
      wallet,
      t
    } = this.props;
    return (
      <Menu
        attached
        inverted
        size="large"
        className="fixed top sticky"
      >
        {(settings.walletInit)
          ? (
            <React.Fragment>
              <GlobalBlockchainDropdown />
              <GlobalAccountDropdown />
            </React.Fragment>
          )
          : false
        }
        {(!settings.walletInit && settings.account)
          ? (
            <Menu.Item
              name="account"
              icon="id card"
              content={settings.account}
            />
          )
          : false
        }
        {(settings.walletMode !== 'cold')
          ? (
            <Menu.Item
              name="producers"
              icon="check square"
              content={t('producer_voting')}
              active={activeItem === 'producers'}
              onClick={handleItemClick}
            />
          )
          : false
        }
        {(settings.account || settings.walletMode === 'wait')
          ? (
            <Menu.Item
              name="wallet"
              icon="protect"
              content={t('wallet')}
              active={activeItem === 'wallet'}
              onClick={handleItemClick}
            />
          )
          : false
        }
        {(settings.walletMode !== 'wait')
          ? (
            <Menu.Item
              name="tools"
              icon="cog"
              content={t('tools')}
              active={activeItem === 'tools'}
              onClick={handleItemClick}
            />
          )
          : false
        }
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
          <Menu.Item
            name="about"
            position="right"
            active={activeItem === 'about'}
            onClick={handleItemClick}
          >
            <img alt="Greymass" src={logo} />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default translate('menu')(TabMenu);
