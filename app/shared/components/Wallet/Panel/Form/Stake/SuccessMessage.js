// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Header, Icon, Modal, Segment } from 'semantic-ui-react';

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
                              <pre>{system.DELEGATEBW_LAST_TRANSACTION.transaction_id}</pre>
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
                              <pre>{system.UNDELEGATEBW_LAST_TRANSACTION.transaction_id}</pre>
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
