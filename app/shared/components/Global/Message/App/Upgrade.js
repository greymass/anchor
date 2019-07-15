// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Form, Header, Icon, Segment } from 'semantic-ui-react';

const { ipcRenderer } = require('electron');

export class GlobalMessageAppUpgrade extends Component<Props> {
  checkForUpdates = () => {
    ipcRenderer.send('checkForUpdates');
  };
  skipUpdate = () => {
    const {
      actions,
      constants
    } = this.props;
    actions.setSetting('upgradeSkip', constants.version);
  };
  render() {
    const {
      constants,
      t,
    } = this.props;
    return (
      <React.Fragment>
        <Segment basic size="large" textAlign="center">
          <Header color="blue" icon size="large">
            <Icon name="info circle" />
            <Header.Content>
              <React.Fragment>
                {t('global_app_requires_upgrade_header', { new: constants.version })}
                <Header.Subheader>
                  <p>
                    {t('global_app_requires_upgrade_subheader')}
                  </p>
                </Header.Subheader>
              </React.Fragment>
            </Header.Content>
          </Header>
          <Form>
            <Form.TextArea
              label={t('global_app_requires_upgrade_details')}
              rows={6}
              value={constants.versioninfo[constants.version]}
            />
          </Form>
        </Segment>
        <Segment basic size="large" textAlign="center">
          <p>
            <Button
              content="Upgrade"
              color="blue"
              icon="up arrow"
              onClick={this.checkForUpdates}
              size="large"
            />
          </p>
          <p>
            <Button
              content="Skip this Version"
              color="grey"
              onClick={this.skipUpdate}
            />
          </p>
        </Segment>
      </React.Fragment>
    );
  }
}

export default translate('global')(GlobalMessageAppUpgrade);
