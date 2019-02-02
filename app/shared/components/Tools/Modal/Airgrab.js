// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalTransactionModal from '../../Global/Transaction/Modal';
import { Button, Segment } from 'semantic-ui-react';

class ToolsModalDelegation extends Component<Props> {
  confirmClaim = () => {
    const  { action } = this.props;

    actions.claimAirgrab();
  };

  render() {
    const {
      actions,
      blockExplorers,
      onClose,
      onOpen,
      openModal,
      settings,
      system,
      t
    } = this.props;

    return (
      <GlobalTransactionModal
        actionName="AIRGRAB"
        actions={actions}
        blockExplorers={blockExplorers}
        button={{
          color: 'blue',
          content: t('tools_bid_name_modal_button_add'),
          floated: 'right',
          icon: 'plus'
        }}
        content={(
          <Segment>
            <Header
              content={t('tools_modal_airgrab_header')}
            />
            <Button
              onClick={this.confirmClaim}
              content={t('tools_modal_airgrab_button')}
            />
          </Segment>
        )}
        icon="sticky note outline"
        onClose={onClose}
        onOpen={onOpen}
        openModal={openModal}
        settings={settings}
        system={system}
        title={t('tools_modal_bid_name_header')}
      />
    );
  }
}

export default translate('tools')(ToolsModalDelegation);
