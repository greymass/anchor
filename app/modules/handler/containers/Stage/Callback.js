// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Button, Form, Grid, Header, Icon, Segment } from 'semantic-ui-react';

import DangerLink from '../../../../shared/containers/Global/DangerLink';

class PromptStageCallback extends Component<Props> {
  render() {
    const {
      prompt,
      settings,
      singleColumn,
      t,
    } = this.props;
    const {
      signed,
    } = prompt;
    const { signatures } = signed;
    return (
      <Grid>
        {(singleColumn)
          ? false
          : (
            <Grid.Column width={6}>
              <Header>
                {t('handler_containers_stage_callback_grid_header_one')}
                <Header.Subheader>
                  {t('handler_containers_stage_callback_grid_subheader_one')}
                </Header.Subheader>
              </Header>
              <Form>
                <Form.Field>
                  <label>Signature</label>
                  <Form.TextArea
                    rows={4}
                    value={signatures.join('\n')}
                  />
                </Form.Field>
              </Form>
            </Grid.Column>
          )
        }
        <Grid.Column width={(singleColumn) ? 16 : 10}>
          <Segment secondary size="large">
            <Header>
              <Icon name="info circle" />
              <Header.Content>
                {t('handler_containers_stage_callback_grid_subheader_two')}
              </Header.Content>
            </Header>
            <Segment size="large">
              <p>
                {t('handler_containers_stage_callback_grid_paragraph_one')}
              </p>
              <p>
                <DangerLink
                  content={prompt.callbackURL}
                  link={prompt.callbackURL}
                  settings={settings}
                />
              </p>
              <p style={{ textAlign: 'center' }}>
                <DangerLink
                  content={(
                    <Button
                      content={t('handler_containers_stage_callback_grid_button')}
                      icon="external"
                      primary
                    />
                  )}
                  link={prompt.callbackURL}
                  settings={settings}
                />
              </p>
              <p>
                {t('handler_containers_stage_callback_grid_paragraph_two')}
              </p>
              <p>
                <strong>{t('handler_containers_stage_callback_grid_paragraph_three')}</strong>
              </p>
            </Segment>
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
  withTranslation('handler'),
  connect(mapStateToProps)
)(PromptStageCallback);
