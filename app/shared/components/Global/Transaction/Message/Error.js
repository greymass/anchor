// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button } from 'semantic-ui-react';

import GlobalTransactionErrorAuthorization from './Error/Authorization';
import GlobalTransactionErrorDefault from './Error/Default';
import GlobalTransactionErrorCpuUsage from './Error/CpuUsage';
import GlobalTransactionErrorNetUsage from './Error/NetUsage';
import GlobalTransactionErrorLedgerBusy from './Error/Ledger/Busy';
import GlobalTransactionErrorLedgerError from '../../../../containers/Global/Hardware/Ledger/Error';

const transactionErrorsMapping = {
  unsatisfied_authorization: GlobalTransactionErrorAuthorization,
  leeway_deadline_exception: GlobalTransactionErrorCpuUsage,
  tx_net_usage_exceeded: GlobalTransactionErrorNetUsage,
  tx_cpu_usage_exceeded: GlobalTransactionErrorCpuUsage,
};

const transactionErrorMsgMapping = {
  'transport.decorateAppAPIMethods is not a function': GlobalTransactionErrorLedgerError,
  'Transport race condition': GlobalTransactionErrorLedgerBusy,
};

export class GlobalTransactionMessageError extends Component<Props> {
  constructor(props) {
    super(props);
    const {
      error
    } = this.props;

    let errorName = error.error && error.error.name;
    if (!errorName) {
      errorName = error.json && error.json.error && error.json.error.name;
    }

    // Handle  case where it is greymassfuel error
    const isFuelError = error.error &&
      error.error.details &&
      JSON.stringify(error.error.details).includes('greymassfuel');

    if (isFuelError) {
      errorName = 'leeway_deadline_exception';
    }

    let component = GlobalTransactionErrorDefault;
    if (transactionErrorsMapping[errorName]) {
      component = transactionErrorsMapping[errorName];
    } else if (transactionErrorMsgMapping[error.message]) {
      component = transactionErrorMsgMapping[error.message];
    }


    this.state = {
      ComponentType: component
    };
  }

  render() {
    const {
      error,
      onClose,
      style,
      t
    } = this.props;

    const {
      ComponentType
    } = this.state;

    return (
      <div style={style}>
        <ComponentType
          error={error}
          onClose={onClose}
          style={style}
        />
        {(onClose) ? (
          <Button
            color="red"
            content={t('close')}
            fluid
            onClick={onClose}
          />) : ''}
      </div>
    );
  }
}

export default translate('global')(GlobalTransactionMessageError);
