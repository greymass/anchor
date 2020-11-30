// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Trans, withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Grid, Header, Segment, Tab } from 'semantic-ui-react';

import PromptReviewControls from '../../components/Review/Controls';
import ErrorMessage from '../../components/error';
import PromptFragmentPlaceholderTransactionAction from '../../components/Fragment/Placeholder/Transaction/Action';
import PromptFragmentTransactionAction from '../../components/Fragment/Transaction/Action';
import PromptFragmentReviewActions from '../../components/Fragment/Review/Actions';
import PromptFragmentReviewOverview from '../../components/Fragment/Review/Overview';
import GlobalTransactionViewFull from '../../../../shared/components/Global/Transaction/View/Full';
import PromptFragmentTransactionActionResourceProvider from '../../components/Fragment/Transaction/Action/ResourceProvider';

class PromptStageReview extends Component<Props> {
  getAuthorizers(resolvedRequest) {
    // return if not yet resolved
    if (!resolvedRequest || !resolvedRequest.transaction) return false;
    // return simple list of authorizers for all actions
    const { transaction } = resolvedRequest;
    return transaction.actions.reduce((o, v) => o.concat(v.authorization), []);
  }
  render() {
    const {
      canBroadcast,
      couldSignWithDevice,
      enableWhitelist,
      expiration,
      globals,
      modifyWhitelist,
      onShareLink,
      prompt,
      settings,
      shouldBroadcast,
      system,
      t,
      wallet,
      whitelist,
    } = this.props;
    const {
      chainId,
      callback,
      placeholders,
      resolved,
    } = prompt;
    if (!resolved) return false;
    const authorizers = this.getAuthorizers(prompt.resolved);
    const matches = authorizers.filter(a => a.actor.toString() === wallet.account
      && a.permission.toString() === wallet.authorization);
    const matching = matches.length > 0;
    const disabledSwap = !placeholders && matching;
    const mismatch = (!placeholders && !matching)
      ? `Could not load the expected accounts for this request: ${authorizers.map(a => [a.actor, a.permission].join('@')).join(', ')}`
      : false;
    const transaction = resolved.resolvedTransaction;
    const error = system.ESRURIBUILD_LAST_ERROR;
    const loading = (system.ESRURI === 'PENDING' || system.ESRURIBUILD === 'PENDING');
    const fuelActions = ['greymassfuel:cosign', 'greymassnoop:noop'];
    // Determine if the user is using a resource provider
    const usingResourceProvider = (
      transaction
      && transaction.actions
      && transaction.actions.length
      && transaction.actions.filter((action) => (
        action.account
        && action.name
        && fuelActions.includes([action.account.toString(), action.name.toString()].join(':'))
      )).length > 0
    );
    // Determine if the user is paying for Fuel during this transaction
    const hasResourceProviderFee = (
      transaction
      && transaction.actions
      && transaction.actions.length
      && transaction.actions.filter((action) => (
        action.data
        && action.data.to
        && action.data.to.toString() === 'fuel.gm'
        && action.data.memo
        && action.data.memo.includes('ref=')
      )).length > 0
    );
    const panes = [
      {
        menuItem: 'Transaction Overview',
        render: () => (
          <Tab.Pane attached="bottom">
            <PromptFragmentReviewOverview
              enableWhitelist={enableWhitelist}
              error={error}
              globals={globals}
              hasResourceProviderFee={hasResourceProviderFee}
              loading={loading}
              modifyWhitelist={modifyWhitelist}
              transaction={transaction}
              usingResourceProvider={usingResourceProvider}
              whitelist={whitelist}
            />
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Action Details',
        render: () => (
          <Tab.Pane attached="bottom">
            <PromptFragmentReviewActions
              enableWhitelist={enableWhitelist}
              error={error}
              hasResourceProviderFee={hasResourceProviderFee}
              loading={loading}
              modifyWhitelist={modifyWhitelist}
              transaction={transaction}
              usingResourceProvider={usingResourceProvider}
              whitelist={whitelist}
            />
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Raw Transaction',
        render: () => (
          <Tab.Pane attached="bottom">
            <GlobalTransactionViewFull
              transaction={JSON.parse(JSON.stringify(transaction))}
            />
          </Tab.Pane>
        )
      },
    ];
    return (
      <Grid stackable>
        <Grid.Column width={5} style={{ background: '#f3f4f5' }}>
          <PromptReviewControls
            callback={callback}
            canBroadcast={canBroadcast}
            chainId={chainId}
            couldSignWithDevice={couldSignWithDevice}
            disabledSwap={disabledSwap}
            enableWhitelist={enableWhitelist}
            expiration={expiration}
            mismatch={mismatch}
            onCheck={this.props.onCheck}
            onSelect={this.props.swapAccount}
            onWhitelist={this.props.onWhitelist}
            settings={settings}
            shouldBroadcast={shouldBroadcast}
            wallet={wallet}
          />
        </Grid.Column>
        <Grid.Column width={11}>
          {(error)
            ? (
              <Segment attached="bottom">
                <ErrorMessage
                  error={error}
                />
              </Segment>
            )
            : (
              <Tab
                menu={{
                  attached: 'top',
                  size: 'large'
                }}
                panes={panes}
              />
            )
          }
        </Grid.Column>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    globals: state.globals,
    prompt: state.prompt,
    settings: state.settings,
    system: state.system,
  };
}

export default compose(
  withTranslation('handler'),
  connect(mapStateToProps)
)(PromptStageReview);
