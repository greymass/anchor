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

class GlobalButtonPowerUp extends Component<Props> {
  state = { open: false }
  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })
  render() {
    const {
      actions,
      blockExplorers,
      button,
      connection,
      powerup,
      pstate,
      resource,
      settings,
      system,
      t,
      unlocked,
    } = this.props;
    if (!unlocked) return false;
    const { open } = this.state;
    if (!connection.supportedContracts || !connection.supportedContracts.includes('rex')) {
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
            connection={connection}
            onClose={this.close}
            powerup={powerup}
            processing={processing}
            pstate={pstate}
            resource={resource}
            settings={settings}
          />
        )}
        title={(
          <Header size="small">
            {resource.toUpperCase()} - Rent Tokens
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
