// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Button, Grid, Header, Image, Menu, Popup, Progress, Segment } from 'semantic-ui-react';

import * as FuelActions from '../../../actions/fuel';
import * as SettingsActions from '../../../actions/settings';

import FuelFullLogo from '../../../../renderer/assets/images/fuel/greymassfuel-horizontal.png';
import FuelLogo from '../../../../renderer/assets/images/fuel/fuel-square-logo.png';
import FuelLogoDisabled from '../../../../renderer/assets/images/fuel/fuel-square-logo-grey.png';

const { shell } = require('electron');

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
  onOpen = () => {
    this.setState({ open: true });
    this.props.actions.getFuelQuotaStatus();
  }
  openLink = (url) => shell.openExternal(url);
  enable = () => {
    this.props.actions.setSetting('greymassFuel', true);
    this.props.actions.getFuelQuotaStatus();
  }
  disable = () => this.props.actions.setSetting('greymassFuel', false)
  render() {
    const {
      available,
      enabled,
      fuel,
    } = this.props;
    const {
      open
    } = this.state;
    // Remove menu item for unsupported chains
    if (!available) {
      return false;
    }
    let quota = {
      cpu: 0,
      net: 0,
      quota_cpu: 1,
      quota_net: 1,
    };
    if (fuel && fuel.quota) {
      ({ quota } = fuel);
    }
    const netpercent = 100 - Math.round((quota.net / quota.quota_net) * 100);
    const cpupercent = 100 - Math.round((quota.cpu / quota.quota_cpu) * 100);
    return (
      <Popup
        trigger={(
          <Menu.Item>
            <Image
              src={(enabled) ? FuelLogo : FuelLogoDisabled}
              style={{
                height: '32px',
                margin: 0
              }}
            />
          </Menu.Item>
        )}
        content={(
          <Segment basic>
            <Image
              fluid
              src={FuelFullLogo}
              style={{

                margin: 0
              }}
            />
            <Segment basic textAlign="center">
              <p>Enable this feature to take advantage transactions powered by Greymass Fuel.</p>
                <p>
                  More info:
                  {' '}
                  <a href="#" onClick={() => this.openLink('https://greymass.com/fuel')}>
                    https://greymass.com/fuel
                  </a>
                </p>
              {(enabled)
                ? (
                  <Button
                    basic
                    content="Disable Fuel"
                    color="orange"
                    onClick={this.disable}
                  />

                )
                : (
                  <Button
                    content="Enable Fuel"
                    color="green"
                    onClick={this.enable}
                  />
                )
              }
            </Segment>
            <Grid>
              <Grid.Row columns={1}>
                <Grid.Column textAlign="center">
                  <p>Your quotas remaining are as follows:</p>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Progress
                    percent={cpupercent}
                    progress="percent"
                  >
                    CPU Quota
                  </Progress>
                </Grid.Column>
                <Grid.Column>
                  <Progress
                    percent={netpercent}
                    progress="percent"
                  >
                    NET Quota
                  </Progress>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
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

function isAvailable(connection) {
  return (
    connection
    && connection.supportedContracts
    && connection.supportedContracts.includes('greymassfuel')
  );
}

function isEnabled(settings) {
  return (
    settings
    && settings.greymassFuel
  );
}

function mapStateToProps(state) {
  return {
    available: isAvailable(state.connection),
    enabled: (isAvailable(state.connection) && isEnabled(state.settings)),
    fuel: state.fuel,
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
