// @flow
import React, { Component } from 'react';

import GlobalMessageAppUpgradeModal from './Global/Message/App/Upgrade/Modal';
import WalletUpgrade from './Wallet/Upgrade';

const name = require('electron').remote.app.getName();
const version = require('electron').remote.app.getVersion();

class Notifications extends Component<Props> {
  render() {
    const {
      actions,
      app,
      settings,
      wallet
    } = this.props;
    const {
      constants
    } = app;
    let upgradeAvailable = false;
    // If version information is available, check for updates
    if (version && constants && constants.version && constants.version !== version) {
      const [
        nextMajor,
        nextMinor,
        nextPatch
      ] = constants.version.split('.');
      const [
        currentMajor,
        currentMinor,
        currentPatch
      ] = version.split('.');
      // Determine if a higher version number exists
      const matchMajor = (currentMajor === nextMajor);
      const matchMinor = (currentMinor === nextMinor);
      upgradeAvailable = (
        nextMajor > currentMajor
        || (matchMajor && nextMinor > currentMinor)
        || (matchMajor && matchMinor && nextPatch > currentPatch)
      );
      // If the user has explicitly skipped this update
      if (settings.upgradeSkip === constants.version) {
        upgradeAvailable = false;
      }
    }
    return (
      <React.Fragment>
        {(upgradeAvailable)
          ? (
            <GlobalMessageAppUpgradeModal
              actions={actions}
              constants={constants}
              name={name}
              version={version}
            />
          )
          : false
        }
        <WalletUpgrade
          settings={settings}
          wallet={wallet}
        />
      </React.Fragment>
    );
  }
}

export default Notifications;
