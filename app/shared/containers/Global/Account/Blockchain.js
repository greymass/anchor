// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Dropdown, Icon } from 'semantic-ui-react';

import * as WalletActions from '../../../actions/wallet';
import * as WalletsActions from '../../../actions/wallets';
import * as SettingsActions from '../../../actions/settings';

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
  swapChain = (blockchain) => {
    const { actions } = this.props;
    actions.setSetting('blockchain', blockchain);
    actions.setSettingWithValidation('node', blockchain.node);
    actions.changeCoreTokenSymbol(blockchain.prefix);
    actions.setSetting('blockchainSelected', true);
  }
  clearChain = () => {
    const { actions } = this.props;
    actions.setSetting('blockchain', {});
    actions.setSetting('node', '');
    actions.setSetting('blockchainSelected', false);
  }
  render() {
    const {
      settings,
      isWelcomePage,
      actions
    } = this.props;
    if (!settings.blockchains || settings.blockchains.length === 0) {
      return false;
    }
    const blockchain = settings.node ? 
      settings.blockchains.filter( (c) => { return c.node === settings.node})[0] : null;

    let icon = {
        color: 'blue',
        name: 'sitemap'
      };

    const options = settings.blockchains
      .filter(w => w.node !== settings.node)
      .sort((a, b) => a.blockchain > b.blockchain)
      .map((w) => {
        return {
          props: {
            icon,
            onClick: () => {
              return this.swapChain(w);
            },
            text: w.blockchain,
            value: w.chainId,
          },
          w
        };
      });
    if (isWelcomePage == 'true') {
      options.push({
        props: {
          icon,
          onClick:()=> {
            return this.clearChain();
          },
          text:'Custom Node API', 
          value:'0000000000'
        },
        
      });
    }
    return (
      <Dropdown
        item
        labeled
        trigger={(
          <span>
            <Icon color={icon.color} name={icon.name} /> {blockchain ? blockchain.blockchain : 'Custom Node API'}
          </span>
        )}
      >
        <Dropdown.Menu>
          <Dropdown.Menu scrolling>
            {
              (options.length > 0)
              ? options.map(option => {
                const {
                  props
                } = option;
                return (
                  <Dropdown.Item key={props.value} {...props} />
                );
              })
              : null
            }
          </Dropdown.Menu>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}


function mapStateToProps(state) {
  return {
    settings: state.settings,
    validate: state.validate,
    wallet: state.wallet,
    wallets: state.wallets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...WalletActions,
      ...WalletsActions,
      ...SettingsActions,
    }, dispatch)
  };
}

export default compose(
  translate('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalBlockchainDropdown);
