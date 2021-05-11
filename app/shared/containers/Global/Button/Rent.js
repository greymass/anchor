// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';

import * as REXComboActions from '../../../actions/system/rexcombo';
import * as SystemStateActions from '../../../actions/system/systemstate';

import isUnlocked from '../../../utils/Anchor/Unlocked';
import GlobalFormTokenRent from '../../../components/Global/Form/Token/Rent';
import GlobalTransactionModal from '../../../components/Global/Transaction/Modal';
import GlobalUnlock from '../../../containers/Global/Unlock';

class GlobalButtonRent extends Component<Props> {
  state = { open: false }
  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })
  render() {
    const {
      actions,
      blockExplorers,
      button,
      connection,
      resource,
      rstate,
      sample,
      settings,
      system,
      t,
      unlocked,
    } = this.props;
    if (!unlocked) {
      return (
        <GlobalUnlock buttonOnly buttonStyles={button} />
      );
    }
    const { open } = this.state;
    if (!connection.supportedContracts || !connection.supportedContracts.includes('rex')) {
      return false;
    }
    const processing = !!(system
      && system[`RENT${resource.toUpperCase()}REX`]
      && system[`RENT${resource.toUpperCase()}REX`] === 'PENDING');
    return (
      <GlobalTransactionModal
        actionName={`RENT${resource.toUpperCase()}REX`}
        actions={actions}
        blockExplorers={blockExplorers}
        button={button}
        content={(
          <GlobalFormTokenRent
            account={settings.account}
            actions={actions}
            connection={connection}
            onClose={this.close}
            processing={processing}
            resource={resource}
            rstate={rstate}
            sample={sample}
            settings={settings}
          />
        )}
        open={open}
        title={(
          <Header size="small">
            {resource.toUpperCase()} - Rent Resources
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
    unlocked: isUnlocked(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...REXComboActions,
      ...SystemStateActions,
    }, dispatch)
  };
}


export default compose(
  withRouter,
  withTranslation('wallet'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalButtonRent);
