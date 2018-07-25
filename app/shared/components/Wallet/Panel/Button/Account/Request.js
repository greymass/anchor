// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button } from 'semantic-ui-react';

import WalletPanelModalAccountRequest from '../../Modal/Account/Request';

class WalletPanelButtonAccountRequest extends Component<Props> {
  state = {
    open: false
  }

  onOpen = () => this.setState({ open: true });

  onClose = () => this.setState({ open: false });

  render() {
    const {
      accountName,
      actions,
      history,
      shouldShowAccountNameWarning,
      system,
      t,
    } = this.props;

    const {
      open
    } = this.state;

    return (
      <WalletPanelModalAccountRequest
        actions={actions}
        history={history}
        onClose={this.onClose}
        open={open}
        system={system}
        trigger={(
          <Button
            color="blue"
            content={t('global_account_request_account')}
            icon="users circle"
            onClick={this.onOpen}
          />
        )}
      />
    );
  }
}

export default translate('global')(WalletPanelButtonAccountRequest);
