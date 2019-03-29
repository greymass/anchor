// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Form, Grid, Header } from 'semantic-ui-react';

import PromptFragmentTransactionAction from '../../components/Fragment/Transaction/Action';

class PromptStageReview extends Component<Props> {
  render() {
    const {
      prompt,
    } = this.props;
    const {
      signed,
      tx,
    } = prompt;
    const { signatures } = signed.transaction;
    return (
      <Grid>
        <Grid.Column width={6}>
          <Header>
            Broadcast Transaction?
          </Header>
        </Grid.Column>
        <Grid.Column width={10}>
          <Form>
            <Form.TextArea
              value={signatures.join('\n')}
            />
          </Form>
          {tx.actions.map((action) => <PromptFragmentTransactionAction action={action} />)}
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
)(PromptStageReview);
