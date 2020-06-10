// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Trans, withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Grid, Header, Segment } from 'semantic-ui-react';

import PromptReviewControls from '../../components/Review/Controls';
import ErrorMessage from '../../components/error';
import PromptFragmentPlaceholderTransactionAction from '../../components/Fragment/Placeholder/Transaction/Action';
import PromptFragmentTransactionAction from '../../components/Fragment/Transaction/Action';

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
    if (!resolved) return false
    const authorizers = this.getAuthorizers(prompt.resolved)
    const matches = authorizers.filter(a => a.actor === wallet.account && a.permission === wallet.authorization)
    const matching = matches.length > 0
    const disabledSwap = !placeholders && matching;
    const mismatch = (!placeholders && !matching)
      ? `Could not load the expected accounts for this request: ${authorizers.map(a => [a.actor, a.permission].join('@')).join(', ')}`
      : false;
    const {
      transaction
    } = resolved;
    const error = system.ESRURIBUILD_LAST_ERROR;
    const loading = (system.ESRURI === 'PENDING' || system.ESRURIBUILD === 'PENDING');
    return (
      <Grid stackable>
        <Grid.Column width={6}>
          <PromptReviewControls
            callback={callback}
            canBroadcast={canBroadcast}
            chainId={chainId}
            couldSignWithDevice={couldSignWithDevice}
            disabledSwap={disabledSwap}
            enableWhitelist={enableWhitelist}
            mismatch={mismatch}
            onCheck={this.props.onCheck}
            onSelect={this.props.swapAccount}
            onWhitelist={this.props.onWhitelist}
            settings={settings}
            shouldBroadcast={shouldBroadcast}
            wallet={wallet}
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Header>
            {t('handler_containers_stage_review_header')}
            <Header.Subheader>
              <Trans i18nKey="handler_containers_stage_review_paragraph" t={t}>
                Listed below are the actions to be performed.
                If you are unsure of what this request does,
                <a href="#" onClick={() => this.openLink('https://greymass.com/fuel')}>
                  use a URI link to ask those you trust
                </a>
              </Trans>
            </Header.Subheader>
          </Header>
          {(loading)
            ? <PromptFragmentPlaceholderTransactionAction />
            : false
          }
          {(transaction)
            ? transaction.actions.map((action, index) => (
              <PromptFragmentTransactionAction
                action={action}
                enableWhitelist={enableWhitelist}
                modifyWhitelist={modifyWhitelist}
                index={index}
                total={transaction.actions.length}
                whitelist={whitelist}
              />
            ))
            : false
          }
          {(error)
            ? (
              <Segment attached>
                <ErrorMessage
                  error={error}
                />
              </Segment>
            )
            : false
          }
        </Grid.Column>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    prompt: state.prompt,
    settings: state.settings,
    system: state.system,
  };
}

export default compose(
  withTranslation('handler'),
  connect(mapStateToProps)
)(PromptStageReview);
