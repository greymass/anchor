// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Divider, Form, Grid, Header } from 'semantic-ui-react';

import PromptFragmentTransactionAction from '../../components/Fragment/Transaction/Action';

class PromptStageReview extends Component<Props> {
  render() {
    const {
      blockchain,
      prompt,
      t,
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
            {t('handler_containers_stage_broadcast_header')}
            <Header.Subheader>
              {t('handler_containers_stage_broadcast_subheader')}
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
              <label>{t('handler_containers_stage_broadcast_form_label')}</label>
              <Form.TextArea
                rows={4}
                value={signatures.join('\n')}
              />
            </Form.Field>
          </Form>
        </Grid.Column>
        <Grid.Column width={10}>
          <Header>
            {t('handler_containers_stage_broadcast_grid_header')}
            <Header.Subheader>
              {t('handler_containers_stage_broadcast_grid_subheader')}
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
  withTranslation('handler'),
  connect(mapStateToProps)
)(PromptStageReview);
