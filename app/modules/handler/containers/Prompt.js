// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Dimmer, Loader, Menu, Segment } from 'semantic-ui-react';
import ReactJson from 'react-json-view';

import URIActions from '../actions/uri';
import SettingsActions from '../../../shared/actions/settings';
import TransactionActions from '../../../shared/actions/transaction';
import ValidateActions from '../../../shared/actions/validate';
import WalletActions from '../../../shared/actions/wallet';

import GlobalAccountDropdown from '../../../shared/containers/Global/Account/Dropdown';
import GlobalTransactionHandler from '../../../shared/components/Global/Transaction/Handler';

import ErrorMessage from '../components/error';

class PromptContainer extends Component<Props> {
  // TODO: Remove, this is only needed in development when the main window isn't being loaded
  componentDidMount() {
    const {
      actions,
      settings,
      validate,
    } = this.props;
    const {
      setWalletMode
    } = actions;
    setWalletMode(settings.walletMode);
    switch (settings.walletMode) {
      default: {
        if (validate.NODE !== 'SUCCESS' && settings.node) {
          const { validateNode } = actions;
          validateNode(settings.node);
        }
        break;
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.settings.account !== this.props.settings.account
      || nextProps.settings.authorization !== this.props.settings.authorization
      || (nextProps.system.EOSIOURI === 'SUCCESS' && this.props.system.EOSIOURI === 'PENDING')
    ) {
      // Regenerate the template based on the new account
      this.props.actions.templateURI();
    }
  }
  render() {
    const {
      actions,
      prompt,
      settings,
      system,
      validate,
    } = this.props;
    const loading = (system.EOSIOURI === 'PENDING' || validate.WALLET_PASSWORD === 'PENDING' || system.EOSIOURI_TEMPLATEURI === 'PENDING');
    const error = system.EOSIOURI_TEMPLATEURI_LAST_ERROR;
    return (
      <Segment tertiary>
        <Menu
          fixed="top"
          style={{
            border: 'none',
            borderBottom: '1px solid rgba(34,36,38,.15)',
          }}
        >
          <Menu.Item header>
            Signing Request
          </Menu.Item>
          <GlobalAccountDropdown />
        </Menu>
        <div style={{ marginTop: '61px' }}>
          <Dimmer active={loading} inverted>
            <Loader>Processing Incoming Request</Loader>
          </Dimmer>
          <ReactJson
            collapsed={1}
            displayDataTypes={false}
            displayObjectSize={false}
            iconStyle="square"
            name={null}
            src={this.props}
            style={{ padding: '1em' }}
            theme="harmonic"
          />
          {(prompt && prompt.tx)
            ? (
              <Segment attached>
                <GlobalTransactionHandler
                  actionName="TRANSACTION_SIGN"
                  actions={actions}
                  blockExplorers={{}}
                  contract={prompt.contract}
                  content={<span>No transaction currently loaded.</span>}
                  icon="wifi"
                  open={false}
                  settings={settings}
                  system={system}
                  transaction={prompt.tx}
                />
              </Segment>
            )
            : false
          }
          {(error)
            ? (
              <Segment attached>
                <ErrorMessage
                  error={error}
                />
              </Segment>
            )
            : false
          }
          <Segment attached="bottom">
            <Button
              content="close"
            />
          </Segment>
        </div>
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    prompt: state.prompt,
    settings: state.settings,
    system: state.system,
    validate: state.validate,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...SettingsActions,
      ...TransactionActions,
      ...URIActions,
      ...ValidateActions,
      ...WalletActions,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PromptContainer);
