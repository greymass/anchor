// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  HashRouter,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import { Button, Divider, Grid, Header, Icon, Message, Modal, Segment } from 'semantic-ui-react';
import { find } from 'lodash';

import DangerLink from '../../../containers/Global/DangerLink';
import { setSettingWithValidation } from '../../../actions/settings';

class DisconnectedContainer extends Component<Props> {
  state = { open: false }
  componentDidUpdate(prevProps) {
    const { validate} = this.props;
    if (
      !this.state.open
      && prevProps.validate.NODE === 'PENDING'
      && validate.NODE === 'FAILURE'
    ) {
      this.setState({
        open: true
      });
    }
  }
  onClose = () => this.setState({ open: false })
  onOpen = () => this.setState({ open: true })
  onRetry = () => this.props.actions.setSettingWithValidation('node', this.props.blockchain.node)
  render() {
    const {
      blockchain,
      settings,
      trigger,
      validate,
    } = this.props;
    const {
      open
    } = this.state;
    if (validate.NODE === 'SUCCESS') {
      return false;
    }
    const errorMessage = (validate.NODE_ERROR) ? validate.NODE_ERROR.message : false;
    // if no blockchain is selected, do not display
    if (!blockchain) return false;
    return (
      <Modal
        centered={false}
        closeIcon
        dimmer="blurring"
        onClose={this.onClose}
        onOpen={this.onOpen}
        open={open}
        trigger={trigger}
      >
        <Header
          attached="top"
          block
          size="huge"
        >
          <Icon color="red" name="warning circle" />
          <Header.Content>
            Unable to connect to the {blockchain.name} blockchain.
            <Header.Subheader>
              <DangerLink
                content={settings.node}
                link={settings.node}
              />
              {' '}
              is not responding to requests.
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Modal.Content>
          <Grid divided>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Segment basic>
                  {(errorMessage)
                    ? (
                      <Message
                        content={errorMessage}
                        header="Connection Error"
                        icon="warning circle"
                        error
                        size="large"
                      />
                    )
                    : false
                  }
                  {(validate.NODE === 'PENDING')
                    ? (
                      <Message
                        color="green"
                        header="Connecting"
                        content="Attempting to connect..."
                        icon="loading notched circle"
                        size="large"
                      />
                    )
                    : false
                  }
                  <Button
                    color="green"
                    content="Retry Connection"
                    fluid
                    icon="refresh"
                    loading={validate.NODE === 'PENDING'}
                    onClick={this.onRetry}
                  />
                </Segment>
                <Segment basic>
                  <Header>Disconnected</Header>
                  <p>You can continue to use Anchor even while disconnected, but no new data can be retrieved about your accounts. You will also be unable to perform actions until you reconnect to a server.</p>
                  <p>A red warning icon will be displayed in the upper left of the main interface to indicate you are disconnected, and clicking it will bring up this dialog.</p>

                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Header>
                  Change API Servers
                  <Header.Subheader>
                    If you are unable to reconnect with the blockchain using this API node, use the tools below to change to a new API node.
                  </Header.Subheader>
                </Header>

                <Segment basic>
                  <p>To specify a new blockchain API server to connect with, click the button below.</p>
                  <Button
                    color="blue"
                    content="Edit Blockchain"
                    fluid
                    icon="pencil"
                  />
                </Segment>
                <Divider content="OR" horizontal />
                <Segment basic>
                  <p>If you'd like to benchmark publicly available APIs to see which are best for you, use the API Performance Analysis tool and select a new server.</p>
                  <Button
                    color="blue"
                    content="Run API Analysis"
                    fluid
                    icon="search"
                  />

                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="orange"
            content="Continue Disconnected"
            onClick={this.onClose}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    blockchain: find(state.blockchains, { chainId: state.settings.chainId }),
    settings: state.settings,
    validate: state.validate,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setSettingWithValidation,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DisconnectedContainer));
