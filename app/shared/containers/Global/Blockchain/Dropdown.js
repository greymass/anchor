// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { find } from 'lodash';
import { Button, Dropdown, Header, Segment } from 'semantic-ui-react';

import GlobalFragmentChainLogo from '../../../components/Global/Fragment/ChainLogo';
import * as BlockchainsActions from '../../../actions/blockchains';

class GlobalBlockchainDropdown extends Component<Props> {
  swapBlockchain = (chainId) => {
    const { actions } = this.props;
    actions.swapBlockchain(chainId);
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
    } = this.props;
    if (!settings.blockchains || settings.blockchains.length === 0 || !settings.walletInit) {
      return false;
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
    const options = blockchains
      .filter(b => (
        (
          settings.blockchains.includes(b.chainId)
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
    const trigger = (
      <span>
        {(blockchain && blockchain.chainId)
          ? (
            <GlobalFragmentChainLogo
              chainId={blockchain.chainId}
              noPopup
              style={{
                float: 'left',
                height: '2em',
                width: '2em',
              }}
            />
          )
          : 'Select a Blockchain'
        }
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
        <Dropdown.Menu key="parent">
          <Dropdown.Menu key="menu" scrolling style={{ minWidth: '200px', marginTop: 0 }}>
            {(this.props.onNavigationChange)
              ? (
                <Dropdown.Header>
                  <Button
                    basic
                    content="Manage Blockchains"
                    fluid
                    icon="cubes"
                    onClick={() => this.props.onNavigationChange('tools/blockchains')}
                    size="small"
                  />
                </Dropdown.Header>
              )
              : false
            }
            {options.map(option => {
                const {
                  props,
                } = option;
                return (
                  <Dropdown.Item {...props} />
                );
              })
            }
            {(!options.length)
              ? (
                <Dropdown.Item
                  content="No other blockchains configured."
                />
              )
              : false
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
