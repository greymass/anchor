// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import compose from 'lodash/fp/compose';

import GlobalTransactionErrorAuthorization from './Error/Authorization';
import GlobalTransactionErrorDefault from './Error/Default';
import GlobalTransactionErrorCpuUsage from './Error/CpuUsage';
import GlobalTransactionErrorNetUsage from './Error/NetUsage';
import GlobalTransactionErrorLedgerBusy from './Error/Ledger/Busy';
import GlobalTransactionErrorLedgerData from './Error/Ledger/Data';
import GlobalTransactionErrorLedgerError from '../../../../containers/Global/Hardware/Ledger/Error';
import GlobalTransactionErrorResourceUsage from './Error/ResourceUsage';

const transactionErrorsMapping = {
  unsatisfied_authorization: GlobalTransactionErrorAuthorization,
  leeway_deadline_exception: GlobalTransactionErrorCpuUsage,
  tx_net_usage_exceeded: GlobalTransactionErrorNetUsage,
  tx_cpu_usage_exceeded: GlobalTransactionErrorCpuUsage,
  resource_usage: GlobalTransactionErrorResourceUsage,
};

const transactionErrorMsgMapping = {
  'transport.decorateAppAPIMethods is not a function': GlobalTransactionErrorLedgerError,
  'Transport race condition': GlobalTransactionErrorLedgerBusy,
  'Ledger device: Invalid data received (0x6a80)': GlobalTransactionErrorLedgerData,
};

export class GlobalTransactionMessageError extends Component<Props> {
  constructor(props) {
    super(props);
    const {
      error,
      fuel,
      settings,
    } = this.props;

    let errorName = error.error && error.error.name;
    if (!errorName) {
      errorName = error.json && error.json.error && error.json.error.name;
    }

    // Handle case where it is greymassfuel error
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

    const canProceedWithFee = (fuel && fuel.alternative && fuel.alternative.request && fuel.alternative.request.code === 402);
    if (canProceedWithFee) {
      component = transactionErrorsMapping.resource_usage;
    }

    this.state = {
      canProceedWithFee,
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
      canProceedWithFee,
      ComponentType
    } = this.state;

    return (
      <div style={style}>
        <ComponentType
          error={error}
          onClose={onClose}
          style={style}
        />
        {(onClose && !canProceedWithFee) ? (
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

const mapStateToProps = (state) => ({
  fuel: state.fuel,
  settings: state.settings,
});

export default compose(
  withTranslation('global'),
  connect(mapStateToProps)
)(GlobalTransactionMessageError);
