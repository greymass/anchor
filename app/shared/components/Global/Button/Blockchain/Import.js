// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button } from 'semantic-ui-react';

import GlobalModalBlockchainImport from '../../Modal/Blockchain/Import';

class GlobalButtonBlockchainImport extends Component<Props> {
  state = {
    open: false
  }

  onOpen = () => this.setState({ open: true });
  onClose = () => this.setState({ open: false });

  render() {
    const {
      connection,
      settings,
      t
    } = this.props;
    const {
      open
    } = this.state;
    return (
      <GlobalModalBlockchainImport
        connection={connection}
        onClose={this.onClose}
        open={open}
        settings={settings}
        trigger={(
          <Button
            color="blue"
            content={t('global_button_blockchain_import_action')}
            icon="circle plus"
            onClick={this.onOpen}
          />
        )}
      />
    );
  }
}

export default translate('global')(GlobalButtonBlockchainImport);
