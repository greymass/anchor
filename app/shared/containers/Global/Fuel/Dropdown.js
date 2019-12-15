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

class GlobalFuelDropdown extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  componentDidMount = () => {
    const { settings } = this.props;
    if (settings.greymassFuel) {
      this.props.actions.getFuelQuotaStatus();
    }
  }
  onClose = () => this.setState({ open: false })
  onOpen = () => {
    this.setState({ open: true })
    this.props.actions.getFuelQuotaStatus();
  }
  enable = () => this.props.actions.setSetting('greymassFuel', true)
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
    let netpercent = 0;
    let cpupercent = 0;
    let quota = false;
    if (fuel) {
      ({ quota } = fuel);
      if (quota) {
        netpercent = 100 - Math.round((quota.net / quota.quota_net) * 100);
        cpupercent = 100 - Math.round((quota.cpu / quota.quota_cpu) * 100);
      }
    }
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
            {(quota)
              ? (
                <Grid>
                  <Grid.Row columns={1}>
                    <Grid.Column textAlign="center">
                      <p>Your quotas remaining are as follows:</p>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <Progress
                        indicating
                        percent={cpupercent}
                        progress="percent"
                      >
                        CPU Quota
                      </Progress>
                    </Grid.Column>
                    <Grid.Column>
                      <Progress
                        indicating
                        percent={netpercent}
                        progress="percent"
                      >
                        NET Quota
                      </Progress>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              )
              : false
            }
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
