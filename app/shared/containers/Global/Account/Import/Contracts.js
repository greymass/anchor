// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { map } from 'lodash';
import { Button, Header, Icon, Segment, Tab } from 'semantic-ui-react';

import GlobalModalAccountImportKeys from './Keys';
import GlobalModalAccountImportContractsSetupAccount from './Contracts/SetupAccount';

const defaultState = {
  confirming: false,
  keys: {
    active: '',
    owner: ''
  },
  stage: 1,
  values: {
    accountName: '',
    active: '',
    password: '',
    owner: ''
  },
  validated: {
    accountName: false,
    active: false,
    owner: false,
    keyBackup: false
  },
};

class GlobalModalAccountImportContracts extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, defaultState);
  }
  onChange = (e, { name, valid, value }) => {
    const values = { ...this.state.values };
    const validated = { ...this.state.validated };
    values[name] = value;
    validated[name] = valid;
    this.setState({
      values,
      validated
    }, () => {
      if (name === 'accountName' && value.length !== 0) {
        const { actions } = this.props;
        actions.checkAccountAvailability(value);
      }
    });
  }
  render() {
    const {
      pubkeys,
      t,
    } = this.props;
    return (
      <Tab.Pane>
        <Segment basic>
          <Header
            content="Create account via Smart Contract"
            subheader="If you have EOS already, you can transfer a small amount to a smart contract to have an account created."
          />
          {(!pubkeys.available.length) ? (
            <GlobalModalAccountImportKeys />
          ) : false}
          {(pubkeys.available.length) ? (
            <GlobalModalAccountImportContractsSetupAccount />
          ) : false}
        </Segment>
        <Segment basic clearing>
          <Button
            floated="left"
            onClick={this.props.onClose}
          >
            <Icon name="x" /> {t('cancel')}
          </Button>
        </Segment>
      </Tab.Pane>
    );
  }
}


function mapStateToProps(state) {
  return {
    pubkeys: {
      available: state.storage.keys,
      unlocked: map(state.auths.keystore, 'pubkey')
    },
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
    }, dispatch)
  };
}

export default compose(
  translate('global', {
    withRef: true
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalModalAccountImportContracts);
