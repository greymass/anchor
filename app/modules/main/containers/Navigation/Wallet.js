// @flow
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon, Menu } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';

import NavigationActions from '../../actions/navigation';

class NavigationWalletContainer extends PureComponent<Props> {
  onClick = (e, data) => this.props.actions.changeModule(data.name)
  render() {
    const {
      navigation,
      t
    } = this.props;
    const {
      module
    } = navigation;
    return (
      <Menu pointing secondary size="small" style={{ marginTop: 0 }}>
        <Menu.Item
          active={module === 'wallet'}
          content={t('main_navigation_wallet_menu_item_one')}
          icon="exchange"
          name="wallet"
          onClick={this.onClick}
        />
        <Menu.Item
          active={module === 'wallet/stake'}
          content={t('main_navigation_wallet_menu_item_two')}
          icon="warehouse"
          name="wallet/stake"
          onClick={this.onClick}
        />
        <Menu.Item
          active={module === 'wallet/ram'}
          content={t('main_navigation_wallet_menu_item_three')}
          icon="database"
          name="wallet/ram"
          onClick={this.onClick}
        />
        <Menu.Item
          active={module === 'wallet/rex'}
          content="REX"
          icon="dinosaur"
          name="wallet/rex"
          onClick={this.onClick}
        />
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  return {
    connection: state.connection,
    navigation: state.navigation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...NavigationActions
    }, dispatch)
  };
}

export default compose(
  withTranslation('main'),
  connect(mapStateToProps, mapDispatchToProps)
)(NavigationWalletContainer);
