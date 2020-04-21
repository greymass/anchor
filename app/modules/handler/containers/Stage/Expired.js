// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Grid, Header, Icon, Segment } from 'semantic-ui-react';

class PromptStageExpired extends Component<Props> {
  render() {
    const {
      t,
    } = this.props;
    return (
      <Grid>
        <Grid.Column width={16}>
          <Segment basic>
            <Header size="large">
              <Icon name="warning sign" />
              <Header.Content>
                {t('handler_containers_stage_expired_header')}
                <Header.Subheader>
                  {t('handler_containers_stage_expired_subheader')}
                </Header.Subheader>
              </Header.Content>
            </Header>
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
)(PromptStageExpired);
