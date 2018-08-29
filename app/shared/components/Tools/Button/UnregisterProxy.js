// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalTransactionModal from '../../Global/Transaction/Modal';
import ToolsFormUnregister from '../Form/UnregisterProxy';

class ToolsButtonUnregisterProxy extends Component<Props> {
  render() {
    const {
      account,
      actions,
      blockExplorers,
      settings,
      system,
      t
    } = this.props;

    return (
      <GlobalTransactionModal
        actionName="UNREGPROXY"
        actions={actions}
        blockExplorers={blockExplorers}
        button={{
          color: 'red',
          content: t('tools_proxy_button_unregister'),
          icon: 'share square'
        }}
        content={(
          <ToolsFormUnregister
            account={account}
            actions={actions}
            key="UnregisterProxyForm"
            system={system}
          />
        )}
        icon="share square"
        title={t('tools_proxy_header_unregister')}
        settings={settings}
        system={system}
      />
    );
  }
}

export default translate('tools')(ToolsButtonUnregisterProxy);
