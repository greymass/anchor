// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
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
                Enabling app integrations will allow you to sign in to any supported application using this desktop Anchor wallet.
              </p>
              <p style={{ fontSize: '0.85em' }}>
                This can be toggled on or off from the sidebar on the Home screen at any time.
              </p>
            </Segment>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="No, remain disabled"
              floated="left"
              onClick={this.onDisable}
              size="large"
            />
            <Button
              content="Yes, enable app integrations"
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
  translate('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(HomeUpgradeContainer);
