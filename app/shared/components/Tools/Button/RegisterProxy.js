// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalTransactionModal from '../../Global/Transaction/Modal';
import ToolsFormRegister from '../Form/RegisterProxy';

class ToolsButtonRegisterProxy extends Component<Props> {
  props: Props;

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
        actionName="REGPROXY"
        actions={actions}
        blockExplorers={blockExplorers}
        button={{
          color: 'blue',
          content: t('tools_proxy_button_register'),
          icon: 'share square'
        }}
        content={(
          <ToolsFormRegister
            account={account}
            actions={actions}
            key="RegisterProxyForm"
            system={system}
          />
        )}
        icon="share square"
        title={t('tools_proxy_header_register')}
        settings={settings}
        system={system}
      />
    );
  }
}

export default translate('tools')(ToolsButtonRegisterProxy);
