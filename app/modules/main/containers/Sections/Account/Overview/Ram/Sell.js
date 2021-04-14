// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import compose from 'lodash/fp/compose';
import { withTranslation } from 'react-i18next';

import { clearSystemState } from '../../../../../../../shared/actions/system/systemstate';
import { getRamStats } from '../../../../../../../shared/actions/globals';
import * as SellRamActions from '../../../../../../../shared/actions/system/sellram';

import isUnlocked from '../../../../../../../shared/utils/Anchor/Unlocked';
import WalletPanelButtonRamSell from '../../../../../../../shared/components/Wallet/Panel/Button/Ram/Sell';
import GlobalUnlock from '../../../../../../../shared/containers/Global/Unlock';

class AccountOverviewRamSell extends Component<Props> {
  render() {
    const {
      account,
      actions,
      balances,
      blockExplorers,
      connection,
      globals,
      settings,
      system,
      t,
      unlocked,
    } = this.props;
    const button = {
      color: 'red',
      content: t('main_sections_overview_ram_sell_button'),
      floated: 'right',
      icon: 'minus circle',
      size: 'tiny',
    };
    if (!unlocked) {
      return (
        <GlobalUnlock buttonOnly buttonStyles={button} />
      );
    }
    return (
      <WalletPanelButtonRamSell
        account={account}
        actions={actions}
        balances={balances}
        blockExplorers={blockExplorers}
        connection={connection}
        globals={globals}
        settings={settings}
        system={system}
        trigger={(
          <Button
            color={button.color}
            content={button.content}
            fluid={button.fluid}
            floated={button.floated}
            icon={button.icon}
            onClick={this.onOpen}
            size={button.size}
            style={button.style}
          />
        )}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    account: state.accounts[ownProps.account],
    blockExplorers: state.blockexplorers,
    connection: state.connection,
    balances: state.balances,
    globals: state.globals,
    settings: state.settings,
    system: state.system,
    unlocked: isUnlocked(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      clearSystemState,
      getRamStats,
      ...SellRamActions,
    }, dispatch)
  };
}

export default compose(
  withTranslation('main'),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AccountOverviewRamSell);
