// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';

import { Header, Grid, Icon, Segment } from 'semantic-ui-react';

const prettyBytes = require('pretty-bytes');

class UpdaterContainer extends Component<Props> {
  render() {
    const {
      app,
      children,
      t
    } = this.props;
    let content = children;
    if (app.download) {
      const { download } = app;
      content = (
        <div className="welcome">
          <style>
            {`
              body > div,
              body > div > div,
              body > div > div > div.welcome {
                height: 100%;
              }
            `}
          </style>
          <Grid
            textAlign="center"
            style={{ height: '100%' }}
          >
            <Grid.Column
              style={{ maxWidth: 450 }}
              textAlign="center"
              verticalAlign="middle"
            >
              <Segment>
                <Header icon>
                  <Icon
                    loading
                    name="cog"
                  />
                  {t('app_updating_header')}
                  <Header.Subheader>
                    {t('app_updating_subheader')}
                  </Header.Subheader>
                </Header>
                <Header>
                  {download.percent.toFixed(1)}%
                  {' '}
                  {t('app_updating_percent_complete')}
                  <Header.Subheader>
                    <p>{prettyBytes(download.bytesPerSecond)} / {t('app_updating_rate')}</p>
                    <p>{prettyBytes(download.transferred)} / {prettyBytes(download.total)}</p>
                  </Header.Subheader>
                </Header>
              </Segment>
            </Grid.Column>
          </Grid>
        </div>
      );
    }
    return content;
  }
}

function mapStateToProps(state) {
  return {
    app: state.app
  };
}

export default compose(
  translate('app'),
  connect(mapStateToProps)
)(UpdaterContainer);
