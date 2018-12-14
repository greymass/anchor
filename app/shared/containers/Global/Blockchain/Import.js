// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { find, intersection, isEqual } from 'lodash';
import { Button, Checkbox, Divider, Form, Header, Icon, Label, List, Modal, Segment, Tab } from 'semantic-ui-react';

import * as AccountsActions from '../../../actions/accounts';
import * as PingActions from '../../../actions/ping';
import * as SettingsActions from '../../../actions/settings';
import * as WalletsActions from '../../../actions/wallets';

import GlobalFormFieldServer from '../../../components/Global/Form/Field/Server';

class GlobalBlockchainImport extends Component<Props> {
  state = {
    host: 'https://eos.greymass.com',
    result: {}
  }
  static getDerivedStateFromProps(props, state) {
    let derived = {};
    const result = find(props.ping.results, { host: state.host });
    if (!isEqual(result, state.result)) {
      derived = Object.assign({}, state, { result });
    }
    return derived;
  }
  onChange = (e, { name, value }) => this.setState({ [name]: value })
  onClose = () => {
    this.props.actions.pingReset();
    this.props.onClose();
  }
  connect = () => this.props.actions.pingNode({
    host: this.state.host,
    producer: undefined
  }, {}, '/v1/chain/get_info')
  reset = (e) => {
    this.props.actions.pingReset();
    e.preventDefault();
    return false;
  }
  render() {
    const {
      t
    } = this.props;
    const {
      result
    } = this.state;
    return (
      <Form>
        {(result && result.response && result.response.chain_id)
          ? (
            <React.Fragment>
              <span>{JSON.stringify(result)}</span>
              <Segment basic clearing>
                <Button
                  floated="left"
                  onClick={this.reset}
                >
                  <Icon name="left arrow circle" /> {t('back')}
                </Button>
                <Button
                  color="blue"
                  content={t('save')}
                  floated="right"
                  icon="save"
                  onClick={this.save}
                />
              </Segment>
            </React.Fragment>
          )
          : (
            <React.Fragment>
              <GlobalFormFieldServer
                name="host"
                onChange={this.onChange}
                value={this.state.host}
              />
              <Divider />
              <Segment basic clearing>
                <Button
                  floated="left"
                  onClick={this.onClose}
                >
                  <Icon name="x" /> {t('cancel')}
                </Button>
                <Button
                  color="blue"
                  content={t('connect')}
                  floated="right"
                  icon="plug"
                  onClick={this.connect}
                />
              </Segment>
            </React.Fragment>
          )
        }
      </Form>
    );
  }
}


function mapStateToProps(state) {
  return {
    blockchains: state.blockchains,
    ping: state.ping,
    settings: state.settings,
    system: state.system,
    validate: state.validate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountsActions,
      ...PingActions,
      ...SettingsActions,
      ...WalletsActions
    }, dispatch)
  };
}

export default compose(
  translate('global', {
    withRef: true
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalBlockchainImport);
