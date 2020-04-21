// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Form, Grid, Header, Icon, Segment } from 'semantic-ui-react';

class PromptStageForbidden extends Component<Props> {
  render() {
    const {
      error,
      prompt,
      t,
    } = this.props;
    const { uri } = prompt;
    const uriParts = uri.split(':');
    return (
      <Grid>
        <Grid.Column width={16}>
          <Segment color="red" size="large">
            <Header color="red" size="large">
              <Icon name="warning sign" />
              <Header.Content>
                {t('handler_containers_stage_forbidden_header')}
                <Header.Subheader>
                  {t('handler_containers_stage_forbidden_subheader')}
                </Header.Subheader>
              </Header.Content>
            </Header>
            <Segment padded secondary>
              <strong>{t('handler_containers_stage_forbidden_strong', { errorMessage: error.message })}</strong>
            </Segment>
            <p>
              {t('handler_containers_stage_forbidden_paragraph_one')}
            </p>
            <Segment basic>
              <Form>
                <Form.TextArea>
                  {`https://eosio.to/${uriParts[1]}`}
                </Form.TextArea>
              </Form>
            </Segment>
            <p>
              {t('handler_containers_stage_forbidden_paragraph_two')}
            </p>
          </Segment>
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
  withTranslation('global'),
  connect(mapStateToProps)
)(PromptStageForbidden);
