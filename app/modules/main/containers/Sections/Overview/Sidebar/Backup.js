// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Button, Header, Segment } from 'semantic-ui-react';
import TimeAgo from 'react-timeago';

import SettingsActions from '../../../../../../shared/actions/settings';
import EOSWallet from '../../../../../../shared/utils/Anchor/Wallet';

const { ipcRenderer } = require('electron');

class OverviewSidebarBackupContainer extends Component<Props> {
  backup = () => {
    const {
      actions,
      blockchains,
      settings,
      storage,
      wallets,
    } = this.props;
    const backup = {
      networks: blockchains.map((blockchain) => ({
        schema: 'anchor.v2.network',
        data: Object.assign({}, blockchain)
      })),
      settings: {
        schema: 'anchor.v2.settings',
        data: Object.assign({}, settings),
      },
      storage: {
        schema: 'anchor.v2.storage',
        data: storage,
      },
      wallets: wallets.map((wallet) => {
        const model = new EOSWallet();
        model.importProps(wallet);
        return model.wallet;
      })
    };
    ipcRenderer.send(
      'saveFile',
      settings.lastFilePath,
      JSON.stringify(backup),
      'wallet'
    );
    ipcRenderer.once('lastFileSuccess', () => actions.setSetting('lastBackupDate', Date.now()));
  };

  render() {
    const {
      buttonOnly,
      settings,
    } = this.props;
    const {
      lastBackupDate,
      lastBackupInvalidated,
    } = settings;
    const button = (
      <Button
        color="purple"
        content="Backup"
        icon="save"
        onClick={this.backup}
        size="tiny"
      />
    );
    if (buttonOnly) return button;
    return (
      <React.Fragment>
        <Segment color="purple" textAlign="center">
          <Header size="tiny">
            <Header.Subheader>
              Last Backup
            </Header.Subheader>
            {(lastBackupDate)
              ? (
                <TimeAgo
                  date={lastBackupDate}
                />
              )
              : 'Never'
            }
          </Header>
          {button}
        </Segment>
      </React.Fragment>
    );
  }
}


function mapStateToProps(state) {
  return {
    app: state.app,
    blockchains: state.blockchains,
    settings: state.settings,
    storage: state.storage,
    wallets: state.wallets,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...SettingsActions,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OverviewSidebarBackupContainer);
