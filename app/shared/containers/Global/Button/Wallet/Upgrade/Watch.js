// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Button, Dropdown, Modal, Popup } from 'semantic-ui-react';

import GlobalButtonElevate from '../Elevate';
import * as WalletsActions from '../../../../actions/wallets';

class GlobalButtonWalletUpgradeWatch extends Component<Props> {
  state = {
    current: {
      account: 'teamgreymass',
      authorization: false,
    },
    open: true
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
  upgradeWallet = (account, authorization, password = false) => {
    const { actions, useWallet } = this.props;
    actions.upgradeWallet(account, authorization, password, useWallet);
  }
  upgradeWatchWallet = (account, authorization) => {
    const { actions, useWallet } = this.props;
    actions.upgradeWatchWallet(account, authorization, useWallet);
  }
  render() {
    const {
      floated,
      style,
      settings,
      t,
      useWallet,
      validate,
      wallet
    } = this.props;
    const {
      account,
      authorization,
      mode,
      pubkey
    } = wallet;
    const {
      current,
      open
    } = this.state;
    const requiresUpgrade = (!authorization || !pubkey);
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
        <GlobalButtonWalletUpgradeWatch
          account={current.account}
          authorization={current.authorization}
          onSubmit={() => this.upgradeWatchWallet(current.account, current.authorization)}
          open={open}
          setAuthorization={this.setAuthorization}
        />

        <Modal.Content>
          <p>Account: {current.account}</p>
          <p>authorization: {current.authorization}</p>
          <Dropdown
            onChange={this.setAuthorization}
            options={options}
            selection
          />
          <Button
            color="purple"
            content={t('wallet:wallet_upgrade_button')}
            floated="right"
            icon="circle arrow up"
            onClick={() => this.upgradeWatchWallet(current.account, current.authorization)}
            style={style}
          />
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
                    this.upgradeWallet(account, authorization, password)
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
)(GlobalButtonWalletUpgradeWatch);
