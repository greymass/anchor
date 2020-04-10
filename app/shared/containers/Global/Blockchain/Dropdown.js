// @flow
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { find } from 'lodash';
import { Button, Dropdown, Header, Icon, Input, Segment, Tab } from 'semantic-ui-react';

import GlobalButtonElevate from '../Button/Elevate';
import GlobalFragmentChainLogo from '../../../components/Global/Fragment/ChainLogo';
import * as BlockchainsActions from '../../../actions/blockchains';
import * as WalletActions from '../../../actions/wallet';
import * as WalletsActions from '../../../actions/wallets';

class GlobalBlockchainDropdown extends PureComponent<Props> {
  state = { open: false }
  onClose = () => {
    this.setState({ open: false });
  }
  onOpen = () => {
    this.setState({ open: true });
  }
  onToggle = () => {
    this.setState({ open: !this.state.open });
  }
  swapBlockchain = (chainId) => {
    const { actions } = this.props;
    actions.swapBlockchain(chainId);
    // if (password) {
    //   actions.unlockWallet(password);
    // }
  }
  render() {
    const {
      blockchains,
      disabled,
      fluid,
      selected,
      selection,
      settings,
      showName,
      style,
      t,
    } = this.props;
    let defaultLocString = 'global_account_select_blockchain_default';
    if (settings.walletMode === 'cold') {
      defaultLocString = 'global_account_select_blockchain_default_cold';
    }
    const { chainId } = settings;
    if (!blockchains) return false;
    let blockchain = find(blockchains, { chainId });
    if (!blockchain) {
      blockchain = {};
    }
    if (selected) {
      blockchain = find(blockchains, { chainId: selected });
    }
    const { displayTestNetworks } = settings;
    const options = blockchains
      .filter(b => (
        (
          (true && b.testnet)
          || !b.testnet
        )
        && b.chainId !== blockchain.chainId
      ))
      .sort((a, b) => a.name > b.name)
      .map((b) => {
        const image = <GlobalFragmentChainLogo avatar chainId={b.chainId} name={b.name} />;
        return {
          props: {
            image,
            key: b.chainId,
            onClick: () => this.swapBlockchain(b.chainId),
            text: `${b.name} ${(b.testnet ? '(TESTNET)' : '')}`,
            value: b.chainId,
          },
          b
        };
      });
    let icon = {
      color: 'green',
      name: 'id card'
    };
    const trigger = (
      <span>
        <GlobalFragmentChainLogo
          chainId={blockchain.chainId}
          noPopup
          style={{
            float: 'left',
            marginRight: '1em',
            height: '2em',
            width: '2em',
          }}
        />
        {(showName && blockchain && blockchain.name)
          ? (
            <Header
              content={blockchain.name}
              subheader={`${blockchain.chainId.substr(0, 6)}...${blockchain.chainId.substr(-6)}`}
              size="small"
              style={{ margin: 0 }}
            />
          )
          : false
        }
      </span>
    );
    if (disabled) {
      return (
        <Segment
          content={trigger}
          style={{ margin: 0 }}
        />
      );
    }
    return (
      <Dropdown
        fluid={fluid}
        item
        labeled
        placeholder={showName ? 'Select a blockchain...' : false}
        selection={selection}
        style={style}
        trigger={trigger}
      >
        <Dropdown.Menu style={{ minWidth: '200px' }}>
          {options.map(option => {
              const {
                props,
                b
              } = option;
              return (
                <Dropdown.Item {...props} />
              );
            })
          }
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}


function mapStateToProps(state) {
  return {
    blockchains: state.blockchains,
    settings: state.settings,
    validate: state.validate,
    wallet: state.wallet,
    wallets: state.wallets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...BlockchainsActions,
      // ...WalletActions,
      // ...WalletsActions,
    }, dispatch)
  };
}

export default compose(
  translate('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalBlockchainDropdown);
