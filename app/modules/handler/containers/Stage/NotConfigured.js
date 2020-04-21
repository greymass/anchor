// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Button, Form, Grid, Header, Icon, Segment } from 'semantic-ui-react';

import GlobalFragmentChainLogo from '../../../../shared/components/Global/Fragment/ChainLogo';

class PromptStageNotConfigured extends Component<Props> {
  render() {
    const {
      blockchain,
      t,
    } = this.props;
    return (
      <Segment basic padded>
        <Grid>
          <Grid.Row>
            <Grid.Column width={12}>
              <Segment attached="top" color="yellow" size="large">
                <Header size="large">
                  <Icon color="yellow" name="warning sign" />
                  <Header.Content>
                    {t('handler_containers_stage_not_configured_header')}
                    <Header.Subheader>
                      {t('handler_containers_stage_not_configured_subheader')}
                    </Header.Subheader>
                  </Header.Content>
                </Header>
                <p>{t('handler_containers_stage_not_configured_paragraph')}</p>
              </Segment>
              {/* <Segment attached size="large">
                  To enable this blockchain...
                  </Segment>
                  <Segment attached="bottom">
                  <Button
                  content="Enable"
                  primary
                  />
                <Button
                  content="Import"
                  primary
                />
              </Segment> */}
            </Grid.Column>
            <Grid.Column
              textAlign="center"
              width={4}
            >
              <GlobalFragmentChainLogo
                chainId={blockchain.chainId}
                noPopup
                size="small"
              />
              <Header
                content={blockchain.name}
                style={{ marginTop: '0.25em' }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
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
)(PromptStageNotConfigured);
