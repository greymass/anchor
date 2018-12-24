// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Button, Dropdown, Modal, Popup, Segment } from 'semantic-ui-react';

import GlobalButtonElevate from '../Elevate';
import * as WalletsActions from '../../../../actions/wallets';

class GlobalButtonWalletUpgrade extends Component<Props> {
  state = {
    current: {
      account: false,
      authorization: false,
    },
    open: false
  }
  selectWatchWalletAuthorization = (account, authorization) => {
    this.setState({
      current: {
        account,
        authorization
      },
      open: true,
    });
  }
  setAuthorization = (e, { value }) => {
    const { current } = this.state;
    this.setState({
      current: {
        account: current.account,
        authorization: value
      }
    });
  }
  upgradeWallet = (chainId, account, authorization, password = false) => {
    const { actions, settings } = this.props;
    const useWallet = (settings.account === account && settings.chainId === chainId);
    actions.upgradeWallet(chainId, account, authorization, password, useWallet);
  }
  upgradeWatchWallet = (chainId, account, authorization) => {
    const { actions, settings } = this.props;
    const useWallet = (settings.account === account && settings.chainId === chainId);
    actions.upgradeWatchWallet(chainId, account, authorization, useWallet);
  }
  render() {
    const {
      floated,
      style,
      settings,
      t,
      validate,
      wallet
    } = this.props;
    const {
      account,
      authorization,
      chainId,
      mode,
      pubkey
    } = wallet;
    const {
      current,
      open
    } = this.state;
    const requiresUpgrade = (!authorization || !pubkey);
    // Cold wallets don't use this feature
    if (mode === 'cold') return false;
    let modal;
    if (open) {
      const options = ['active', 'owner'].map((authority) => (
        {
          key: authority,
          text: authority,
          value: authority
        }
      ));
      modal = (
        <Modal
          open
          size="small"
        >
          <Modal.Header>
            {t('wallet:wallet_upgrade_watch_authorization_header')}
          </Modal.Header>
          <Modal.Content>
            <p>{t('wallet:wallet_upgrade_watch_authorization_description')}</p>
            <Dropdown
              fluid
              onChange={this.setAuthorization}
              options={options}
              selection
            />
            <Segment basic clearing>
              <Button
                color="purple"
                content={t('wallet:wallet_upgrade_button')}
                disabled={!current.authorization}
                floated="right"
                icon="circle arrow up"
                onClick={() => this.upgradeWatchWallet(chainId, current.account, current.authorization)}
                style={style}
              />
            </Segment>
          </Modal.Content>
        </Modal>
      );
    }
    return (
      <React.Fragment>
        {modal}
        {(requiresUpgrade && mode === 'watch')
          ? (
            <Popup
              content={t('wallet:wallet_upgrade_popup')}
              inverted
              trigger={(
                <Button
                  color="purple"
                  content={t('wallet:wallet_upgrade_button')}
                  floated={floated}
                  icon="circle arrow up"
                  onClick={() => this.selectWatchWalletAuthorization(account, authorization)}
                  style={style}
                />
              )}
            />
          )
          : false
        }
        {(requiresUpgrade && mode !== 'watch')
          ? (
            <Popup
              content={t('wallet:wallet_upgrade_popup')}
              inverted
              trigger={(
                <GlobalButtonElevate
                  onSuccess={(password) =>
                    this.upgradeWallet(chainId, account, authorization, password)
                  }
                  settings={settings}
                  trigger={(
                    <Button
                      color="purple"
                      content={t('wallet:wallet_upgrade_button')}
                      floated={floated}
                      icon="circle arrow up"
                      style={style}
                    />
                  )}
                  validate={validate}
                  wallet={wallet}
                />
              )}
            />
          )
          : false
        }
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
    validate: state.validate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...WalletsActions,
    }, dispatch)
  };
}

export default compose(
  translate('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalButtonWalletUpgrade);
