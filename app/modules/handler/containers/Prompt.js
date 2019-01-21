// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Dimmer, Header, Loader, Segment } from 'semantic-ui-react';
import ReactJson from 'react-json-view';

const {ipcRenderer} = require('electron')

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
      history,
      settings,
      validate,
      wallet
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
        <Dimmer active={loading} inverted>
          <Loader>Processing Incoming Request</Loader>
        </Dimmer>
        <Segment attached="top">
          <GlobalAccountDropdown />
        </Segment>
        {(prompt.tx)
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PromptContainer));
