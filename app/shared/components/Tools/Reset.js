// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Header, Segment, Divider } from 'semantic-ui-react';

import GlobalButtonResetContainer from '../../containers/Global/Button/Reset';

class ToolsReset extends Component<Props> {
  render() {
    const {
      t
    } = this.props;
    return (
      <Segment color="violet" piled style={{ margin: 0 }}>
        <Header
          content={t('tools_reset_header_header')}
          subheader={t('tools_reset_header_subheader')}
        />
        <Segment basic size="large">
          <p>
            {t('tools_reset_body_1')}
          </p>
          <Divider />
          <GlobalButtonResetContainer />
        </Segment>
      </Segment>
    );
  }
}

export default translate('tools')(ToolsReset);
