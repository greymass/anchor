// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Header, Image, Menu, Popup } from 'semantic-ui-react';

import * as FuelActions from '../../../actions/fuel';
import * as SettingsActions from '../../../actions/settings';

import FuelLogo from '../../../../renderer/assets/images/fuel/greymassfuel-logo.png';

class GlobalFuelDropdown extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  componentDidMount = () => {
    this.props.actions.getFuelQuotaStatus();
  }
  onClose = () => this.setState({ open: false })
  onOpen = () => this.setState({ open: true })
  render() {
    const {
      enabled,
    } = this.props;
    const {
      open
    } = this.state;
    // Remove menu item for unsupported chains
    if (!enabled) {
      return false;
    }
    return (
      <Popup
        trigger={(
          <Menu.Item>
            <Image
              src={FuelLogo}
              style={{
                height: '32px',
                margin: 0
              }}
            />
          </Menu.Item>
        )}
        content={(
          <React.Fragment>
            <Header>
              Greymass Fuel
            </Header>
          </React.Fragment>
        )}
        flowing
        on="click"
        open={open}
        onClose={this.onClose}
        onOpen={this.onOpen}
        position="bottom right"
        size="large"
        style={{
          minWidth: '400px',
          maxWidth: '400px'
        }}
      />
    );
  }
}

function isEnabled(connection) {
  return (
    connection
    && connection.supportedContracts
    && connection.supportedContracts.includes('greymassfuel')
  );
}

function mapStateToProps(state) {
  return {
    enabled: isEnabled(state.connection),
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...FuelActions,
      ...SettingsActions,
    }, dispatch)
  };
}

export default compose(
  translate('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalFuelDropdown);
