// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button } from 'semantic-ui-react';

import GlobalModalAccountImport from '../../Modal/Account/Import';

class GlobalButtonAccountImport extends Component<Props> {
  state = {
    open: true
  }

  onOpen = () => this.setState({ open: true });
  onClose = () => this.setState({ open: false });

  render() {
    const {
      t
    } = this.props;
    const {
      open
    } = this.state;
    return (
      <GlobalModalAccountImport
        onClose={this.onClose}
        open={open}
        trigger={(
          <Button
            color="purple"
            content={t('wallet_panel_wallet_unlock')}
            fluid
            icon="unlock"
            onClick={this.onOpen}
          />
        )}
      />
    );
  }
}

export default translate('global')(GlobalButtonAccountImport);
