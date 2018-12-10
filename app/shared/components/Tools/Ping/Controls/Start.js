// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import {
  Button,
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react';

class ToolsPingControlsStart extends Component<Props> {
  render() {
    const {
      onStart,
      results,
      run,
      t,
    } = this.props;
    const control = (
      <Button
        content={t('button_restart')}
        loading={run}
        icon="redo"
        onClick={onStart}
        primary
      />
    );
    if (run) return false;
    if (results > 0) {
      return control;
    }
    return (
      <React.Fragment>
        <Segment attached="top" padded secondary size="large">
          <Header size="large">
            <Icon
              name="cloud download"
            />
            <Header.Content>
              {t('new_test_header_content')}
              <Header.Subheader
                content={t('new_test_header_subheader')}
              />
            </Header.Content>
          </Header>
          <Segment basic size="large">
            <p>{t('new_test_body_1')}</p>
            <p>{t('new_test_body_2')}</p>
            <p>{t('new_test_body_3')}</p>
          </Segment>
        </Segment>
        <Segment attached="bottom" basic textAlign="center">
          <Header textAlign="center">
            {t('new_test_start')}
          </Header>
          {control}
        </Segment>
      </React.Fragment>
    );
  }
}

export default translate('ping')(ToolsPingControlsStart);
