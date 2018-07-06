// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalTransactionModal from '../../Global/Transaction/Modal';
import ProducersFormProxy from '../Form/Proxy';

class ToolsButtonUnregister extends Component<Props> {
  render() {
    const {
      actions,
      proxyAccount,
      settings,
      system,
      t
    } = this.props;

    let buttonText = t('producers_button_proxy_setup_text');

    if (proxyAccount) {
      buttonText = t('producers_button_proxy_change_text');
    }

    return (
      <GlobalTransactionModal
        actionName="VOTEPRODUCER"
        actions={actions}
        button={{
          color: 'blue',
          content: buttonText,
          icon: 'share square'
        }}
        content={(
          <ProducersFormProxy
            actions={actions}
            currentProxyAccount={proxyAccount}
            key="UnregisterProxyForm"
            system={system}
          />
        )}
        icon="share square"
        title={t('producers_form_proxy_header')}
        settings={settings}
        system={system}
      />
    );
  }
}

export default translate('producers')(ToolsButtonUnregister);
