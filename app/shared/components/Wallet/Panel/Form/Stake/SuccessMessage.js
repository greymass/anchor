// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Icon, Modal, Segment } from 'semantic-ui-react';
import DangerLink from '../../../../Global/Modal/DangerLink';

export default class WalletPanelFormStakeSuccessMessage extends Component<Props> {
  render() {
    const {
      onClose,
      system
    } = this.props;
    return (
      <I18n ns="stake">
        {
          (t) => (
            <div>
              {((system.DELEGATEBW === 'SUCCESS') || (system.UNDELEGATEBW === 'SUCCESS'))
                ? (
                  <div>
                    <Modal.Content>
                      {(system.DELEGATEBW === 'SUCCESS')
                        ? (
                          <div>
                            <h3>
                              {t('stake_success')}
                            </h3>
                            <Segment basic padded textAlign="center">
                              <DangerLink
                                content={system.DELEGATEBW_LAST_TRANSACTION.transaction_id}
                                link={`https://eospark.com/MainNet/tx/${system.DELEGATEBW_LAST_TRANSACTION.transaction_id}`}
                              />
                            </Segment>
                          </div>
                        )
                        : ''
                      }
                      {(system.UNDELEGATEBW === 'SUCCESS')
                        ? (
                          <div>
                            <h3>
                              {t('unstake_success')}
                            </h3>
                            <Segment basic padded textAlign="center">
                              <DangerLink
                                content={system.UNDELEGATEBW_LAST_TRANSACTION.transaction_id}
                                link={`https://eospark.com/MainNet/tx/${system.UNDELEGATEBW_LAST_TRANSACTION.transaction_id}`}
                              />
                            </Segment>
                          </div>
                        )
                        : ''
                      }
                    </Modal.Content>
                    <Modal.Actions>
                      <Button color="green" onClick={onClose}>
                        <Icon name="checkmark" /> {t('close')}
                      </Button>
                    </Modal.Actions>
                  </div>
                ):
                ''
              }
            </div>
          )
        }
      </I18n>
    );
  }
}
