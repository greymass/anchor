// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Dimmer, Header, Loader, Modal, Progress, Segment, Table } from 'semantic-ui-react';
import compose from 'lodash/fp/compose';
import { get } from 'dot-prop-immutable';

import { changeModule } from '../../../actions/navigation';
import { setSetting } from '../../../../../shared/actions/settings';
import { swapBlockchain } from '../../../../../shared/actions/blockchains';
import { upgradeV1Wallets } from '../../../../../shared/actions/wallets';

import GlobalFragmentChainLogo from '../../../../../shared/components/Global/Fragment/ChainLogo';
import GlobalButtonElevate from '../../../../../shared/containers/Global/Button/Elevate';
import GlobalFragmentAuthorization from '../../../../../shared/components/Global/Fragment/Authorization';

class HomeUpgradeContainer extends Component<Props> {
  onClose = () => {
    const {
      history,
    } = this.props;
    history.push('/');
  }
  onClick = (password) => {
    const {
      actions,
      upgradable
    } = this.props;
    actions.upgradeV1Wallets(upgradable, password);
  }
  render() {
    const {
      completed,
      system,
      total,
      upgradable,
    } = this.props;
    const loading = (system.V1UPGRADE === 'PENDING' || system.V1UPGRADE === 'PROGRESS');
    return (
      <React.Fragment>
        {completed}/{total}
        <Dimmer active={loading}>
          <Loader
            size="huge"
            style={{
              color: 'white'
            }}
          >
            <Header
              style={{
                color: 'white'
              }}
            >
              <Header.Subheader
                style={{
                  color: 'white'
                }}
              >
                Wallet Storage
              </Header.Subheader>
              Upgrading
            </Header>
          </Loader>
        </Dimmer>
        <Modal
          centered={false}
          open={!loading}
        >
          <Modal.Header>
            <Header
              content="Wallet Storage - Upgrade Required"
              subheader="The following wallets need to be upgraded before they can be accessed. Click the button below and enter your local wallet password to complete this process."
              style={{ marginTop: 0 }}
            />
          </Modal.Header>
          <Modal.Content>
            <p>
              <GlobalButtonElevate
                onSuccess={(password) => this.onClick(password)}
                trigger={(
                  <Button
                    content="Upgrade Wallet Storage"
                    primary
                  />
                )}
                wallet={upgradable[0]}
              />
            </p>
            <Table celled>
              {upgradable
                .sort((a, b) => a.account > b.account ? 1 : -1)
                .map((wallet) => (
                <Table.Row>
                  <Table.Cell collapsing>
                    <GlobalFragmentChainLogo
                      avatar
                      chainId={wallet.chainId}
                    />
                  </Table.Cell>
                  <Table.Cell collapsing>
                    <GlobalFragmentAuthorization
                      account={wallet.account}
                      authorization={wallet.authorization}
                      pubkey={wallet.pubkey}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    Wallet Storage - Upgrade Required
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table>
          </Modal.Content>
        </Modal>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    completed: (state.system.V1UPGRADE_PROGRESS) ? state.system.V1UPGRADE_PROGRESS.completed : 0,
    settings: state.settings,
    system: state.system,
    total: (state.system.V1UPGRADE_PROGRESS) ? state.system.V1UPGRADE_PROGRESS.total : 0,
    upgradable: state.wallets.filter(w => w.data),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      changeModule,
      setSetting,
      swapBlockchain,
      upgradeV1Wallets,
    }, dispatch)
  };
}

export default compose(
  withRouter,
  translate('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(HomeUpgradeContainer);
