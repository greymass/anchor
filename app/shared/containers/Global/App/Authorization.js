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
import { Button, Divider, Form, Grid, Header, Icon, Message, Modal, Segment } from 'semantic-ui-react';
import { find, isObject } from 'lodash';

import DangerLink from '../../../containers/Global/DangerLink';
import GlobalSettingsDfuse from '../../../components/Global/Settings/Dfuse';
import { setSetting, setSettingWithValidation } from '../../../actions/settings';
import { setNodeGeneric } from '../../../actions/blockchains';
import { changeModule } from '../../../../modules/main/actions/navigation';

class AuthorizationContainer extends Component<Props> {
  render() {
    const {
      actions,
      blockchain,
      open,
      settings,
      trigger,
      validate,
    } = this.props;
    let errorMessage = (validate.NODE_ERROR) ? validate.NODE_ERROR.message : false;
    if (validate.NODE_ERROR && validate.NODE_ERROR.response && validate.NODE_ERROR.response.data) {
      if (isObject(validate.NODE_ERROR.response.data)) {
        errorMessage = `${validate.NODE_ERROR.response.data.message} (${validate.NODE_ERROR.response.data.code} - ${validate.NODE_ERROR.response.data.trace_id})`;
      } else {
        errorMessage = validate.NODE_ERROR.response.data;
      }
    }
    // if no blockchain is selected, do not display
    if (!blockchain) return false;
    return (
      <Modal
        centered={false}
        closeIcon
        dimmer="blurring"
        onClose={this.props.onClose}
        onOpen={this.props.onOpen}
        open={open}
        trigger={trigger}
      >
        <Header
          attached="top"
          block
          size="huge"
        >
          <Icon color="orange" name="lock" />
          <Header.Content>
            This API requires a valid API Key
            <Header.Subheader>
              <DangerLink
                content={settings.node}
                link={settings.node}
              />
              {' '}
              is responding but requires authentication.
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Modal.Content>
          <Grid divided>
            <Grid.Row centered>
              <Grid.Column width={12}>
                <Segment>
                  <Form style={{ paddingBottom: '1em' }}>
                    <Header>
                      Enter your API Key
                      <Header.Subheader>
                        In order to use this API server, a valid API key must be defined.
                      </Header.Subheader>
                    </Header>
                    <Form.Field>
                      <label>API Key:</label>
                      <GlobalSettingsDfuse
                        actions={actions}
                        value={settings.dfuseKey}
                      />
                    </Form.Field>
                  </Form>
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
                    onClick={this.props.onRetry}
                  />
                </Segment>

              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column width={12}>
                <Header>
                  Change API Servers
                </Header>
                <Segment basic>
                  <p>To specify a new blockchain API server to connect with, click the button below and enter a new server in the <strong>Default Node</strong> field.</p>
                  <Button
                    color="blue"
                    content="Edit Blockchain"
                    fluid
                    icon="pencil"
                    onClick={this.props.manageBlockchains}
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
            onClick={this.props.onClose}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    blockchain: find(state.blockchains, { chainId: state.settings.chainId }),
    connection: state.connection,
    settings: state.settings,
    validate: state.validate,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      changeModule,
      setNodeGeneric,
      setSetting,
      setSettingWithValidation,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthorizationContainer));
