// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button } from 'semantic-ui-react';

import ModalAccountImport from '../../Modal/Account/Import';

export class GlobalButtonAccountImport extends Component<Props> {
  state = {
    open: true
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
      <ModalAccountImport
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

export default translate(['global', 'welcome'])(GlobalButtonAccountImport);
