// @flow
import React, { Component } from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';

import GlobalTransactionHandler from './Handler';

type Props = {
  actionName: string,
  actions: {
    clearSystemState: () => void
  },
  button: {},
  content: {},
  icon: string,
  title: string,
  settings: {},
  system: {}
};

class GlobalTransactionModal extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      open: (props.open) ? props.open : false
    };
  }

  handleOpen = () => this.setState({ open: true });

  onClose = () => this.setState({ open: false }, () => {
    this.props.actions.clearSystemState();
  });

  onOpen = () => {
    const { onOpen } = this.props;
    if (onOpen) {
      onOpen();
    }
  }

  render() {
    const {
      actionName,
      button,
      content,
      icon,
      title,
      settings,
      system
    } = this.props;
    let {
      transaction
    } = this.props;
    const {
      open
    } = this.state;
    // Load the transaction from props by default, but overwrite
    //   with last transaction from the system if exists
    if (system && system[`${actionName}_LAST_TRANSACTION`]) {
      transaction = system[`${actionName}_LAST_TRANSACTION`];
    }
    return (
      <Modal
        centered={false}
        closeIcon
        closeOnDimmerClick={false}
        closeOnDocumentClick={false}
        trigger={(
          <Button
            color={button.color}
            content={button.content}
            fluid
            icon={button.icon}
            onClick={this.handleOpen}
          />
        )}
        open={open}
        onOpen={this.onOpen}
        onClose={this.onClose}
      >
        <Header
          icon={icon}
          content={title}
        />
        <Modal.Content>
          <GlobalTransactionHandler
            actionName={actionName}
            content={content}
            onClose={this.onClose}
            settings={settings}
            system={system}
            transaction={transaction}
          />
        </Modal.Content>
      </Modal>
    );
  }
}

export default GlobalTransactionModal;
