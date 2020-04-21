// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Grid, Header, Icon, Message, Segment } from 'semantic-ui-react';

class PromptStageError extends Component<Props> {
  render() {
    const {
      error,
      t,
    } = this.props;
    return (
      <Grid centered>
        <Grid.Column width={14}>
          <Segment basic textAlign="center">
            <Header icon size="large">
              <Icon name="warning sign" />
              <Header.Content style={{ marginTop: '1em' }}>
                {t('handler_containers_stage_error_header')}
                <Header.Subheader>
                  {t('handler_containers_stage_error_subheader')}
                </Header.Subheader>
              </Header.Content>
            </Header>
            {(error)
              ? (
                <Message
                  header={t('handler_containers_stage_error_message')}
                  content={error}
                  error
                />
              )
              : false
            }
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
  withTranslation('handlers'),
  connect(mapStateToProps)
)(PromptStageError);
