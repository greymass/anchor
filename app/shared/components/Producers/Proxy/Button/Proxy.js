// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalTransactionModal from '../../../Global/Transaction/Modal';
import ProducersFormProxy from '../Form/Proxy';

class ProducersButtonProxy extends Component<Props> {
  render() {
    const {
      accounts,
      actions,
      addProxy,
      blockExplorers,
      currentProxy,
      isProxying,
      onClose,
      proxyAccount,
      removeProxy,
      settings,
      system,
      t,
      tables
    } = this.props;

    let buttonText = t('producers_button_proxy_setup_text');

    if (proxyAccount) {
      buttonText = t('producers_button_proxy_change_text');
    }

    return (
      <GlobalTransactionModal
        actionName="VOTEPRODUCER"
        actions={actions}
        blockExplorers={blockExplorers}
        button={{
          color: 'blue',
          content: buttonText,
          fluid: true,
          icon: 'share square'
        }}
        content={(
          <ProducersFormProxy
            accounts={accounts}
            actions={actions}
            addProxy={addProxy}
            currentProxy={currentProxy}
            isProxying={isProxying}
            key="ProxyForm"
            removeProxy={removeProxy}
            settings={settings}
            system={system}
            tables={tables}
          />
        )}
        icon="share square"
        onClose={onClose}
        openModal={addProxy || removeProxy}
        settings={settings}
        size=""
        system={system}
        title={t('producers_form_proxy_header')}
      />
    );
  }
}

export default translate('producers')(ProducersButtonProxy);
