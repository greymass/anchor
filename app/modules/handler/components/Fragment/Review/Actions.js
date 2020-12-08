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

class PromptFragmentReviewActions extends Component<Props> {
  render() {
    const {
      enableWhitelist,
      error,
      hasResourceProviderFee,
      loading,
      modifyWhitelist,
      t,
      transaction,
      usingResourceProvider,
      whitelist,
    } = this.props;
    return (
      <React.Fragment>
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
              showAll
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

export default withTranslation('handler')(PromptFragmentReviewActions);
