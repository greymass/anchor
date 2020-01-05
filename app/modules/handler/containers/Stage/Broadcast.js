// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Divider, Form, Grid, Header } from 'semantic-ui-react';

import PromptFragmentTransactionAction from '../../components/Fragment/Transaction/Action';

class PromptStageReview extends Component<Props> {
  render() {
    const {
      blockchain,
      prompt,
    } = this.props;
    const {
      signed,
      resolved,
    } = prompt;
    const {
      transaction
    } = resolved;
    const { signatures } = signed;
    return (
      <Grid>
        <Grid.Column width={6}>
          <Header>
            Broadcast Transaction
            <Header.Subheader>
              The API node and signature below will be used to broadcast this transaction.
            </Header.Subheader>
          </Header>
          <Divider />
          <Form>
            <Form.Field>
              <label>API Node</label>
              <Form.Input
                value={blockchain.node}
              />
            </Form.Field>
            <Form.Field>
              <label>Raw Signature</label>
              <Form.TextArea
                rows={4}
                value={signatures.join('\n')}
              />
            </Form.Field>
          </Form>
        </Grid.Column>
        <Grid.Column width={10}>
          <Header>
            Final Review
            <Header.Subheader>
              One final opportunity to review the actions in this transaction before broadcasting the transaction.
            </Header.Subheader>
          </Header>
          {transaction.actions.map((action, index) => (
            <PromptFragmentTransactionAction
              action={action}
              index={index}
              total={transaction.actions.length}
            />
          ))}
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
