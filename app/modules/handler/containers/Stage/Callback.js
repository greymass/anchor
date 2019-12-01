// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Button, Form, Grid, Header, Icon, Segment } from 'semantic-ui-react';

import DangerLink from '../../../../shared/containers/Global/DangerLink';
import PromptFragmentTransactionAction from '../../components/Fragment/Transaction/Action';

class PromptStageCallback extends Component<Props> {
  render() {
    const {
      blockchain,
      callbacking,
      prompt,
      settings,
      singleColumn,
    } = this.props;
    const {
      signed,
      tx,
    } = prompt;
    const { signatures } = signed;
    return (
      <Grid>
        {(singleColumn)
          ? false
          : (
            <Grid.Column width={6}>
              <Header>
                Transaction Signed
                <Header.Subheader>
                  The signature below has been created.
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
                Further Action Required
                <Header.Subheader>
                  This signing request has requested you visit the following URL to complete this transaction.
                </Header.Subheader>
              </Header.Content>
            </Header>
            <Segment size="large">
              <p>
                Click the link below to complete this transaction with the originator of the signing request.
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
                      content="Open Link in Web Browser"
                      icon="external"
                      primary
                    />
                  )}
                  link={prompt.callbackURL}
                  settings={settings}
                />
              </p>
              <p>
                Once you have visited this URL, you can close this window.
              </p>
              <p>
                <strong>If you do not open this link, your transaction may not complete.</strong>
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
  translate('global'),
  connect(mapStateToProps)
)(PromptStageCallback);
