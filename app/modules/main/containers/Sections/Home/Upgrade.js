// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Dimmer, Header, Loader, Modal, Table } from 'semantic-ui-react';
import compose from 'lodash/fp/compose';

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
      t,
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
                {t('main_sections_home_upgrade_subheader_one')}
              </Header.Subheader>
              {t('main_sections_home_upgrade_header_one')}
            </Header>
          </Loader>
        </Dimmer>
        <Modal
          centered={false}
          open={!loading}
        >
          <Modal.Header>
            <Header
              content={t('main_sections_home_upgrade_header_two')}
              subheader={t('main_sections_home_upgrade_subheader_two')}
              style={{ marginTop: 0 }}
            />
          </Modal.Header>
          <Modal.Content>
            <p>
              <GlobalButtonElevate
                onSuccess={(password) => this.onClick(password)}
                trigger={(
                  <Button
                    content={t('main_sections_home_upgrade_button_one')}
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
                      {t('main_sections_home_upgrade_table_cell_one', { walletMode: wallet.mode  })}
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
  withTranslation('main'),
  connect(mapStateToProps, mapDispatchToProps)
)(HomeUpgradeContainer);
