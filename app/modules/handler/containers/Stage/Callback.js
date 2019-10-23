// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Divider, Form, Grid, Header } from 'semantic-ui-react';

import PromptFragmentTransactionAction from '../../components/Fragment/Transaction/Action';

class PromptStageCallback extends Component<Props> {
  render() {
    const {
      blockchain,
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
            Submit Transaction
            <Header.Subheader>
              The signature below will be used while sending this transaction back to the requested callback.
            </Header.Subheader>
          </Header>
          <Divider />
          <Form>
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
            Review Actions
            <Header.Subheader>
              One final opportunity to review the actions in this transaction before issuing the callback.
            </Header.Subheader>
          </Header>
          {tx.actions.map((action, index) => (
            <PromptFragmentTransactionAction
              action={action}
              index={index}
              total={tx.actions.length}
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
)(PromptStageCallback);
