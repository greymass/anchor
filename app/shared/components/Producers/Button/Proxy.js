// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalTransactionModal from '../../Global/Transaction/Modal';
import ProducersFormProxy from '../Form/Proxy';

class ToolsButtonUnregister extends Component<Props> {
  render() {
    const {
      actions,
      proxyVoter,
      settings,
      system,
      t
    } = this.props;

    let buttonText;

    if (proxyVoter) {
      buttonText = t('producers_button_proxy_change_text');
    } else {
      buttonText = t('producers_button_proxy_setup_text');
    }

    return (
      <GlobalTransactionModal
        actionName="VOTEPRODUCER"
        actions={actions}
        button={{
          color: 'green',
          content: buttonText,
          icon: 'share square'
        }}
        content={(
          <ProducersFormProxy
            actions={actions}
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
