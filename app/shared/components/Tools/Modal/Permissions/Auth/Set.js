// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalTransactionModal from '../../../../Global/Transaction/Modal';
import ToolsFormPermissionsAuthSet from '../../../Form/Permissions/Auth/Set';

class ToolsModalPermissionAuthSet extends Component<Props> {
  render() {
    const {
      account,
      actions,
      authorization,
      auth,
      blockExplorers,
      button,
      newkey,
      open,
      onClose,
      onFormSubmit,
      path,
      pubkey,
      settings,
      system,
      t
    } = this.props;
    return (
      <GlobalTransactionModal
        actionName="UPDATEAUTH"
        actions={actions}
        blockExplorers={blockExplorers}
        button={button}
        content={(
          <ToolsFormPermissionsAuthSet
            account={account}
            actions={actions}
            authorization={authorization}
            auth={auth}
            newkey={newkey}
            onFormSubmit={onFormSubmit}
            path={path}
            pubkey={pubkey}
            settings={settings}
          />
        )}
        icon="share square"
        open={open}
        onClose={onClose}
        pubkey={pubkey}
        settings={settings}
        system={system}
        title={t('tools_modal_permissions_auth_header')}
      />
    );
  }
}

export default translate('tools')(ToolsModalPermissionAuthSet);
