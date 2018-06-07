// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Icon, Message } from 'semantic-ui-react';

export default class WalletPanelFormStakeFailureMessage extends Component<Props> {
  render() {
    const {
      onClose,
      system,
      validate,
    } = this.props;
    let err = false;
    if (validate.STAKE === 'FAILURE') {
      err = validate.STAKE_ERROR;
    }
    if (system.DELEGATEBW === 'FAILURE') {
      err = system.DELEGATEBW_LAST_ERROR;
    }
    if (system.UNDELEGATEBW === 'FAILURE') {
      err = system.UNDELEGATEBW_LAST_ERROR;
    }
    const errorMsg = (err && err.code) ? err.error.details[0].message : JSON.stringify(err);
    return (
      <I18n ns="stake">
        {
          (t) => (
            <div>
              {
                (err) ? (
                  <div>
                    <Message negative>
                      <p>{errorMsg}</p>
                    </Message>
                    <Button color="green" onClick={onClose}>
                      <Icon name="checkmark" /> {t('close')}
                    </Button>
                  </div>
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
