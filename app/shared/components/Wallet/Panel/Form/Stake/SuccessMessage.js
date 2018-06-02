// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Message } from 'semantic-ui-react';

export default class WalletPanelFormStakeSuccessMessage extends Component<Props> {
  render() {
    const {
      system,
    } = this.props;

    return (
      <I18n ns="stake">
        {
          (t) => (
            <div>
              {(system.DELEGATEBW === 'SUCCESS' || system.UNDELEGATEBW === 'SUCCESS')
                ? (
                  <Message positive>
                    {(system.DELEGATEBW === 'SUCCESS')
                      ? (
                        <p>{`${t('stake_success')} tx # ${system.DELEGATEBW_LAST_TRANSACTION.transaction_id}`}</p>
                      )
                      : ''
                    }
                    {(system.UNDELEGATEBW === 'SUCCESS')
                      ? (
                        <p>{`${t('unstake_success')} tx # ${system.UNDELEGATEBW_LAST_TRANSACTION.transaction_id}`}</p>
                      )
                      : ''
                    }
                  </Message>
                )
                : ''
              }
            </div>
          )
        }
      </I18n>
    );
  }
}
