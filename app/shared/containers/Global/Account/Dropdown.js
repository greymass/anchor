// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Button, Dropdown, Header, Icon, Input, Segment, Tab } from 'semantic-ui-react';

import GlobalButtonElevate from '../Button/Elevate';
import * as WalletActions from '../../../actions/wallet';
import * as WalletsActions from '../../../actions/wallets';

class GlobalAccountDropdown extends Component<Props> {
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
  swapAccount = (account, authorization, password = false) => {
    const { actions } = this.props;
    actions.useWallet(account, authorization);
    if (password) {
      actions.unlockWallet(password);
    }
  }
  render() {
    const {
      settings,
      t,
      validate,
      wallet,
      wallets
    } = this.props;
    if (!wallets || wallets.length === 0) {
      return false;
    }
    const options = wallets
      .filter(w => (w.account !== wallet.account || w.authorization !== wallet.authorization))
      .sort((a, b) => a.account > b.account)
      .map((w) => {
        let icon = {
          color: 'green',
          name: 'id card'
        };
        switch (w.mode) {
          case 'cold': {
            icon = {
              color: 'blue',
              name: 'snowflake'
            };
            break;
          }
          case 'ledger': {
            icon = {
              color: 'purple',
              name: 'usb'
            };
            break;
          }
          case 'watch': {
            icon = {
              color: 'grey',
              name: 'eye'
            };
            break;
          }
          case 'wait': {
            icon = {
              color: 'grey',
              name: 'sync'
            };
            break;
          }
          default: {
            // no default
          }
        }
        return {
          props: {
            key: (w.authorization) ? `${w.account}@${w.authorization}` : w.account,
            icon,
            onClick: () => {
              return (w.mode === 'watch' || w.mode === 'ledger') ? this.swapAccount(w.account, w.authorization) : false;
            },
            text: (w.authorization) ? `${w.account}@${w.authorization}` : `${w.account} (${t('global_accounts_dropdown_upgrade_required')})`,
            value: `${w.account}@${w.authorization}`,
          },
          w
        };
      });
    let icon = {
      color: 'green',
      name: 'id card'
    };
    switch (wallet.mode) {
      case 'cold': {
        icon = {
          color: 'blue',
          name: 'snowflake'
        };
        break;
      }
      case 'ledger': {
        icon = {
          color: 'purple',
          name: 'usb'
        };
        break;
      }
      case 'wait': {
        icon = {
          color: 'grey',
          name: 'sync'
        };
        break;
      }
      case 'watch': {
        icon = {
          color: 'grey',
          name: 'eye'
        };
        break;
      }
      default: {
        // no default
      }
    }
    return (
      <Dropdown
        item
        labeled
        trigger={(
          <span>
            <Icon color={icon.color} name={icon.name} />
            {' '}
            {(wallet.authorization)
              ? (
                `${wallet.account}@${wallet.authorization}`
              )
              : (
                `${wallet.account}`
              )
            }
          </span>
        )}
      >
        <Dropdown.Menu key="parent">
          <Dropdown.Menu key="menu" scrolling>
            {(options.length > 0)
              ? options.map(option => {
                const {
                  props,
                  w
                } = option;
                if (w.mode === 'watch' || w.mode === 'ledger') {
                  return <Dropdown.Item {...props} />;
                }
                return (
                  <GlobalButtonElevate
                    key={props.key}
                    onSuccess={(password) => this.swapAccount(w.account, w.authorization, password)}
                    settings={settings}
                    trigger={<Dropdown.Item {...props} />}
                    validate={validate}
                    wallet={w}
                  />
                );
              })
              : (
                <Dropdown.Item
                  content={(
                    <p>{t('global_accounts_dropdown_no_accounts')}</p>
                  )}
                  key="empty"
                  style={{
                    lineHeight: '1.25em',
                    width: '300px',
                    maxWidth: '300px',
                    padding: '1em',
                    whiteSpace: 'normal'
                  }}
                />
              )
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
    }, dispatch)
  };
}

export default compose(
  translate('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalAccountDropdown);
