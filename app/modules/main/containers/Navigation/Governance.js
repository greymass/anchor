// @flow
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon, Menu } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';

import NavigationActions from '../../actions/navigation';

class NavigationGovernanceContainer extends PureComponent<Props> {
  onClick = (e, data) => this.props.actions.changeModule(data.name)
  render() {
    const {
      connection,
      navigation,
      t
    } = this.props;
    const {
      module
    } = navigation;
    return (
      <Menu
        pointing
        secondary
        style={{ marginTop: 0 }}
      >
        <Menu.Item
          as="a"
          active={module === 'governance/producers'}
          onClick={this.onClick}
          name="governance/producers"
        >
          <Icon name="gavel" />
          {t('producers:producers_block_producers')}
        </Menu.Item>
        {(connection.supportedContracts && connection.supportedContracts.includes('proposals'))
          ? (
            <Menu.Item
              as="a"
              active={module === 'governance/proposals'}
              onClick={this.onClick}
              name="governance/proposals"
            >
              <Icon name="balance scale" />
              {t('tools:tools_menu_governance_proposals')}
            </Menu.Item>
          )
          : false
        }
        {(connection.supportedContracts && connection.supportedContracts.includes('regproxyinfo')) && (
          <Menu.Item
            as="a"
            active={module === 'governance/proxies'}
            onClick={this.onClick}
            name="governance/proxies"
          >
            <Icon name="users" />
            {t('producers:producers_proxies')}
          </Menu.Item>
        )}
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
  translate('main'),
  connect(mapStateToProps, mapDispatchToProps)
)(NavigationGovernanceContainer);
