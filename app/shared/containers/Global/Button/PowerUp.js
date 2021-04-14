// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';

import * as PowerUpActions from '../../../actions/system/powerup';
import * as SystemStateActions from '../../../actions/system/systemstate';

import isUnlocked from '../../../utils/Anchor/Unlocked';
import GlobalFormTokenPowerUp from '../../../components/Global/Form/Token/PowerUp';
import GlobalTransactionHandler from '../../../components/Global/Transaction/Modal';
import GlobalUnlock from '../../../containers/Global/Unlock';

class GlobalButtonPowerUp extends Component<Props> {
  state = { open: false }
  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })
  render() {
    const {
      actions,
      blockExplorers,
      button,
      chain,
      connection,
      pstate,
      resource,
      sample,
      settings,
      system,
      t,
      unlocked,
    } = this.props;
    const { open } = this.state;
    if (!unlocked) {
      return (
        <GlobalUnlock buttonOnly buttonStyles={button} />
      );
    }
    if (!connection.supportedContracts || !connection.supportedContracts.includes('powerup')) {
      return false;
    }
    const processing = !!(system
      && system.POWERUP
      && system.POWERUP === 'PENDING');
    return (
      <GlobalTransactionHandler
        actionName="POWERUP"
        actions={actions}
        blockExplorers={blockExplorers}
        button={button}
        content={(
          <GlobalFormTokenPowerUp
            account={settings.account}
            actions={actions}
            chain={chain}
            connection={connection}
            onClose={this.close}
            processing={processing}
            pstate={pstate}
            sample={sample}
            resource={resource}
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
    chain: state.chain,
    settings: state.settings,
    system: state.system,
    unlocked: isUnlocked(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...PowerUpActions,
      ...SystemStateActions,
    }, dispatch)
  };
}


export default compose(
  withRouter,
  withTranslation('wallet'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalButtonPowerUp);
