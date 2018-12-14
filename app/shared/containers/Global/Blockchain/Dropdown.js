// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { find } from 'lodash';
import { Button, Dropdown, Header, Icon, Input, Segment, Tab } from 'semantic-ui-react';

import GlobalButtonElevate from '../Button/Elevate';
import * as BlockchainsActions from '../../../actions/blockchains';
import * as WalletActions from '../../../actions/wallet';
import * as WalletsActions from '../../../actions/wallets';

class GlobalBlockchainDropdown extends Component<Props> {
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
    console.log("swap to chain", chainId)
    const { actions } = this.props;
    actions.swapBlockchain(chainId);
    // if (password) {
    //   actions.unlockWallet(password);
    // }
  }
  render() {
    const {
      blockchains,
      settings,
      t,
    } = this.props;
    const { chainId } = settings;
    const blockchain = find(blockchains, { chainId });
    console.log(blockchains, blockchain, chainId)
    if (!blockchains || !blockchain) return false;
    const options = blockchains
      .filter(b => (!b.testnet && b.chainId !== blockchain.chainId))
      .sort((a, b) => a.name > b.name)
      .map((b) => {
        return {
          props: {
            key: b.chainId,
            onClick: () => this.swapBlockchain(b.chainId),
            text: b.name,
            value: b.chainId,
          },
          b
        };
      });
    let icon = {
      color: 'green',
      name: 'id card'
    };
    return (
      <Dropdown
        item
        labeled
        trigger={(
          <span>
            {blockchain.name}
          </span>
        )}
      >
        <Dropdown.Menu key="parent">
          <Dropdown.Menu key="menu" scrolling>
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
