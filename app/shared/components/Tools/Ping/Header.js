// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import {
  Checkbox,
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react';

class ToolsPingHeader extends Component<Props> {
  render() {
    const {
      setSetting,
      settings,
      t,
    } = this.props;
    return (!settings.acceptedPingInterface)
      ? (
        <Segment
          color="orange"
          content={(
            <React.Fragment>
              <Header size="large">
                <Icon
                  color="orange"
                  name="user secret"
                />
                <Header.Content>
                  {t('privacy_notice_header')}
                  <Header.Subheader>
                    {t('privacy_notice_subheader')}
                  </Header.Subheader>
                </Header.Content>
              </Header>
              <p>
                {t('privacy_notice_body_1')}
              </p>
              <p>
                {t('privacy_notice_body_2')}
              </p>
              <p>
                {t('privacy_notice_body_3')}
              </p>
              <Checkbox
                label={t('privacy_notice_understood')}
                onChange={() => setSetting('acceptedPingInterface', true)}
              />
            </React.Fragment>
          )}
          padded
          secondary
          size="large"
          stacked
        />
      )
      : (
        <React.Fragment>
          <Header
            content={t('main_header')}
            subheader={t('main_subheader')}
            textAlign="left"
          />
        </React.Fragment>
      );
  }
}

export default translate('ping')(ToolsPingHeader);
