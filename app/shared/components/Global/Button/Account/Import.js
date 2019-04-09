// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button } from 'semantic-ui-react';

import GlobalModalAccountImport from '../../Modal/Account/Import';

class GlobalButtonAccountImport extends Component<Props> {
  state = {
    open: false
  }

  onOpen = () => this.setState({ open: true });
  onClose = () => this.setState({ open: false });

  render() {
    const {
      settings,
      t
    } = this.props;
    const {
      open
    } = this.state;
    return (
      <GlobalModalAccountImport
        onClose={this.onClose}
        open={open}
        settings={settings}
        trigger={(
          <Button
            color="blue"
            content={t('global_button_account_import_action')}
            icon="circle plus"
            onClick={this.onOpen}
          />
        )}
      />
    );
  }
}

export default translate('global')(GlobalButtonAccountImport);
