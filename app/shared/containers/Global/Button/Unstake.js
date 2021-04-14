// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';

import * as UndelegateActions from '../../../actions/system/undelegatebw';
import * as SystemStateActions from '../../../actions/system/systemstate';

import isUnlocked from '../../../utils/Anchor/Unlocked';
import GlobalFormTokenUnstake from '../../../components/Global/Form/Token/Unstake';
import GlobalTransactionModal from '../../../components/Global/Transaction/Modal';
import GlobalUnlock from '../../../containers/Global/Unlock';

class GlobalButtonUnstake extends Component<Props> {
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
      unlocked,
    } = this.props;
    if (!unlocked) {
      return (
        <GlobalUnlock buttonOnly buttonStyles={button} />
      );
    }
    const { open } = this.state;
    const processing = !!(system && system.UNDELEGATEBW && system.UNDELEGATEBW === 'PENDING');
    return (
      <GlobalTransactionModal
        actionName="UNDELEGATEBW"
        actions={actions}
        blockExplorers={blockExplorers}
        button={button}
        content={(
          <GlobalFormTokenUnstake
            account={settings.account}
            actions={actions}
            connection={connection}
            onClose={this.close}
            processing={processing}
            resource={resource}
            settings={settings}
          />
        )}
        open={open}
        title={(
          <Header size="small">
            {resource.toUpperCase()} - Unstake Tokens
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
      ...SystemStateActions,
      ...UndelegateActions,
    }, dispatch)
  };
}


export default compose(
  withRouter,
  withTranslation('wallet'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalButtonUnstake);
