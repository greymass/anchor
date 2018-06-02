// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Message } from 'semantic-ui-react';

export default class WalletPanelFormStakeFailureMessage extends Component<Props> {
  render() {
    const {
      system,
      validate,
    } = this.props;

    return (
      <I18n ns="stake">
        {
          (t) => (
            <div>
              {
                (
                  validate.STAKE === 'FAILURE' ||
                  system.DELEGATEBW === 'FAILURE' ||
                  system.UNDELEGATEBW === 'FAILURE'
                ) ? (
                  <Message negative>
                    <p>{t(validate.STAKE_ERROR)}</p>
                    <p>{system.DELEGATEBW_LAST_ERROR}</p>
                    <p>{system.UNDELEGATEBW_LAST_ERROR}</p>
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
