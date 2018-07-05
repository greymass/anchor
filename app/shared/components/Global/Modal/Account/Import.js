// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Icon, Modal, Tab } from 'semantic-ui-react';

import GlobalModalAccountImportCold from '../../../../containers/Global/Account/Import/Cold';
import GlobalModalAccountImportHot from '../../../../containers/Global/Account/Import/Hot';
import GlobalModalAccountImportWatch from '../../../../containers/Global/Account/Import/Watch';

class GlobalModalAccountImport extends Component<Props> {
  getPanes = () => {
    const {
      onClose,
      settings,
      t
    } = this.props;
    const panes = [];

    const hotWallet = {
      menuItem: t('global_modal_account_import_hot_wallet'),
      render: () => <GlobalModalAccountImportHot onClose={onClose} />
    };
    const watchWallet = {
      menuItem: t('global_modal_account_import_watch_wallet'),
      render: () => <GlobalModalAccountImportWatch onClose={onClose} />
    };
    const coldWallet = {
      menuItem: t('global_modal_account_import_cold_wallet'),
      render: () => <GlobalModalAccountImportCold onClose={onClose} />
    };

    switch (settings.walletMode) {
      case 'cold': {
        panes.push(coldWallet);
        break;
      }
      case 'watch': {
        panes.push(watchWallet, hotWallet);
        break;
      }
      default: {
        panes.push(hotWallet, watchWallet);
      }
    }

    return panes;
  }

  render() {
    const {
      onClose,
      open,
      t,
      trigger
    } = this.props;
    const panes = this.getPanes();
    return (
      <Modal
        centered={false}
        trigger={trigger}
        onClose={onClose}
        open={open}
        size="small"
      >
        <Header
          content={t('global_button_account_import_action')}
          icon="users"
          subheader={t('global_button_account_import_action')}
        />
        <Tab
          menu={{
            attached: true,
            inverted: true,
            fluid: true,
            pointing: true,
            style: {
              margin: 0
            }
          }}
          panes={panes}
          defaultActiveIndex={0}
        />
      </Modal>
    );
  }
}

export default translate('global')(GlobalModalAccountImport);
