// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Grid, Message } from 'semantic-ui-react';

import ExplorerLink from '../../../../shared/containers/Global/Blockchain/ExplorerLink';

class PromptStageSuccess extends Component<Props> {
  render() {
    const {
      prompt,
    } = this.props;
    const {
      response
    } = prompt;
    return (
      <Grid>
        <Grid.Column width={16}>
          <Message
            content={(
              <React.Fragment>
                <p>
                  The transaction was successfully broadcast with the following ID:
                </p>
                <ExplorerLink
                  content={response.transaction_id}
                  linkData={response.transaction_id}
                  linkBlockId={response.processed.block_num}
                  linkType="txid"
                />
                <p>
                  Click on the ID above to view the transaction and its status on an external block explorer.
                </p>
              </React.Fragment>
            )}
            header="Transaction Successfully Broadcast"
            icon="info circle"
            info
          />
        </Grid.Column>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    prompt: state.prompt,
  };
}

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(PromptStageSuccess);
