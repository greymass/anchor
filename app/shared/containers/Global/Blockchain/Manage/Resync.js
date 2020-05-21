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
  };
  render() {
    const { t } = this.props;
    const { open } = this.state;
    return (
      <Modal
        onClose={this.onClose}
        open={open}
        size="small"
        trigger={(
          <Popup
            content={t('global_blockchain_manage_resync_popup')}
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
          {t('global_blockchain_manage_resync_header')}
        </Modal.Header>
        <Modal.Content>
          <p>
            {t('global_blockchain_manage_resync_paragraph_one')}
          </p>
          <p>
            {t('global_blockchain_manage_resync_paragraph_two')}
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content={t('cancel')}
            onClick={this.onClose}
          />
          <Button
            content={t('global_blockchain_manage_resync_button')}
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
