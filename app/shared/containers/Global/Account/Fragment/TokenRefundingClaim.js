// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Button, Segment } from 'semantic-ui-react';
import { isEmpty } from 'lodash';
import isUnlocked from '../../../../utils/Anchor/Unlocked';

import * as AccountsAction from '../../../../actions/accounts';
import * as SystemStateActions from '../../../../actions/system/systemstate';

import GlobalTransactionModal from '../../../../components/Global/Transaction/Modal';
import GlobalUnlock from '../../../../containers/Global/Unlock';

class GlobalAccountFragmentTokenRefundingClaim extends PureComponent<Props> {
  claimUnstaked = () => {
    const {
      actions,
      settings
    } = this.props;

    const {
      claimUnstaked
    } = actions;

    claimUnstaked(settings.account);
  }
  render() {
    const {
      actions,
      blockExplorers,
      hasRefund,
      settings,
      system,
      t,
      transaction,
      unlocked,
    } = this.props;
    const button = {
      color: 'blue',
      content: 'Claim',
      floated: 'right',
      fluid: false,
      size: 'mini'
    };
    if (!hasRefund) return false;
    if (!unlocked) {
      return (
        <GlobalUnlock buttonOnly buttonStyles={button} />
      );
    }
    return (
      <GlobalTransactionModal
        actionName="REFUND"
        actions={actions}
        blockExplorers={blockExplorers}
        button={button}
        content={(
          <Segment
            basic
            size="large"
            textAlign="center"
            loading={system.REFUND === 'PENDING'}
          >
            <p>
              The tokens you have previously unstaked have failed to automatically be claimed, and need to be claimed manually.
            </p>
            <p>
              Click the button below to attempt to manually claim these tokens.
            </p>
            <p>
              <Button
                color="blue"
                content={t('wallet_status_resources_claim_unstaked')}
                onClick={this.claimUnstaked}
              />
            </p>
          </Segment>
        )}
        title="Claim pending tokens"
        settings={settings}
        system={system}
        transaction={transaction}
      />

    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const account = ownProps.account.replace(/\./g, '\\.');
  const refundRequest = get(state, `accounts.${account}.refund_request`);
  const hasRefund = !isEmpty(refundRequest);
  const claimable = (hasRefund && new Date() > new Date(`${refundRequest.request_time}z`));
  return {
    claimable,
    hasRefund,
    settings: state.settings,
    system: state.system,
    allBlockExplorers: state.blockexplorers,
    transaction: state.transaction,
    unlocked: isUnlocked(state),
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountsAction,
      ...SystemStateActions,
    }, dispatch)
  };
}

export default compose(
  withTranslation('wallet'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalAccountFragmentTokenRefundingClaim);
