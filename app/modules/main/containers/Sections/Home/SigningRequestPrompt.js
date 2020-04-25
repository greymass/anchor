// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Header, Modal, Segment } from 'semantic-ui-react';
import compose from 'lodash/fp/compose';

import { changeModule } from '../../../actions/navigation';
import { setSettings } from '../../../../../shared/actions/settings';

const { ipcRenderer } = require('electron');

class HomeUpgradeContainer extends Component<Props> {
  onEnable = () => {
    ipcRenderer.send('enableSigningRequests');
    this.props.actions.setSettings({
      allowSigningRequests: true,
      promptSigningRequests: true,
    });
  }
  onDisable = () => {
    ipcRenderer.send('disableSigningRequests');
    this.props.actions.setSettings({
      allowSigningRequests: false,
      promptSigningRequests: true,
    });
  }
  render() {
    const { t } = this.props;

    return (
      <React.Fragment>
        <Modal
          open
          size="small"
        >
          <Modal.Header>
            <Header
              content="Allow Anchor to integrate with apps?"
            />
          </Modal.Header>
          <Modal.Content>
            <Segment basic size="huge">
              <p>
                {t('main_sections_home_signing_request_prompt_paragraph_one')}
              </p>
              <p style={{ fontSize: '0.85em' }}>
                {t('main_sections_home_signing_request_prompt_paragraph_two')}
              </p>
            </Segment>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content={t('main_sections_home_signing_request_prompt_button_one')}
              floated="left"
              onClick={this.onDisable}
              size="large"
            />
            <Button
              content={t('main_sections_home_signing_request_prompt_button_two')}
              onClick={this.onEnable}
              primary
              size="large"
            />
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
    system: state.system,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      changeModule,
      setSettings,
    }, dispatch)
  };
}

export default compose(
  withRouter,
  withTranslation('main'),
  connect(mapStateToProps, mapDispatchToProps)
)(HomeUpgradeContainer);
