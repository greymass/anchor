// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Button, Modal, Popup } from 'semantic-ui-react';

import * as BlockchainsActions from '../../../../actions/blockchains';

class GlobalBlockchainResync extends Component<Props> {
  state = {
    open: false
  }
  onOpen = () => this.setState({ open: true })
  onClose = () => this.setState({ open: false })
  resync = () => {
    const { actions } = this.props;
    actions.resyncBlockchains();
    this.onClose();
  }
  render() {
    const { open } = this.state;
    return (
      <Modal
        onClose={this.onClose}
        open={open}
        size="small"
        trigger={(
          <Popup
            content="Resync Blockchains"
            trigger={(
              <Button
                floated="right"
                icon="refresh"
                onClick={this.onOpen}
              />
            )}
          />
        )}
      >
        <Modal.Header>
          Resync Blockchains & Settings
        </Modal.Header>
        <Modal.Content>
          <p>
            This utility will fetch a more recent copy of available blockchains and update their configuration.
          </p>
          <p>
            Anchor will do this by fetching data from the "anchorwallet" smart contract on the EOS blockchain. It will fetch this data either from the custom EOS node you have specified or by accessing the public API at eos.greymass.com directly.
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Cancel"
            onClick={this.onClose}
          />
          <Button
            content="Resync"
            icon="refresh"
            onClick={this.resync}
            primary
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...BlockchainsActions,
    }, dispatch)
  };
}

export default compose(
  withTranslation('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalBlockchainResync);
