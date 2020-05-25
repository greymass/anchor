// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { find } from 'lodash';
import { Button, Dropdown, Header, Label, Segment } from 'semantic-ui-react';

import GlobalFragmentChainLogo from '../../../components/Global/Fragment/ChainLogo';
import * as BlockchainsActions from '../../../actions/blockchains';

class GlobalBlockchainDropdown extends Component<Props> {
  swapBlockchain = (chainId) => {
    const { actions } = this.props;
    actions.swapBlockchain(chainId);
  };
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
      .filter(b => {
        const { pinnedBlockchains } = settings;
        const hasPins = (pinnedBlockchains && pinnedBlockchains.length > 0);
        const isEnabled = settings.blockchains.includes(b.chainId);
        const isCurrent = b.chainId === blockchain.chainId;
        const isPinned = (hasPins && pinnedBlockchains.includes(b.chainId));
        return (
          !isCurrent
          && isEnabled
          && (
            !hasPins
            || isPinned
          )
        );
      })
      .sort((a, b) => a.name > b.name)
      .map((b) => {
        const image = <GlobalFragmentChainLogo avatar chainId={b.chainId} name={b.name} />;
        return {
          props: {
            image,
            key: b.chainId,
            onClick: () => this.swapBlockchain(b.chainId),
            text: b.name,
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
        {(blockchain.testnet)
          ? (
            <Label color="orange" content="Testnet" size="large" />
          )
          : false
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
                    content={t('button_manage_blockchains')}
                    fluid
                    icon="cubes"
                    onClick={() => this.props.onNavigationChange('manage/blockchains')}
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
  withTranslation('menu'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalBlockchainDropdown);
