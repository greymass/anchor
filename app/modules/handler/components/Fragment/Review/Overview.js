// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Trans, withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Grid, Header, Segment, Tab } from 'semantic-ui-react';

import PromptReviewControls from '../../../components/Review/Controls';
import ErrorMessage from '../../../components/error';
import PromptFragmentPlaceholderTransactionAction from '../../../components/Fragment/Placeholder/Transaction/Action';
import PromptFragmentTransactionAction from '../../../components/Fragment/Transaction/Action';
import PromptFragmentTransactionActionResourceProvider from '../../../components/Fragment/Transaction/Action/ResourceProvider';

class PromptFragmentReviewOverview extends Component<Props> {
  render() {
    const {
      enableWhitelist,
      error,
      globals,
      hasResourceProviderFee,
      loading,
      modifyWhitelist,
      pair,
      t,
      transaction,
      usingResourceProvider,
      whitelist,
    } = this.props;
    const { pricefeed } = globals;
    return (
      <React.Fragment>
        {(loading)
          ? <PromptFragmentPlaceholderTransactionAction />
          : false
        }
        {(transaction && usingResourceProvider)
          ? (
            <PromptFragmentTransactionActionResourceProvider
              enableWhitelist={enableWhitelist}
              hasResourceProviderFee={hasResourceProviderFee}
              modifyWhitelist={modifyWhitelist}
              pair={pair}
              pricefeed={pricefeed}
              total={transaction.actions.length}
              transaction={transaction}
              usingResourceProvider={usingResourceProvider}
              whitelist={whitelist}
            />
          )
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
      </React.Fragment>
    );
  }
}

export default withTranslation('handler')(PromptFragmentReviewOverview);
