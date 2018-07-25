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
  onSearchChange = (e, { searchQuery }) => {
    // console.log(searchQuery);
  }
  swapAccount = (account, password = false) => {
    const { actions } = this.props;
    actions.useWallet(account);
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
      .filter(w => w.account !== settings.account)
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
          case 'watch': {
            icon = {
              color: 'orange',
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
            icon,
            onClick: () => {
              return (w.mode === 'watch') ? this.swapAccount(w.account) : false;
            },
            text: w.account,
            value: w.account,
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
      case 'wait': {
        icon = {
          color: 'grey',
          name: 'sync'
        };
        break;
      }
      case 'watch': {
        icon = {
          color: 'orange',
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
            <Icon color={icon.color} name={icon.name} /> {wallet.account}
          </span>
        )}
      >
        <Dropdown.Menu>
          <Dropdown.Menu scrolling>
            {(options.length > 0)
              ? options.map(option => {
                const {
                  props,
                  w
                } = option;
                if (w.mode === 'watch') {
                  return <Dropdown.Item key={option.value} {...props} />;
                }
                return (
                  <GlobalButtonElevate
                    onSuccess={(password) => this.swapAccount(w.account, password)}
                    settings={settings}
                    trigger={<Dropdown.Item key={props.value} {...props} />}
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
