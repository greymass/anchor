// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';

import * as DelegateActions from '../../../actions/system/delegatebw';
import * as SystemStateActions from '../../../actions/system/systemstate';

import GlobalFormTokenStake from '../../../components/Global/Form/Token/Stake';
import GlobalTransactionModal from '../../../components/Global/Transaction/Modal';

class GlobalButtonStake extends Component<Props> {
  state = { open: false }
  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })
  render() {
    const {
      actions,
      blockExplorers,
      button,
      connection,
      disabled,
      resource,
      settings,
      system,
      t,
    } = this.props;
    const { open } = this.state;
    return (
      <GlobalTransactionModal
        actionName="DELEGATEBW"
        actions={actions}
        blockExplorers={blockExplorers}
        button={button}
        content={(
          <GlobalFormTokenStake
            account={settings.account}
            actions={actions}
            connection={connection}
            onClose={this.close}
            resource={resource}
            settings={settings}
          />
        )}
        open={open}
        title={(
          <Header size="small">
            {resource.toUpperCase()} - Stake Tokens
          </Header>
        )}
        settings={settings}
        system={system}
      />
    );
  }
}


function mapStateToProps(state) {
  return {
    blockExplorers: state.blockExplorers,
    connection: state.connection,
    settings: state.settings,
    system: state.system,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...DelegateActions,
      ...SystemStateActions,
    }, dispatch)
  };
}


export default compose(
  withRouter,
  translate('wallet'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalButtonStake);
